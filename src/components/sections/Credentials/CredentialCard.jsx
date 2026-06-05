import { memo } from 'react'
import { Reveal } from '../../layout'
import { Icon } from '../../icons/Icon'

/**
 * A single credential card (certification or education). Inverts to dark on
 * hover and carries a dedicated "View" button that links to the source.
 */
export const CredentialCard = memo(function CredentialCard({ label, icon, name, sub, body, href, index }) {
  return (
    <Reveal
      delay={index > 0 ? 'd1' : undefined}
      className="group flex flex-col rounded-[18px] border border-rule bg-card p-[36px_32px] transition-[transform,background-color,border-color] duration-[250ms] hover:translate-y-[-3px] hover:border-dark hover:bg-dark"
    >
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[2px] text-muted transition-colors duration-[250ms] group-hover:text-white/50">
        {label}
      </p>
      <div className="mb-[14px] text-ink transition-colors duration-[250ms] group-hover:text-orange">
        <Icon name={icon} size={32} />
      </div>
      <h4 className="mb-[6px] font-barlow text-[22px] font-extrabold uppercase leading-[1.15] tracking-[-.3px] text-ink transition-colors duration-[250ms] group-hover:text-white">
        {name}
      </h4>
      <p className="mb-3 text-[12px] tracking-[.3px] text-muted transition-colors duration-[250ms] group-hover:text-white/50">
        {sub}
      </p>
      <p className="mb-6 text-[13px] leading-[1.65] text-body transition-colors duration-[250ms] group-hover:text-white/70">
        {body}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex w-fit items-center gap-[6px] rounded-full border-[1.5px] border-ink px-[20px] py-[9px] text-[12px] font-bold uppercase tracking-[.8px] text-ink transition-colors duration-[250ms] hover:bg-ink hover:text-white group-hover:border-white group-hover:text-white group-hover:hover:bg-white group-hover:hover:text-ink"
      >
        View ↗
      </a>
    </Reveal>
  )
}
)
