import React from 'react'
import { Reveal } from '../../layout'
import { useRotatingWord } from '../../../hooks/useRotatingWord'

/** Accent words cycled through in the last headline line, 1s apart. */
const ROTATING_WORDS = ['DATA.', 'DATABRICKS.', 'PROBLEMS.', 'SOLUTIONS.']

/**
 * Oversized display headline. The final word rotates through ROTATING_WORDS on
 * a 1s interval. The `.hero-hl` class carries the +2px hover zoom defined in
 * styles/index.css.
 */
export function HeroHeadline() {
  const word = useRotatingWord(ROTATING_WORDS, 1200)

  return (
    <Reveal className="relative mb-10">
      <h3 data-cursor="magnify" className="hero-hl font-barlow font-black uppercase text-ink">
        <div>
          I BUILD <span className="text-orange">PIPELINES.</span>
        </div>
        <div>I'M MORE INTERESTED</div>
        <div>
          IN THE <span className="text-orange">{word}</span>
        </div>
      </h3>
    </Reveal>
  )
}
