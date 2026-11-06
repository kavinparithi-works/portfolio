import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PipelineDiagram } from './PipelineDiagram'
import { layoutPipeline } from '../../../lib/pipelineLayout'
import { projects } from '../../../data/projects'

describe('layoutPipeline', () => {
  it('fans in and out when a stage has a single node', () => {
    const { paths, columns } = layoutPipeline([
      { label: 'A', nodes: ['a1', 'a2', 'a3'] },
      { label: 'B', nodes: ['b'] },
      { label: 'C', nodes: ['c1', 'c2'] },
    ])
    expect(columns).toHaveLength(3)
    expect(paths.filter((p) => p.stage === 0)).toHaveLength(3)
    expect(paths.filter((p) => p.stage === 1)).toHaveLength(2)
  })

  it('gives every node in a many-to-many pair at least one connection', () => {
    const { paths } = layoutPipeline([
      { label: 'A', nodes: ['a1', 'a2'] },
      { label: 'B', nodes: ['b1', 'b2', 'b3', 'b4'] },
    ])
    const targets = new Set(paths.map((p) => p.id.split('-')[2]))
    expect(targets).toEqual(new Set(['0', '1', '2', '3']))
    const sources = new Set(paths.map((p) => p.id.split('-')[1]))
    expect(sources).toEqual(new Set(['0', '1']))
  })

  it('runs a chain stage top to bottom: in at the first node, out from the last', () => {
    const { paths, columns } = layoutPipeline([
      { label: 'Sources', nodes: ['s1', 's2'] },
      { label: 'Medallion', flow: 'chain', nodes: ['Bronze', 'Silver', 'Gold'] },
      { label: 'Delivered', nodes: ['d1', 'd2'] },
    ])
    const [bronze, silver, gold] = columns[1].nodes
    expect(gold.y - silver.y).toBe(silver.y - bronze.y)
    expect(paths.filter((p) => p.id.endsWith('-chain')).map((p) => p.id)).toEqual(['1-0-1-chain', '1-1-2-chain'])
    expect(paths.filter((p) => p.stage === 0 && !p.id.endsWith('-chain')).map((p) => p.id)).toEqual(['0-0-0', '0-1-0'])
    expect(paths.filter((p) => p.stage === 1 && !p.id.endsWith('-chain')).map((p) => p.id)).toEqual(['1-2-0', '1-2-1'])
  })

  it('wires a node to the previous-stage node it names, matching on the label prefix', () => {
    const { paths } = layoutPipeline([
      { label: 'Medallion', flow: 'chain', nodes: ['Bronze', 'Silver via apply_changes', 'Gold'] },
      { label: 'Delivered', nodes: [{ label: 'DQ tests', from: 'Silver' }, 'Metrics', 'Checks'] },
    ])
    const ids = paths.filter((p) => p.stage === 0 && !p.id.endsWith('-chain')).map((p) => p.id)
    expect(ids).toEqual(['0-1-0', '0-2-1', '0-2-2'])
  })

  it('keeps every node inside the viewBox and every `from` resolvable', () => {
    for (const p of projects) {
      const { width, height, columns } = layoutPipeline(p.pipeline)
      for (const col of columns) {
        for (const n of col.nodes) {
          expect(n.x).toBeGreaterThanOrEqual(0)
          expect(n.x + n.w).toBeLessThanOrEqual(width)
          expect(n.y + n.h).toBeLessThanOrEqual(height)
          expect(n.lines.length).toBeLessThanOrEqual(2)
        }
      }
      p.pipeline.forEach((stage, si) => {
        for (const node of stage.nodes) {
          if (typeof node === 'string' || node.from == null) continue
          const previous = p.pipeline[si - 1]?.nodes.map((n) => (typeof n === 'string' ? n : n.label)) ?? []
          for (const from of [node.from].flat()) {
            expect(previous.some((label) => label.toLowerCase().startsWith(from.toLowerCase())), `${p.id}: "${node.label}" from "${from}"`).toBe(true)
          }
        }
      })
    }
  })
})

describe('<PipelineDiagram />', () => {
  it('renders an accessible description and packets only when animating', () => {
    const { container, rerender } = render(<PipelineDiagram stages={projects[0].pipeline} animate />)
    const first = projects[0].pipeline[0].nodes[0]
    expect(screen.getByRole('img').getAttribute('aria-label')).toContain(typeof first === 'string' ? first : first.label)
    expect(container.querySelectorAll('animateMotion').length).toBeGreaterThan(0)
    rerender(<PipelineDiagram stages={projects[0].pipeline} animate={false} />)
    expect(container.querySelectorAll('animateMotion')).toHaveLength(0)
  })
})
