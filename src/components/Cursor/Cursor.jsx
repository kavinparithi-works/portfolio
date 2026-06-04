import React from 'react'
import { cn } from '../../lib/cn'
import { useCursor, useHasFinePointer } from '../../hooks/useCursorPosition'

/**
 * Global custom cursor.
 *
 * It is a pure-white shape rendered with `mix-blend-mode: difference`, which
 * gives several behaviours from one element:
 *   - over the cream background it reads as a soft charcoal dot
 *   - over the big dark headline quotes it INVERTS the letters to cream,
 *     producing a magnifier / spotlight reveal
 *   - over the dark contact section it reads light automatically
 *   - over a button/link it MORPHS into that control's rounded-rect shape,
 *     inset a few px, and magnetically centres on it
 *
 * Renders nothing on touch / coarse-pointer devices.
 */
export function Cursor() {
  const hasFinePointer = useHasFinePointer()
  // Hooks must run unconditionally; pass `enabled` so the effect no-ops on
  // touch devices instead of conditionally calling the hook.
  const { dotRef, interactive, visible, magnify, snap } = useCursor({
    enabled: hasFinePointer,
  })

  if (!hasFinePointer) return null

  // When snapped to a button we drive width/height/radius via inline style so
  // they can match the exact element; otherwise use the size tokens below.
  const sizeClass = snap
    ? ''
    : magnify
      ? 'h-[120px] w-[120px] rounded-full'
      : interactive
        ? 'h-12 w-12 rounded-full'
        : 'h-4 w-4 rounded-full'

  // Snapped to a control: a SOLID white fill with mix-blend-difference. The
  // blend inverts every pixel beneath the cursor, so the button's colours flip
  // inside the shape on ANY background — dark pill, white chip, or a future
  // re-theme — with no special case.
  const snapStyle = snap
    ? {
        width: `${snap.w}px`,
        height: `${snap.h}px`,
        borderRadius: `${snap.radius}px`,
      }
    : null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{ mixBlendMode: 'difference', willChange: 'transform', ...snapStyle }}
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[9999] bg-white',
        // NOTE: transform is intentionally NOT transitioned here — the rAF
        // spring in useCursor drives it every frame. Transitioning it too
        // would double-ease the motion and make the cursor feel laggy.
        'transition-[width,height,border-radius,opacity] duration-200 ease-out',
        visible ? 'opacity-100' : 'opacity-0',
        sizeClass
      )}
    />
  )
}
