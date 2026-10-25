import { useId } from 'react'
import { cn } from '../../../lib/cn'
import { layoutPipeline } from '../../../lib/pipelineLayout'

const MEDALLION = { bronze: 'fill-[#E9D9CC]', silver: 'fill-[#E6E3DC]', gold: 'fill-[#F0D9A8]', platinum: 'fill-[#DDE3E6]' }

function nodeFill(node, isLast) {
  const key = node.label.toLowerCase()
  if (MEDALLION[key]) return MEDALLION[key]
  if (isLast) return 'fill-ink'
  return 'fill-card'
}

/**
 * Animated architecture diagram. Paths draw in, nodes fade up, and small
 * packets travel along every connection while `animate` is true.
 */
export function PipelineDiagram({ stages, animate = true, className }) {
  const uid = useId().replace(/:/g, '')
  const { width, height, columns, paths } = layoutPipeline(stages)
  const lastStage = columns.length - 1

  return (
    <div className={cn('overflow-x-auto overscroll-x-contain', className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        className="block h-auto min-w-[560px]"
        role="img"
        aria-label={`Architecture: ${columns.map((c) => `${c.label}: ${c.nodes.map((n) => n.label).join(', ')}`).join('. ')}`}
      >
        {paths.map((p, i) => (
          <path
            key={p.id}
            id={`${uid}-${p.id}`}
            d={p.d}
            pathLength="1"
            fill="none"
            className="pipe-path stroke-rule"
            strokeWidth="1.5"
            style={{ '--d': `${200 + p.stage * 220 + i * 30}ms` }}
          />
        ))}

        {animate &&
          paths.map((p, i) => (
            <circle key={`pk-${p.id}`} r="3.5" className="fill-orange">
              <animateMotion dur="2.8s" begin={`${1 + (i % 5) * 0.45}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" keyPoints="0;1">
                <mpath href={`#${uid}-${p.id}`} />
              </animateMotion>
            </circle>
          ))}

        {columns.map((col, si) => (
          <g key={col.label}>
            <text
              x={col.x}
              y={14}
              className="fill-muted font-mono text-[10px] font-medium tracking-[0.14em] uppercase"
            >
              {col.label}
            </text>
            {col.nodes.map((node, ni) => {
              const dark = si === lastStage && !MEDALLION[node.label.toLowerCase()]
              return (
                <g key={node.id} className="pipe-node" style={{ '--d': `${120 + si * 220 + ni * 60}ms` }}>
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.w}
                    height={node.h}
                    rx="10"
                    className={cn(nodeFill(node, si === lastStage), 'stroke-rule')}
                    strokeWidth={dark ? 0 : 1}
                  />
                  {node.lines.map((line, li) => (
                    <text
                      key={line}
                      x={node.x + node.w / 2}
                      y={node.y + node.h / 2 + (node.lines.length === 2 ? (li === 0 ? -6 : 7) : 0)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={cn('font-mono text-[12px] font-medium', dark ? 'fill-white' : 'fill-ink')}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              )
            })}
          </g>
        ))}
      </svg>
    </div>
  )
}
