import { cn } from '../../lib/cn'

/**
 * A page band. Every section carries an `id` (nav anchor) and is labelled by
 * its heading through `aria-labelledby` (`${id}-title`, see SectionHeading).
 */
export function Section({ id, className, children, labelled = true, ...rest }) {
  return (
    <section
      id={id}
      aria-labelledby={labelled ? `${id}-title` : undefined}
      className={cn('relative', className)}
      {...rest}
    >
      {children}
    </section>
  )
}
