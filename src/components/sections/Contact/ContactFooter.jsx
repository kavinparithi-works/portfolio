import React from 'react'
import { Reveal } from '../../layout'
import { site } from '../../../data/site'

const footerLinkClass =
  'inline-flex items-center rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[1.5px] text-white/[.45] transition-colors duration-200 hover:text-white'

/**
 * Bottom footer row inside the dark contact band: email/linkedin + signature.
 */
export function ContactFooter() {
  return (
    <Reveal delay={3} className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-7">
      <div className="flex gap-8">
        <a href={`mailto:${site.email}`} className={footerLinkClass}>
          EMAIL
        </a>
        <a href={site.linkedin} target="_blank" rel="noreferrer" className={footerLinkClass}>
          LINKEDIN
        </a>
      </div>
      <span className="text-[11px] tracking-[.5px] text-white/25">
        KAVIN PARITHI SIVASAMY · DATA ENGINEER
      </span>
    </Reveal>
  )
}
