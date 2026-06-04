import React, { useEffect, useRef, useState } from 'react'
import { Reveal } from '../../layout'
import { site } from '../../../data/site'

/** Lens radius (px) of the cartoon reveal while hovering (desktop). */
const LENS_RADIUS = 80
/** Radius large enough to cover the whole card once revealed. */
const FULL_RADIUS = 420

/**
 * Portrait card in the left hero column.
 *  - Desktop (fine pointer): the cartoon shows inside a circular lens that
 *    follows the cursor; clicking expands it to fully reveal.
 *  - Mobile (coarse pointer): no lens. Tapping expands the cartoon from the
 *    tap point to fully cover; tapping again collapses it back toward the new
 *    tap point, reverting to the photo.
 *
 * The clip-path is written straight to the node via a ref so pointer movement
 * never triggers a React re-render (no lag).
 */
export function HeroPhoto() {
  const base = import.meta.env.BASE_URL
  const wrapRef = useRef(null)
  const cartoonRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // Imperatively paint the clip-path; avoids per-move re-renders.
  const paint = (radius, x, y, smooth) => {
    const node = cartoonRef.current
    if (!node) return
    node.style.transition = smooth
      ? 'clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1)'
      : 'clip-path 0.08s linear'
    node.style.clipPath = `circle(${radius}px at ${x}% ${y}%)`
  }

  const pointPercent = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return { x: 50, y: 50 }
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    }
  }

  // Desktop only: lens follows the cursor.
  const handleMove = (e) => {
    if (isTouch || revealed) return
    const { x, y } = pointPercent(e)
    paint(LENS_RADIUS, x, y, false)
  }

  const handleLeave = () => {
    if (!isTouch && !revealed) paint(0, 50, 50, false)
  }

  const handleClick = (e) => {
    const { x, y } = pointPercent(e)
    setRevealed((wasRevealed) => {
      const next = !wasRevealed
      // Touch reverts fully to the photo (radius 0) collapsing toward the tap;
      // desktop reverts to the hover lens since the cursor is still there.
      const revertRadius = isTouch ? 0 : LENS_RADIUS
      paint(next ? FULL_RADIUS : revertRadius, x, y, true)
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
