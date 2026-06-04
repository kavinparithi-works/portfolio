import React, { useRef, useState } from 'react'
import { Reveal } from '../../layout'
import { site } from '../../../data/site'

/** Lens radius (px) of the cartoon reveal while hovering. */
const LENS_RADIUS = 80
/** Radius large enough to cover the whole card once revealed. */
const FULL_RADIUS = 420

/**
 * Portrait card in the left hero column.
 *  - Hover: the cartoon shows only inside a circular lens that follows the
 *    cursor (like a magnifier over the real photo).
 *  - Click: the cartoon expands to fill the whole card with a smooth
 *    transition. Clicking again reverts to the photo.
 *
 * The lens position is written straight to the cartoon node's clip-path via a
 * ref so pointer movement never triggers a React re-render (no lag).
 */
export function HeroPhoto() {
  const base = import.meta.env.BASE_URL
  const wrapRef = useRef(null)
  const cartoonRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  // Imperatively paint the clip-path; avoids per-move re-renders.
  const paint = (radius, x, y, smooth) => {
    const node = cartoonRef.current
    if (!node) return
    node.style.transition = smooth
      ? 'clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1)'
      : 'clip-path 0.08s linear'
    node.style.clipPath = `circle(${radius}px at ${x}% ${y}%)`
  }

  const handleMove = (e) => {
    if (revealed) return
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    paint(LENS_RADIUS, x, y, false)
  }

  const handleLeave = () => {
    if (!revealed) paint(0, 50, 50, false)
  }

  const handleClick = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    const x = rect ? ((e.clientX - rect.left) / rect.width) * 100 : 50
    const y = rect ? ((e.clientY - rect.top) / rect.height) * 100 : 50
    setRevealed((wasRevealed) => {
      const next = !wasRevealed
      paint(next ? FULL_RADIUS : LENS_RADIUS, x, y, true)
      return next
    })
  }

  return (
    <Reveal>
      <div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        className="relative h-[260px] w-[220px] flex-shrink-0 overflow-hidden rounded-2xl border border-rule"
      >
        {/* Real photo (base layer) */}
        <img
          src={`${base}assets/images/kavin.png`}
          alt={site.name}
          className="h-full w-full object-cover object-top"
        />
        {/* Cartoon, revealed through a circular clip driven imperatively */}
        <img
          ref={cartoonRef}
          src={`${base}assets/images/kavin-cartoon.png`}
          alt={`${site.name} — illustration`}
          style={{ clipPath: 'circle(0px at 50% 50%)' }}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
    </Reveal>
  )
}
