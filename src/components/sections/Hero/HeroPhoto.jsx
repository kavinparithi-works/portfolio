import { useRef, useState } from 'react'
import { site } from '../../../data/site'
import { useFinePointer } from '../../../hooks/useMediaQuery'

const LENS_RADIUS = 70
const FULL_RADIUS = 520
const base = import.meta.env.BASE_URL
const srcSet = (name) => `${base}assets/images/${name}-320.webp 320w, ${base}assets/images/${name}-480.webp 480w, ${base}assets/images/${name}-640.webp 640w`

/**
 * Full portrait with square corners and the illustrated version underneath.
 *  - Mouse: the illustration shows through a lens that follows the pointer;
 *    a click reveals it fully, another click goes back.
 *  - Touch: tapping toggles between photo and illustration from the tap point.
 * The clip-path is written straight to the node, so pointer movement never
 * re-renders React.
 */
export function HeroPhoto({ className = '', style }) {
  const wrapRef = useRef(null)
  const cartoonRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const fine = useFinePointer()

  const paint = (radius, x, y, smooth) => {
    const node = cartoonRef.current
    if (!node) return
    node.style.transition = smooth ? 'clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1)' : 'clip-path 0.08s linear'
    node.style.clipPath = `circle(${radius}px at ${x}% ${y}%)`
  }

  const pointPercent = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return { x: 50, y: 50 }
    return { x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 }
  }

  const setDotHidden = (hidden) => {
    const dot = document.querySelector('[data-cursor-dot]')
    if (dot) dot.style.opacity = hidden ? '0' : ''
  }

  const onMove = (e) => {
    if (!fine || revealed) return
    const { x, y } = pointPercent(e)
    paint(LENS_RADIUS, x, y, false)
  }
  const onLeave = () => {
    setDotHidden(false)
    if (fine && !revealed) paint(0, 50, 50, false)
  }
  const toggle = (e) => {
    const { x, y } = pointPercent(e)
    setRevealed((was) => {
      const next = !was
      paint(next ? FULL_RADIUS : fine ? LENS_RADIUS : 0, x, y, true)
      return next
    })
  }

  return (
    <div className={`relative ${className}`} style={style}>
      <button
        ref={wrapRef}
        type="button"
        data-cursor="ignore"
        onMouseEnter={() => setDotHidden(true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={toggle}
        aria-pressed={revealed}
        aria-label={revealed ? 'Show the photo' : 'Show the illustrated version'}
        style={{ isolation: 'isolate' }}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-none border border-ink bg-bg-deep focus-visible:outline-offset-4"
      >
        <img
          src={`${base}assets/images/kavin-480.webp`}
          srcSet={srcSet('kavin')}
          sizes="(max-width: 1023px) 240px, (max-width: 1279px) 220px, 260px"
          alt={`${site.name}, smiling, in a black shirt and jacket`}
          width="480"
          height="600"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-contain object-center"
        />
        <img
          ref={cartoonRef}
          src={`${base}assets/images/kavin-cartoon-480.webp`}
          srcSet={srcSet('kavin-cartoon')}
          sizes="(max-width: 1023px) 240px, (max-width: 1279px) 220px, 260px"
          alt=""
          width="480"
          height="600"
          loading="lazy"
          decoding="async"
          style={{ clipPath: 'circle(0px at 50% 50%)' }}
          className="pointer-events-none absolute inset-0 h-full w-full object-contain object-center"
        />
      </button>
    </div>
  )
}
