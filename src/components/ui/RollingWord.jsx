import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'
import { useRotatingIndex } from '../../hooks/useRotatingIndex'

/**
 * Cycles through `words` with a vertical roll. The box animates its width to
 * the active word so the line never jumps, and the whole thing is hidden from
 * assistive tech: render the first word in an `sr-only` span next to it.
 */
export function RollingWord({ words, interval = 2400, className }) {
  const index = useRotatingIndex(words.length, interval)
  const wordRefs = useRef([])
  const [box, setBox] = useState({ width: null, height: null })

  const measure = useCallback(() => {
    const el = wordRefs.current[index]
    // Skip when there is no layout yet (hidden element, or a DOM without layout).
    if (!el || !el.offsetHeight) return
    setBox((prev) => (prev.width === el.offsetWidth && prev.height === el.offsetHeight ? prev : { width: el.offsetWidth, height: el.offsetHeight }))
  }, [index])

  useLayoutEffect(measure, [measure])

  useEffect(() => {
    const first = wordRefs.current[0]
    if (!first || typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(measure)
    ro.observe(first)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [measure])

  return (
    <span
      aria-hidden="true"
      data-index={index}
      className={cn('roll', className)}
      style={{
        width: box.width ? `${box.width}px` : undefined,
        height: box.height ? `${box.height}px` : undefined,
      }}
    >
      <span
        className="roll-track"
        style={{ transform: box.height ? `translateY(-${index * box.height}px)` : undefined }}
      >
        {words.map((word, i) => (
          <span
            key={word}
            ref={(el) => {
              wordRefs.current[i] = el
            }}
            className="roll-word"
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  )
}
