import { useEffect, useState } from 'react'
import { useReducedMotion } from './useMediaQuery'

/**
 * Cycles 0..count-1, pausing while the browser tab is hidden. Reduced motion
 * keeps the first entry visible.
 */
export function useRotatingIndex(count, interval = 1500) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || count <= 1) return undefined
    let id
    const start = () => {
      stop()
      id = setInterval(() => setIndex((value) => (value + 1) % count), interval)
    }
    const stop = () => id && clearInterval(id)
    const onVisibility = () => (document.hidden ? stop() : start())

    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [count, interval, reduced])

  return reduced ? 0 : index % Math.max(1, count)
}
