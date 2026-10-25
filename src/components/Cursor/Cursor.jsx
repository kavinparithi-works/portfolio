import { useEffect } from 'react'
import { cn } from '../../lib/cn'
import { useCursor } from '../../hooks/useCursor'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'

/**
 * Custom cursor for mouse devices. A white shape with
 * `mix-blend-mode: difference`, so it reads dark on cream, light on the dark
 * band, inverts the big headlines like a lens, and morphs onto any control.
 * Renders nothing on touch devices. The native cursor is only hidden once
 * this has mounted (html.custom-cursor), so the page never loses its pointer.
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const { dotRef, interactive, visible, magnify, snap } = useCursor({
    enabled: fine,
    ease: reduced ? 1 : 0.18,
  })

  useEffect(() => {
    document.documentElement.classList.toggle('custom-cursor', fine)
    return () => document.documentElement.classList.remove('custom-cursor')
  }, [fine])

  if (!fine) return null

  const sizeClass = snap
    ? ''
    : magnify
      ? 'h-[110px] w-[110px] rounded-full'
      : interactive
        ? 'h-12 w-12 rounded-full'
        : 'h-3.5 w-3.5 rounded-full'

  const snapStyle = snap ? { width: `${snap.w}px`, height: `${snap.h}px`, borderRadius: `${snap.radius}px` } : null

  return (
    <div
      ref={dotRef}
      data-cursor-dot
      aria-hidden="true"
      style={{ mixBlendMode: 'difference', willChange: 'transform', ...snapStyle }}
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-[9999] bg-white',
        'transition-[width,height,border-radius,opacity] duration-200 ease-out',
        visible ? 'opacity-100' : 'opacity-0',
        sizeClass
      )}
    />
  )
}
