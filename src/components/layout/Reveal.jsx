import React from 'react'
import { cn } from '../../lib/cn'
import { revealDelay } from '../../lib/revealDelay'

/**
 * Wraps content in a scroll-reveal element. `delay` accepts either a stagger
 * index (number) or an explicit class (e.g. "d2"). Renders as the tag passed
 * via `as` so it can stand in for any element without adding extra nodes.
 */
export function Reveal({ as: Tag = 'div', delay, className, children, ...rest }) {
  const delayClass = typeof delay === 'number' ? revealDelay(delay) : delay
  return (
    <Tag className={cn('rv', delayClass, className)} {...rest}>
      {children}
    </Tag>
  )
}
