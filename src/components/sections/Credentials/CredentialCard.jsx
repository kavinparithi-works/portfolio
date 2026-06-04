import React from 'react'
import { cn } from '../../../lib/cn'
import { Reveal } from '../../layout'
import { useTapActive } from '../../../hooks/useTapActive'

/**
 * A single credential card (certification or education). The whole card links
 * to the credential/source and inverts to dark on hover (desktop) or tap
 * (touch).
 */
export function CredentialCard({ label, icon, name, sub, body, href, index }) {
  const { ref, active } = useTapActive()

  return (
    <Reveal
      ref={ref}
      as="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      delay={index > 0 ? 'd1' : undefined}
      className={cn(
        'group block rounded-[18px] border border-rule bg-card p-[36px_32px] transition-[transform,background-color,border-color] duration-[250ms]',
        'hover:translate-y-[-3px] hover:border-dark hover:bg-dark',
        active && 'tapped translate-y-[-3px] border-dark bg-dark'
      )}
    >
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[2px] text-muted transition-colors duration-[250ms] group-hover:text-white/50 group-[.tapped]:text-white/50">
        {label}
      </p>
      <div className="mb-[14px] text-[32px]">{icon}</div>
      <h4 className="mb-[6px] font-barlow text-[22px] font-extrabold uppercase leading-[1.15] tracking-[-.3px] text-ink transition-colors duration-[250ms] group-hover:text-white group-[.tapped]:text-white">
        {name}
      </h4>
      <p className="mb-3 text-[12px] tracking-[.3px] text-muted transition-colors duration-[250ms] group-hover:text-white/50 group-[.tapped]:text-white/50">
        {sub}
      </p>
      <p className="text-[13px] leading-[1.65] text-body transition-colors duration-[250ms] group-hover:text-white/70 group-[.tapped]:text-white/70">
        {body}
      </p>
    </Reveal>
  )
}
