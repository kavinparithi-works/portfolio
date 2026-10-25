import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

/**
 * Eyebrow + oversized display heading. The closing period is the brand mark,
 * so it is always rendered in orange. `aside` renders on the right on wide
 * screens (a counter, a note, a link).
 */
export function SectionHeading({ id, eyebrow, title, aside, size = 'display', dark = false, className }) {
  return (
    <div className={cn('mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 md:mb-16', className)}>
      <div className="min-w-0">
        {eyebrow && (
          <Reveal as="p" className={cn('eyebrow mb-4 flex items-center gap-3', dark && 'text-white/55')}>
            <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-70" />
            {eyebrow}
          </Reveal>
        )}
        <Reveal
          as="h2"
          id={id ? `${id}-title` : undefined}
          delay={80}
          className={cn('display text-balance', size === 'display' ? 'text-display' : 'text-display-sm', dark ? 'text-white' : 'text-ink')}
        >
          {title}
          <span className="text-orange">.</span>
        </Reveal>
      </div>
      {aside && (
        <Reveal delay={160} className="pb-2">
          {aside}
        </Reveal>
      )}
    </div>
  )
}
