import { cn } from '../../lib/cn'

/**
 * Generic page band rendered as a plain <div>. Pass `id` for anchor targets
 * and `className` for per-section spacing/background.
 */
export function Section({ id, className, children, ...rest }) {
  return (
    <div id={id} className={cn(className)} {...rest}>
      {children}
    </div>
  )
}
