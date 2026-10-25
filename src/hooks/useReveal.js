import { useEffect, useRef, useState } from 'react'
import { observeReveal } from '../lib/revealObserver'

/**
 * Returns `[ref, revealed]`. `revealed` flips to true the first time the
 * element scrolls into view.
 */
export function useReveal() {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || revealed) return undefined
    return observeReveal(el, () => setRevealed(true))
  }, [revealed])

  return [ref, revealed]
}
