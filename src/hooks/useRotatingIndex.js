import { useEffect, useState } from 'react'
import { useReducedMotion } from './useMediaQuery'

/**
 * Cycles 0..count-1 on an interval and returns `{ index, previous }` so the
 * caller can animate the outgoing entry. Pauses while the tab is hidden and
 * stays on the first entry when the visitor prefers reduced motion.
 */
export function useRotatingIndex(count, interval = 2400) {
  const [state, setState] = useState({ index: 0, previous: 0 })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || count <= 1) return undefined
    let id
    const start = () => {
      stop()
      id = setInterval(() => setState(({ index }) => ({ index: (index + 1) % count, previous: index })), interval)
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

  return state
}
