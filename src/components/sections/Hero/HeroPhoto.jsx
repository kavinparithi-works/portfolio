import { useRef, useState } from 'react'
import { site } from '../../../data/site'
import { credentials } from '../../../data/credentials'
import { useFinePointer } from '../../../hooks/useMediaQuery'
import { Icon } from '../../icons/Icon'

const LENS_RADIUS = 70
const FULL_RADIUS = 520
const base = import.meta.env.BASE_URL
const srcSet = (name) => `${base}assets/images/${name}-320.webp 320w, ${base}assets/images/${name}-480.webp 480w, ${base}assets/images/${name}-640.webp 640w`

/**
 * Full portrait in a rounded rectangle on phones and a pill on wider screens,
 * with the illustrated version hiding underneath.
 *  - Mouse: the illustration shows through a lens that follows the pointer;
 *    a click reveals it fully, another click goes back.
 *  - Touch: tapping toggles between photo and illustration from the tap point.
 * The clip-path is written straight to the node, so pointer movement never
 * re-renders React. A small rotating badge links to the Databricks credential.
 */
export function HeroPhoto({ className = '', style }) {
  const wrapRef = useRef(null)
  const cartoonRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const fine = useFinePointer()
  const credential = credentials[0]

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
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-ink bg-bg-deep focus-visible:outline-offset-4 md:rounded-[999px]"
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
          className="h-full w-full object-contain object-center md:object-cover"
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
          className="pointer-events-none absolute inset-0 h-full w-full object-contain object-center md:object-cover"
        />
      </button>

      <a
        href={credential.href}
        target="_blank"
        rel="noreferrer"
        className="group absolute right-3 bottom-3 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-bg text-orange-deep shadow-[0_6px_20px_-8px_rgba(0,0,0,.35)] ring-1 ring-rule transition-transform duration-300 hover:scale-105 md:-right-6 md:bottom-6 md:h-[104px] md:w-[104px]"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full motion-ok:animate-[spin_22s_linear_infinite]" aria-hidden="true">
          <defs>
            <path id="badge-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <text className="fill-current font-mono text-[7.4px] font-medium tracking-[0.08em] uppercase">
            <textPath href="#badge-circle">Databricks · Data Engineer Professional ·</textPath>
          </text>
        </svg>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-white transition-colors duration-300 group-hover:bg-ink">
          <Icon name="check" size={16} strokeWidth={2.6} />
        </span>
        <span className="sr-only">Verify the {credential.name} credential</span>
      </a>
    </div>
  )
}
