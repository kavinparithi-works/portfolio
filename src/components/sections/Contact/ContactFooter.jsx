import React from 'react'
import { Reveal } from '../../layout'

/**
 * Bottom footer row inside the dark contact band: just the signature.
 * Email/LinkedIn live in the nav and the "Where" block, so no links here.
 */
export function ContactFooter() {
  return (
    <Reveal delay={3} className="flex flex-wrap items-center justify-end gap-4 border-t border-white/10 py-7">
      <span className="text-[11px] tracking-[.5px] text-white/25">
        KAVIN PARITHI SIVASAMY · DATA ENGINEER
      </span>
    </Reveal>
  )
}
