import { useEffect, useRef, useState } from 'react'

/**
 * On touch devices (no hover), lets an element toggle an "active" state on tap
 * so hover-style effects have a usable equivalent. On mouse devices it stays
 * inert and the normal :hover styles take over.
 *
 * Returns a ref to attach to the element and the current active boolean. The
 * element should apply its hover styles for BOTH `:hover` and the active class
 * (we expose `active` so the component can add a class like `is-active`).
 */
export function useTapActive() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    // Only wire tap behaviour on coarse (touch) pointers.
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (!coarse) return undefined

    const el = ref.current
    if (!el) return undefined

    const onToggle = () => setActive((v) => !v)
    el.addEventListener('click', onToggle)
    return () => el.removeEventListener('click', onToggle)
  }, [])

  return { ref, active }
}
