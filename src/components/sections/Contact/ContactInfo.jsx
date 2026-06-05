import { Reveal } from '../../layout'
import { Icon } from '../../icons/Icon'
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
      <div>
        <p className="mb-[10px] text-[11px] font-bold uppercase tracking-[1.5px] text-white/50">
          Say Hello
        </p>
        <div className="flex items-center gap-3">
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="group flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-200 hover:border-orange hover:text-orange"
          >
            <Icon name="instagram" size={20} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="group flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-200 hover:border-orange hover:text-orange"
          >
            <Icon name="linkedin" size={20} />
          </a>
        </div>
      </div>

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
