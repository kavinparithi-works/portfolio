import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'
import { observeReveal } from '../../lib/revealObserver'

/**
 * Scroll-reveal wrapper. Starts hidden and fades/rises in the first time it
 * enters the viewport. `delay` (ms) staggers siblings. Renders as `as`.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    return observeReveal(el, () => el.classList.add('in'))
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn('rv', className)}
      style={delay ? { '--rv-delay': `${delay}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
