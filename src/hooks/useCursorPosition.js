import { useEffect, useRef, useState } from 'react'

/**
 * Detects whether the device is a fine-pointer (mouse) device. The custom
 * cursor only makes sense there, never on touch screens.
 */
export function useHasFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)')
    const update = () => setFine(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return fine
}

/**
 * Tracks the pointer with a lightweight rAF spring so the dot eases toward the
 * cursor instead of snapping. Position (and the press-scale) are written
 * straight to the node each frame, so pointer motion never triggers a React
 * re-render. State is only updated when the *mode* changes:
 *   - `interactive` — over a link/button (the cursor morphs to its shape)
 *   - `magnify`     — inside a [data-cursor="magnify"] quote (large lens)
 *   - `snap`        — measured size/radius/darkness of the hovered control
 *   - `visible`     — pointer present on the page
 *
 * Pass `enabled: false` (touch devices) to skip all listeners and the loop.
 */
/** Inset, in px, of the button-shaped cursor inside the button it covers. */
const SNAP_INSET = 3

/** Elements the cursor reacts to as "interactive" (morphs to their shape).
 *  Mark any non-semantic element with data-cursor="snap" to opt in. */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="snap"]'

/** Parse a CSS border-radius into a number, tolerating "0px", shorthands,
 *  and elliptical "10px / 20px" forms (first value wins). */
function parseRadius(value) {
  const r = parseFloat(value)
  return Number.isFinite(r) ? r : 8
}

export function useCursor({ ease = 0.18, enabled = true } = {}) {
  const dotRef = useRef(null)
  const [interactive, setInteractive] = useState(false)
  const [visible, setVisible] = useState(false)
  const [magnify, setMagnify] = useState(false)
  // When hovering a button, the cursor morphs to its rounded-rect shape.
  const [snap, setSnap] = useState(null)

  useEffect(() => {
    // Never attach listeners or spin a rAF loop on coarse-pointer devices
    // (touch); the cursor isn't rendered there.
    if (!enabled) return undefined

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { ...target }
    // Mutable so the rAF loop can magnetically centre on a snapped button.
    const snapTarget = { current: null }
    // Remember the last hovered control + magnify zone so we only re-measure
    // on change, never on every mousemove (measuring forces a layout reflow).
    let lastControl = null
    let lastMagnifyZone = null
    let snapEl = null
    let hasAppeared = false
    let isPressed = false
    let scale = 1
    let frame

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!hasAppeared) {
        hasAppeared = true
        // Place the dot exactly under the pointer on first appearance so it
        // doesn't visibly ease in from the screen centre.
        current.x = e.clientX
        current.y = e.clientY
        setVisible(true)
      }

      const el = e.target
      // Elements marked data-cursor="ignore" opt out of the custom cursor.
      const ignored = el.closest('[data-cursor="ignore"]') !== null
      const control = ignored ? null : el.closest(INTERACTIVE_SELECTOR)
      // Magnifier only applies inside a [data-cursor="magnify"] zone (the two
      // headline quotes) and only when not over a control.
      const magnifyZone =
        !ignored && control === null ? el.closest('[data-cursor="magnify"]') : null

      // Same control AND same magnify zone as last move: nothing to update.
      // Bail out to avoid per-move layout reflows.
      if (control === lastControl && magnifyZone === lastMagnifyZone) return
      lastControl = control
      lastMagnifyZone = magnifyZone

      setInteractive(control !== null)
      setMagnify(magnifyZone !== null)

      if (control) {
        const rect = control.getBoundingClientRect()
        const style = getComputedStyle(control)
        const radius = parseRadius(style.borderRadius)
        setSnap({
          // Clamp so tiny targets never produce a negative/zero-size cursor.
          w: Math.max(rect.width - SNAP_INSET * 2, 8),
          h: Math.max(rect.height - SNAP_INSET * 2, 8),
          radius: Math.max(radius - SNAP_INSET, 4),
        })
        // Keep a ref to the element so the rAF loop can re-read its live
        // centre — buttons with hover:translate-y move AFTER this measurement.
        snapEl = control
        snapTarget.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      } else {
        snapEl = null
        setSnap(null)
        snapTarget.current = null
      }
    }

    const onDown = () => {
      isPressed = true
    }
    const onUp = () => {
      isPressed = false
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    // On scroll or resize a snapped button moves under the fixed cursor, so
    // the cached centre goes stale. Drop the snap and let the next move
    // re-evaluate from scratch.
    const invalidateSnap = () => {
      if (lastControl || lastMagnifyZone) {
        lastControl = null
        lastMagnifyZone = null
        snapEl = null
        snapTarget.current = null
        setSnap(null)
        setInteractive(false)
        setMagnify(false)
      }
    }

    const render = () => {
      // While snapped, re-read the element's live rect so the cursor follows
      // hover transforms (e.g. hover:translate-y) and stays perfectly centred.
      if (snapEl) {
        const rect = snapEl.getBoundingClientRect()
        snapTarget.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      }
      // Magnetically settle on the button centre; otherwise trail the mouse.
      const goal = snapTarget.current || target
      current.x += (goal.x - current.x) * ease
      current.y += (goal.y - current.y) * ease
      // Ease the press-scale here too so it composes with the translate
      // (a Tailwind class can't, since this inline transform always wins).
      scale += ((isPressed ? 0.9 : 1) - scale) * 0.25
      const node = dotRef.current
      if (node) {
        node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      frame = requestAnimationFrame(render)
    }

    const root = document.documentElement
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('scroll', invalidateSnap, { passive: true })
    window.addEventListener('resize', invalidateSnap)
    root.addEventListener('mouseleave', onLeave)
    root.addEventListener('mouseenter', onEnter)
    frame = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('scroll', invalidateSnap)
      window.removeEventListener('resize', invalidateSnap)
      root.removeEventListener('mouseleave', onLeave)
      root.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(frame)
    }
  }, [ease, enabled])

  return { dotRef, interactive, visible, magnify, snap }
}
