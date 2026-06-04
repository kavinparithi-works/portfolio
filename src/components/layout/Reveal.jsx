import React, { forwardRef } from 'react'
import { cn } from '../../lib/cn'
import { revealDelay } from '../../lib/revealDelay'

/**
 * Wraps content in a scroll-reveal element. `delay` accepts either a stagger
 * index (number) or an explicit class (e.g. "d2"). Renders as the tag passed
 * via `as` so it can stand in for any element without adding extra nodes.
 * Forwards a ref to the underlying element (used for tap-to-activate on touch).
 */
export const Reveal = forwardRef(function Reveal(
  { as: Tag = 'div', delay, className, children, ...rest },
  ref
) {
  const delayClass = typeof delay === 'number' ? revealDelay(delay) : delay
  return (
    <Tag ref={ref} className={cn('rv', delayClass, className)} {...rest}>
      {children}
    </Tag>
  )
})
