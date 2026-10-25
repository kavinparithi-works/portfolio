import { useEffect, useRef, useState } from 'react'

/** Elements the cursor morphs onto. Mark anything else with data-cursor="snap". */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="tab"], input, textarea, select, label, summary, [data-cursor="snap"], [data-cursor="box"]'

/** Corner radius of the fill on data-cursor="box" controls (rounded rectangle, not a pill). */
const BOX_RADIUS = 14

/**
 * Controls the cursor will wrap: anything pill-sized (buttons, links, chips),
 * a round badge, or anything that opts in with data-cursor="box" (filled as a
 * rounded rectangle). Other large controls get the plain hover circle.
 */
function snapRadiusFor(control, rect) {
  if (control.matches('[data-cursor="box"]')) return BOX_RADIUS
  const round = Math.abs(rect.width - rect.height) < 2
  if (rect.width <= 400 && (rect.height <= 72 || (round && rect.height <= 120))) return 'pill'
  return null
}

/**
 * Drives the custom cursor. Position (and, while snapped, size) is written
 * straight to the node every frame, so pointer motion never re-renders
 * React. State only changes when the mode changes:
 *   - `interactive`  over a control (hover circle, or snapped to it)
 *   - `snapped`      wrapping the control as a pill that follows it exactly
 *   - `magnify`      inside a [data-cursor="magnify"] headline (large lens)
 *   - `visible`      pointer is on the page
 * `ease` is the spring factor; pass 1 to follow the pointer exactly.
 */
export function useCursor({ ease = 0.18, enabled = true } = {}) {
  const dotRef = useRef(null)
  const [interactive, setInteractive] = useState(false)
  const [snapped, setSnapped] = useState(false)
  const [visible, setVisible] = useState(false)
  const [magnify, setMagnify] = useState(false)

  useEffect(() => {
    if (!enabled) return undefined

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { ...target }
    let snapEl = null
    let snapRadius = null
    let lastControl = null
    let lastMagnifyZone = null
    let hasAppeared = false
    let isPressed = false
    let scale = 1
    let frame

    const clearSnapSize = () => {
      const node = dotRef.current
      if (!node) return
      node.style.width = ''
      node.style.height = ''
      node.style.borderRadius = ''
    }

    // Decide what the cursor should do for the element under the pointer.
    const evaluate = (el) => {
      if (!(el instanceof Element)) return
      const ignored = el.closest('[data-cursor="ignore"]') !== null
      const control = ignored ? null : el.closest(INTERACTIVE_SELECTOR)
      const magnifyZone = !ignored && control === null ? el.closest('[data-cursor="magnify"]') : null

      if (control === lastControl && magnifyZone === lastMagnifyZone) return
      lastControl = control
      lastMagnifyZone = magnifyZone

      setInteractive(control !== null)
      setMagnify(magnifyZone !== null)

      const radius = control ? snapRadiusFor(control, control.getBoundingClientRect()) : null
      if (!radius && snapEl) clearSnapSize()
      snapEl = radius ? control : null
      snapRadius = radius
      setSnapped(snapEl !== null)
    }

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!hasAppeared) {
        hasAppeared = true
        current.x = e.clientX
        current.y = e.clientY
        setVisible(true)
      }
      evaluate(e.target)
    }

    const onDown = () => (isPressed = true)
    const onUp = () => (isPressed = false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    // The page moved under a resting pointer (wheel scroll, resize): re-check
    // what is now beneath it instead of dropping the fill until the next move.
    let recheck = 0
    const onScrollOrResize = () => {
      if (!hasAppeared || recheck) return
      recheck = requestAnimationFrame(() => {
        recheck = 0
        evaluate(document.elementFromPoint(target.x, target.y))
      })
    }

    const render = () => {
      const node = dotRef.current
      let goal = target
      if (snapEl) {
        // Follow the control's live box so hover transforms (lift, magnetic
        // pull) never leave the fill misaligned.
        const rect = snapEl.getBoundingClientRect()
        goal = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        if (node) {
          node.style.width = `${rect.width}px`
          node.style.height = `${rect.height}px`
          node.style.borderRadius = snapRadius === 'pill' ? `${Math.min(rect.width, rect.height) / 2}px` : `${snapRadius}px`
        }
      }
      // Snapping settles faster than free movement so the fill lands with the shape.
      const k = snapEl ? Math.min(1, ease * 1.8) : ease
      current.x += (goal.x - current.x) * k
      current.y += (goal.y - current.y) * k
      scale += ((isPressed ? 0.9 : 1) - scale) * 0.25
      if (node) {
        node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      frame = requestAnimationFrame(render)
    }

    const root = document.documentElement
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    root.addEventListener('mouseleave', onLeave)
    root.addEventListener('mouseenter', onEnter)
    frame = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (recheck) cancelAnimationFrame(recheck)
      root.removeEventListener('mouseleave', onLeave)
      root.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(frame)
    }
  }, [ease, enabled])

  return { dotRef, interactive, snapped, visible, magnify }
}
