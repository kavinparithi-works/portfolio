import { useCallback, useRef, useState } from 'react'
import { cn } from '../../../lib/cn'
import { projects } from '../../../data/projects'
import { Container, Section, SectionHeading, Reveal } from '../../layout'
import { ProjectPanel } from './ProjectPanel'

/**
 * "Projects Shipped." Compact tabs in a two-column grid on phones, horizontal
 * pills on tablets and a vertical list on desktop. Arrow keys, Home and End
 * move between studies.
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
          aside={
            <p className="font-mono text-[13px] text-muted">
              <span className="text-ink">{String(projects.length).padStart(2, '0')}</span> case studies · pick one
            </p>
          }
        />

        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <Reveal>
            <div
              role="tablist"
              aria-label="Case studies"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="grid grid-cols-2 gap-2 [scrollbar-width:none] md:-mx-[22px] md:flex md:overflow-x-auto md:px-[22px] md:pb-2 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
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
                      'group relative min-h-11 min-w-0 rounded-xl border px-3 py-2.5 text-left transition-colors duration-300 md:shrink-0 md:rounded-full md:px-4 lg:w-full lg:rounded-none lg:border-0 lg:border-l-2 lg:px-6 lg:py-5',
                      selected
                        ? 'border-ink bg-ink text-white lg:bg-transparent lg:text-ink lg:border-l-orange'
                        : 'border-rule text-body hover:border-ink hover:text-ink lg:border-l-rule lg:hover:border-l-ink'
                    )}
                  >
                    <span className="flex items-baseline gap-2 md:gap-3 lg:block">
                      <span className={cn('font-mono text-[11px] tracking-[0.1em]', selected ? 'text-orange-light lg:text-orange' : 'text-muted')}>{p.index}</span>
                      <span className={cn('hidden font-mono text-[11px] tracking-[0.1em] uppercase lg:mt-1 lg:block', selected ? 'text-orange-deep' : 'text-muted')}>
                        {p.sector}
                      </span>
                      <span
                        className={cn(
                          'font-display text-[15px] leading-tight font-extrabold tracking-[0.01em] uppercase md:whitespace-nowrap lg:mt-1.5 lg:block lg:text-[22px] lg:leading-[1.05] lg:whitespace-normal',
                          selected ? 'text-white lg:text-ink' : 'text-body group-hover:text-ink'
                        )}
                      >
                        <span className="lg:hidden">{p.short}</span>
                        <span className="hidden lg:inline">{p.title}</span>
                      </span>
                    </span>
                  </button>
                )
              })}
              <p className="hidden pt-5 pl-6 font-mono text-[11.5px] text-muted lg:block">Arrow keys move between studies</p>
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
