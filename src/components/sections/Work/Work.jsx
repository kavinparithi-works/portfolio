import { useCallback, useRef, useState } from 'react'
import { cn } from '../../../lib/cn'
import { projects } from '../../../data/projects'
import { Container, Section, SectionHeading, Reveal } from '../../layout'
import { ProjectPanel } from './ProjectPanel'

/**
 * "Projects Shipped." Short tabs above one compact project card. Every study
 * starts collapsed. Arrow keys, Home and End move between studies.
 */
export function Work() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const tabRefs = useRef({})
  const panelRef = useRef(null)
  const active = projects.find((p) => p.id === activeId) ?? projects[0]

  const select = useCallback((id, { focus = false, scroll = false } = {}) => {
    setActiveId(id)
    if (focus) tabRefs.current[id]?.focus()
    if (scroll) panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const onKeyDown = (e) => {
    const idx = projects.findIndex((p) => p.id === activeId)
    const last = projects.length - 1
    const map = {
      ArrowDown: idx === last ? 0 : idx + 1,
      ArrowRight: idx === last ? 0 : idx + 1,
      ArrowUp: idx === 0 ? last : idx - 1,
      ArrowLeft: idx === 0 ? last : idx - 1,
      Home: 0,
      End: last,
    }
    if (map[e.key] === undefined) return
    e.preventDefault()
    select(projects[map[e.key]].id, { focus: true })
  }

  return (
    <Section id="work" className="scroll-mt-9 py-14 md:-scroll-mt-5 md:py-28">
      <Container>
        <SectionHeading
          id="work"
          eyebrow="From problem to production"
          title="Projects shipped"
          className="mb-6! md:mb-8!"
          aside={
            <p className="font-mono text-[13px] text-muted">
              <span className="text-ink">{String(projects.length).padStart(2, '0')}</span> case studies · pick one
            </p>
          }
        />

        <div className="grid grid-cols-1 gap-4">
          <Reveal>
            <div
              role="tablist"
              aria-label="Case studies"
              aria-orientation="horizontal"
              onKeyDown={onKeyDown}
              className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3"
            >
              {projects.map((p) => {
                const selected = p.id === activeId
                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      tabRefs.current[p.id] = el
                    }}
                    role="tab"
                    data-cursor="box"
                    id={`tab-${p.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${p.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(p.id)}
                    className={cn(
                      'group relative min-h-11 min-w-0 rounded-[14px] border px-3 py-2.5 text-left transition-colors duration-300 md:px-4 md:py-3',
                      selected
                        ? 'border-ink bg-ink text-white'
                        : 'border-rule text-body hover:border-ink hover:text-ink'
                    )}
                  >
                    <span className="flex items-baseline gap-2 md:gap-3">
                      <span className={cn('font-mono text-[11px] tracking-[0.1em]', selected ? 'text-orange-light' : 'text-muted')}>{p.index}</span>
                      <span
                        className={cn(
                          'font-display text-[15px] leading-tight font-extrabold tracking-[0.01em] uppercase md:text-[18px]',
                          selected ? 'text-white' : 'text-body group-hover:text-ink'
                        )}
                      >
                        {p.short}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={120} className="min-w-0">
            <div ref={panelRef} className="scroll-mt-24">
              <ProjectPanel
                key={active.id}
                project={active}
                id={`panel-${active.id}`}
                labelledBy={`tab-${active.id}`}
                onSelect={(id) => select(id, { scroll: true })}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
