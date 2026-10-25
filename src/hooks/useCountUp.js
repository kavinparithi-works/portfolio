import { useEffect, useState } from 'react'
import { useReducedMotion } from './useMediaQuery'

const easeOut = (t) => 1 - Math.pow(1 - t, 4)

/**
 * Counts from 0 to `target` once `active` turns true. Shows the target
 * straight away when the visitor prefers reduced motion.
 */
export function useCountUp(target, active, duration = 1400) {
  const reduced = useReducedMotion()
  const [animated, setAnimated] = useState(0)
  const animate = active && !reduced && duration > 0

  useEffect(() => {
    if (!animate) return undefined
    let frame
    const start = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setAnimated(Math.round(target * easeOut(t)))
      if (t < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [animate, target, duration])

  if (!active) return 0
  if (!animate) return target
  return animated
}
