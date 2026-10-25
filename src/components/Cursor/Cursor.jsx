import { useEffect } from 'react'
import { cn } from '../../lib/cn'
import { useCursor } from '../../hooks/useCursor'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'

/**
 * Custom cursor for mouse devices. A white shape with
 * `mix-blend-mode: difference`, so it reads dark on cream, light on the dark
 * band, inverts the big headlines like a lens, and wraps buttons and links as
 * a pill that follows them exactly (size is written per frame by useCursor).
 * Renders nothing on touch devices. The native cursor is only hidden once
 * this has mounted (html.custom-cursor), so the page never loses its pointer.
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const { dotRef, interactive, snapped, visible, magnify } = useCursor({
    enabled: fine,
    ease: reduced ? 1 : 0.18,
  })

  useEffect(() => {
    document.documentElement.classList.toggle('custom-cursor', fine)
    return () => document.documentElement.classList.remove('custom-cursor')
  }, [fine])

  if (!fine) return null

  const sizeClass = snapped
    ? 'rounded-full'
    : magnify
      ? 'h-[110px] w-[110px] rounded-full'
      : interactive
        ? 'h-12 w-12 rounded-full'
        : 'h-3.5 w-3.5 rounded-full'

  return (
    <div
      ref={dotRef}
      data-cursor-dot
      aria-hidden="true"
      style={{ mixBlendMode: 'difference', willChange: 'transform' }}
      className={cn(
        'pointer-events-none fixed top-0 left-0 z-[9999] bg-white',
        'transition-[width,height,border-radius,opacity] duration-200 ease-out',
        visible ? 'opacity-100' : 'opacity-0',
        sizeClass
      )}
    />
  )
}
