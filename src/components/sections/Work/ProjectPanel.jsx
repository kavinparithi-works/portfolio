import { useRef, useState } from 'react'
import { cn } from '../../../lib/cn'
import { useReducedMotion } from '../../../hooks/useMediaQuery'
import { Icon } from '../../icons/Icon'
import { Chip } from '../../ui/Chip'
import { PipelineDiagram } from './PipelineDiagram'

const STORY = [
  { key: 'problem', label: 'The problem' },
  { key: 'approach', label: 'What I built' },
  { key: 'result', label: 'What it changed' },
]

/**
 * A short overview on every screen. The full study opens below it without
 * moving the summary or its toggle; closing from the bottom returns focus
 * and the viewport to the overview.
 */
export function ProjectPanel({ project, onSelect, id, labelledBy }) {
  const reduced = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)
  const detailsId = `${id}-details`

  const closeDetails = () => {
    setExpanded(false)
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' })
      toggleRef.current?.focus({ preventScroll: true })
    })
  }

  return (
    <div
      ref={panelRef}
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      tabIndex={0}
      className="panel-enter card scroll-mt-24 overflow-hidden focus-visible:outline-offset-4"
    >
      <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_300px] md:items-center md:gap-8 md:p-7">
        <div className="min-w-0">
          <p className="eyebrow text-orange-deep">
            {project.index} · {project.sector}
          </p>
          <h3 className="display mt-3 max-w-[30ch] text-[clamp(1.6rem,2.7vw,2.25rem)] leading-[1.02] text-ink">
            {project.title}
          </h3>
          <p className="mt-3 max-w-[68ch] text-[14px] leading-[1.65] text-body md:text-[15px]">{project.summaryShort}</p>
        </div>

        <ul role="list" aria-label="Key results" className="grid grid-cols-2 gap-5 border-t border-rule pt-5 md:gap-x-6 md:border-t-0 md:border-l md:py-2 md:pl-6">
          {project.outcomes.slice(0, 2).map((outcome) => (
            <li key={outcome.label}>
              <p className="font-display text-[30px] leading-none font-black whitespace-nowrap text-ink tabular-nums md:text-[36px]">{outcome.value}</p>
              <p className="mt-2 text-[12.5px] leading-snug text-muted">{outcome.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule bg-bg/35 px-5 py-4 md:px-7">
        <ul role="list" aria-label="Core tools" className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Chip as="li" key={tag} tone="orange">{tag}</Chip>
          ))}
        </ul>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={detailsId}
          className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-3 rounded-full bg-ink px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap text-white md:w-[176px]"
        >
          {expanded ? 'Show less' : 'Full case study'}
          <span className={cn('transition-transform duration-300', expanded && 'rotate-180')}>
            <Icon name="arrowDown" size={14} strokeWidth={2.2} />
          </span>
        </button>
      </div>

      <div id={detailsId} hidden={!expanded} className="border-t border-rule p-5 md:p-7">
        <p className="font-mono text-[12px] leading-relaxed text-muted">
          {project.role} <span aria-hidden="true">·</span> {project.duration}
        </p>
        <p className="mt-4 max-w-[85ch] text-[14.5px] leading-[1.7] text-body">{project.summary}</p>

        <div className="mt-6 rounded-2xl border border-rule bg-bg p-4 md:p-6">
          <PipelineDiagram stages={project.pipeline} animate={expanded && !reduced} />
          <p className="mt-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-muted uppercase md:hidden">
            <Icon name="arrowRight" size={12} strokeWidth={2} /> Swipe the diagram to follow the flow
          </p>
        </div>

        <dl className="mt-6 grid gap-6 border-t border-rule pt-6 lg:grid-cols-3 lg:gap-8">
          {STORY.map((item, i) => (
            <div key={item.key}>
              <dt className="eyebrow flex items-center gap-2">
                <span className="font-display text-[15px] font-black text-orange">0{i + 1}</span>
                {item.label}
              </dt>
              <dd className="mt-3 text-[14.5px] leading-[1.7] text-body">{project.story[item.key]}</dd>
            </div>
          ))}
        </dl>

        {project.more?.length > 0 && (
          <details className="group/more mt-6 rounded-2xl border border-rule">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
              Also in this phase
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule transition-transform duration-300 group-open/more:rotate-180">
                <Icon name="arrowDown" size={14} strokeWidth={2.2} />
              </span>
            </summary>
            <dl className="grid gap-5 border-t border-rule px-5 py-5 md:grid-cols-2">
              {project.more.map((item) => (
                <div key={item.label}>
                  <dt className="text-[13.5px] font-semibold text-ink">{item.label}</dt>
                  <dd className="mt-1 text-[13.5px] leading-[1.65] text-body">{item.text}</dd>
                </div>
              ))}
            </dl>
          </details>
        )}

        <ul role="list" aria-label="More results" className="mt-6 grid grid-cols-2 gap-6 border-t border-rule pt-6">
          {project.outcomes.slice(2).map((outcome) => (
            <li key={outcome.label}>
              <p className="font-display text-[30px] leading-none font-black text-ink tabular-nums">{outcome.value}</p>
              <p className="mt-2 text-[12.5px] leading-snug text-muted">{outcome.label}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-rule pt-6">
          <p className="eyebrow mb-3">Full stack</p>
          <ul role="list" aria-label="Full stack" className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Chip as="li" key={tag} tone="orange">{tag}</Chip>
            ))}
          </ul>
        </div>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
          {project.related && (
            <button type="button" onClick={() => onSelect(project.related.id)} className="group/rel inline-flex min-h-11 items-center gap-2 text-[13.5px] font-semibold text-ink">
              {project.related.label}
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink transition-colors duration-200 group-hover/rel:bg-ink group-hover/rel:text-white">
                <Icon name="arrowRight" size={13} strokeWidth={2.2} />
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={closeDetails}
            className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-5 py-2 text-[13.5px] font-semibold text-ink"
          >
            Close case study <Icon name="arrowUp" size={14} strokeWidth={2.2} />
          </button>
        </footer>
      </div>
    </div>
  )
}
