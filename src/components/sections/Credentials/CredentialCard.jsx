import React from 'react'
import { Reveal } from '../../layout'
import { Icon } from '../../icons/Icon'

/**
 * A single credential card (certification or education). The whole card links
 * to the credential/source and inverts to dark on hover.
 */
export function CredentialCard({ label, icon, name, sub, body, href, index }) {
  return (
    <Reveal
      as="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      delay={index > 0 ? 'd1' : undefined}
      className="group block rounded-[18px] border border-rule bg-card p-[36px_32px] transition-[transform,background-color,border-color] duration-[250ms] hover:translate-y-[-3px] hover:border-dark hover:bg-dark"
    >
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[2px] text-muted transition-colors duration-[250ms] group-hover:text-white/50">
        {label}
      </p>
      <div className="mb-[14px] text-ink transition-colors duration-[250ms] group-hover:text-orange">
        <Icon name={icon} size={32} className="emoji-shake" />
      </div>
      <h4 className="mb-[6px] font-barlow text-[22px] font-extrabold uppercase leading-[1.15] tracking-[-.3px] text-ink transition-colors duration-[250ms] group-hover:text-white">
        {name}
      </h4>
      <p className="mb-3 text-[12px] tracking-[.3px] text-muted transition-colors duration-[250ms] group-hover:text-white/50">
        {sub}
      </p>
      <p className="text-[13px] leading-[1.65] text-body transition-colors duration-[250ms] group-hover:text-white/70">
        {body}
      </p>
    </Reveal>
  )
}
