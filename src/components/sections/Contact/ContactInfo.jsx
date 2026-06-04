import React from 'react'
import { Reveal } from '../../layout'
import { site, contactCopy } from '../../../data/site'

/** A single labelled column within the contact info row. */
function InfoBlock({ head, children }) {
  return (
    <div>
      <p className="mb-[10px] text-[11px] font-bold uppercase tracking-[1.5px] text-white/50">
        {head}
      </p>
      <p className="text-[14px] leading-[1.65] text-white/[.75]">{children}</p>
    </div>
  )
}

/**
 * Four-column contact details row on the dark contact band.
 */
export function ContactInfo() {
  return (
    <Reveal delay={2} className="grid grid-cols-[160px_1fr_1fr_1fr] gap-8 border-t border-white/10 py-12 max-[780px]:grid-cols-2 max-[780px]:gap-y-8 max-[480px]:grid-cols-1">
      <p className="self-start pt-[2px] text-[11px] font-medium uppercase tracking-[2px] text-white/[.35]">
        Say Hello
      </p>

      <InfoBlock head="Contact me for">{contactCopy.contactFor}</InfoBlock>
      <InfoBlock head="Response time">{contactCopy.responseTime}</InfoBlock>
      <InfoBlock head="Where">
        {site.location}
        <br />
        <a
          href={`mailto:${site.email}`}
          data-cursor="ignore"
          className="border-b border-white/25 text-white/90 transition-colors duration-200 hover:border-white/70"
        >
          {site.email}
        </a>
      </InfoBlock>
    </Reveal>
  )
}
