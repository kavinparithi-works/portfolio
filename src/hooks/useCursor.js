import { useEffect, useRef, useState } from 'react'

/** Inset, in px, of the control-shaped cursor inside the control it covers. */
const SNAP_INSET = 3

/** Elements the cursor morphs onto. Mark anything else with data-cursor="snap". */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="tab"], input, textarea, select, label, [data-cursor="snap"]'

function parseRadius(value) {
  const r = parseFloat(value)
  return Number.isFinite(r) ? r : 8
}

/**
 * Drives the custom cursor. Position is written straight to the node every
 * frame (no React re-render on mousemove); state only changes when the mode
 * changes:
 *   - `interactive`  over a control (cursor morphs to the control's shape)
 *   - `magnify`      inside a [data-cursor="magnify"] headline (large lens)
 *   - `snap`         measured size/radius of the hovered control
 *   - `visible`      pointer is on the page
 * `ease` is the spring factor; pass 1 to follow the pointer exactly.
 */
export function useCursor({ ease = 0.18, enabled = true } = {}) {
  const dotRef = useRef(null)
  const [interactive, setInteractive] = useState(false)
  const [visible, setVisible] = useState(false)
  const [magnify, setMagnify] = useState(false)
  const [snap, setSnap] = useState(null)

  useEffect(() => {
    if (!enabled) return undefined

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { ...target }
    let snapEl = null
    let lastControl = null
    let lastMagnifyZone = null
    let hasAppeared = false
    let isPressed = false
    let scale = 1
    let frame

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!hasAppeared) {
        hasAppeared = true
        current.x = e.clientX
        current.y = e.clientY
        setVisible(true)
      }
      const el = e.target instanceof Element ? e.target : null
      if (!el) return
      const ignored = el.closest('[data-cursor="ignore"]') !== null
      const control = ignored ? null : el.closest(INTERACTIVE_SELECTOR)
      const magnifyZone = !ignored && control === null ? el.closest('[data-cursor="magnify"]') : null

      if (control === lastControl && magnifyZone === lastMagnifyZone) return
      lastControl = control
      lastMagnifyZone = magnifyZone

      setInteractive(control !== null)
      setMagnify(magnifyZone !== null)

      if (control) {
        const rect = control.getBoundingClientRect()
        const radius = parseRadius(getComputedStyle(control).borderRadius)
        setSnap({
          w: Math.max(rect.width - SNAP_INSET * 2, 8),
          h: Math.max(rect.height - SNAP_INSET * 2, 8),
          radius: Math.max(radius - SNAP_INSET, 4),
        })
        snapEl = control
      } else {
        snapEl = null
        setSnap(null)
      }
    }

    const onDown = () => (isPressed = true)
    const onUp = () => (isPressed = false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const invalidateSnap = () => {
      if (lastControl || lastMagnifyZone) {
        lastControl = null
        lastMagnifyZone = null
        snapEl = null
        setSnap(null)
        setInteractive(false)
        setMagnify(false)
      }
    }

    const render = () => {
      let goal = target
      if (snapEl) {
        const rect = snapEl.getBoundingClientRect()
        goal = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      }
      current.x += (goal.x - current.x) * ease
      current.y += (goal.y - current.y) * ease
      scale += ((isPressed ? 0.9 : 1) - scale) * 0.25
      const node = dotRef.current
      if (node) {
        node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      frame = requestAnimationFrame(render)
    }

    const root = document.documentElement
    window.addEventListener('mousemove', onMove, { passive: true })
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
