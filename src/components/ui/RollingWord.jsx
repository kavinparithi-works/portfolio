import { cn } from '../../lib/cn'
import { useRotatingIndex } from '../../hooks/useRotatingIndex'

/**
 * Replaces the current word immediately, with no visual transition.
 * A static sentence beside it provides the screen-reader alternative.
 */
export function RollingWord({ words, interval = 1500, className }) {
  const index = useRotatingIndex(words.length, interval)

  return (
    <span aria-hidden="true" data-index={index} className={cn('roll', className)}>
      {words[index]}
    </span>
  )
}
