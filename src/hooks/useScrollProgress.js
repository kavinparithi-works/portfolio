import { useEffect } from 'react'

/**
 * Calls `onProgress(0..1)` as the page scrolls, throttled to animation frames.
 * With no `ref`, progress is the whole document; with a `ref`, it is how far
 * the element has travelled through the viewport (0 = top enters at the
 * bottom edge, 1 = bottom leaves the `end` fraction of the viewport).
 */
export function useScrollProgress(onProgress, { ref, end = 0.7 } = {}) {
  useEffect(() => {
    let frame = 0
    const compute = () => {
      frame = 0
      let p
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect()
        const vh = window.innerHeight
        const total = rect.height + vh * end
        p = (vh * end - rect.top) / total
      } else {
        const max = document.documentElement.scrollHeight - window.innerHeight
        p = max > 0 ? window.scrollY / max : 0
      }
      onProgress(Math.min(1, Math.max(0, p)))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [onProgress, ref, end])
}
