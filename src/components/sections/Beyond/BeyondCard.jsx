import React from 'react'
import { Reveal } from '../../layout'
import { Icon } from '../../icons/Icon'

/**
 * A single "Beyond the Data" interest card. Inverts to dark on hover, matching
 * the Work / Contributions cards. The icon is black and turns orange on hover.
 */
export function BeyondCard({ icon, title, body, index }) {
  return (
    <Reveal
      delay={index}
      className="group flex flex-col items-start rounded-[18px] border border-rule bg-card p-[32px_28px] transition-[transform,background-color,border-color] duration-[250ms] hover:translate-y-[-4px] hover:border-dark hover:bg-dark"
    >
      <div className="mb-5 flex h-[56px] w-[56px] items-center justify-center rounded-2xl border border-rule bg-white text-ink transition-colors duration-[250ms] group-hover:border-white/20 group-hover:text-orange">
        <Icon name={icon} size={28} className="emoji-shake" />
      </div>
      <h3 className="mb-3 font-barlow text-[24px] font-extrabold uppercase leading-[1.1] tracking-[-.3px] text-ink transition-colors duration-[250ms] group-hover:text-white">
        {title}
      </h3>
      <p className="text-[13.5px] leading-[1.7] text-body transition-colors duration-[250ms] group-hover:text-white/70">
        {body}
      </p>
    </Reveal>
  )
}
