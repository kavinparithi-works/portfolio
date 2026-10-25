import { useState } from 'react'
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
 * The detail view of one case study. On wide screens everything shows:
 * header, summary, architecture diagram, problem / build / result, extras,
 * outcomes and stack. Phones start with a short summary, two results and
 * three tools. The rest opens from the "Full case study" toggle.
 */
export function ProjectPanel({ project, onSelect, id, labelledBy }) {
  const reduced = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const deep = (base) => cn(base, expanded ? '' : 'max-md:hidden')

  return (
    <div
      key={project.id}
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      tabIndex={0}
      className="panel-enter card flex flex-col p-5 focus-visible:outline-offset-4 md:p-9"
    >
      <header className="flex flex-wrap items-start justify-between gap-x-8 gap-y-2">
        <p className="eyebrow text-orange-deep">
          {project.index} · {project.sector}
        </p>
        <p className={deep('font-mono text-[11.5px] text-muted md:text-[12px]')}>
          {project.role} <span aria-hidden="true">·</span> {project.duration}
        </p>
      </header>

      <div className="mt-4 flex items-start justify-between gap-6">
        <h3 className="display max-w-[22ch] text-[clamp(1.6rem,3.1vw,2.6rem)] leading-[0.98] text-ink">{project.title}</h3>
        <span className="group hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rule bg-bg text-ink sm:flex">
          <Icon name={project.icon} size={26} />
        </span>
      </div>

      <p className={cn('mt-3 text-[14px] leading-[1.65] text-body md:hidden', expanded && 'hidden')}>{project.summaryShort}</p>
      <p className={deep('mt-4 max-w-[70ch] text-[14.5px] leading-[1.7] text-body md:mt-5 md:text-[15px]')}>{project.summary}</p>

      <div id={`${id}-diagram`} className={deep('order-7 mt-6 rounded-2xl border border-rule bg-bg p-4 md:order-none md:mt-8 md:p-6')}>
        <PipelineDiagram stages={project.pipeline} animate={!reduced} />
        <p className="mt-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-muted uppercase md:hidden">
          <Icon name="arrowRight" size={12} strokeWidth={2} /> Swipe the diagram to follow the flow
        </p>
      </div>

      <dl id={`${id}-story`} className={deep('order-8 mt-6 grid gap-6 border-t border-rule pt-6 md:order-none md:mt-8 md:grid-cols-3 md:gap-8 md:pt-8')}>
        {STORY.map((s, i) => (
          <div key={s.key}>
            <dt className="eyebrow flex items-center gap-2">
              <span className="font-display text-[15px] font-black text-orange">0{i + 1}</span>
              {s.label}
            </dt>
            <dd className="mt-3 text-[14.5px] leading-[1.7] text-body">{project.story[s.key]}</dd>
          </div>
        ))}
      </dl>

      {project.more?.length > 0 && (
        <details className={deep('group/more order-9 mt-6 rounded-2xl border border-rule md:order-none md:mt-8')}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <span>
              Also in this phase
              <span className="ml-2 hidden font-mono text-[12px] font-medium text-muted md:inline">{project.more.map((m) => m.label).join(' · ')}</span>
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule transition-transform duration-300 group-open/more:rotate-180">
              <Icon name="arrowDown" size={14} strokeWidth={2} />
            </span>
          </summary>
          <dl className="grid gap-5 border-t border-rule px-5 py-5 md:grid-cols-2">
            {project.more.map((m) => (
              <div key={m.label}>
                <dt className="text-[13.5px] font-semibold text-ink">{m.label}</dt>
                <dd className="mt-1 text-[13.5px] leading-[1.65] text-body">{m.text}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}

      <ul role="list" aria-label="Results" className="order-4 mt-5 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-5 md:order-none md:mt-8 md:grid-cols-4 md:gap-y-6 md:pt-8">
        {project.outcomes.map((o, i) => (
          <li key={o.label} className={i > 1 ? deep('') : undefined}>
            <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-black text-ink tabular-nums">{o.value}</p>
            <p className="mt-1.5 text-[12.5px] leading-snug text-muted md:text-[13px]">{o.label}</p>
          </li>
        ))}
      </ul>

      <footer className="order-5 mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-4 md:order-none md:mt-8 md:pt-6">
        <ul role="list" aria-label="Stack" className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <Chip as="li" key={tag} tone="orange" className={i > 2 ? deep('') : undefined}>
              {tag}
            </Chip>
          ))}
        </ul>
        {project.related && (
          <button type="button" onClick={() => onSelect(project.related.id)} className={deep('group/rel inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink')}>
            {project.related.label}
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink transition-colors duration-200 group-hover/rel:bg-ink group-hover/rel:text-white">
              <Icon name="arrowRight" size={13} strokeWidth={2.2} />
            </span>
          </button>
        )}
      </footer>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={`${id}-diagram ${id}-story`}
        className="order-6 mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-ink py-3 text-[14px] font-semibold text-ink md:hidden"
      >
        {expanded ? 'Show less' : 'Full case study'}
        <span className={cn('transition-transform duration-300', expanded && 'rotate-180')}>
          <Icon name="arrowDown" size={14} strokeWidth={2.2} />
        </span>
      </button>
    </div>
  )
}
