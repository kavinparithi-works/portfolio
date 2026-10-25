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

  it('keeps every node inside the viewBox', () => {
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
    }
  })
})

describe('<PipelineDiagram />', () => {
  it('renders an accessible description and packets only when animating', () => {
    const { container, rerender } = render(<PipelineDiagram stages={projects[0].pipeline} animate />)
    expect(screen.getByRole('img').getAttribute('aria-label')).toContain('Delta Live Tables')
    expect(container.querySelectorAll('animateMotion').length).toBeGreaterThan(0)
    rerender(<PipelineDiagram stages={projects[0].pipeline} animate={false} />)
    expect(container.querySelectorAll('animateMotion')).toHaveLength(0)
  })
})
