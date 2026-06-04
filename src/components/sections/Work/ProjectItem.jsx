import React from 'react'
import { Reveal } from '../../layout'
import { Icon } from '../../icons/Icon'

/**
 * A single "Selected Works" card: sector + icon header, title, description,
 * tech tags, and status. Inverts to dark on hover.
 */
export function ProjectItem({ sector, title, desc, tags, icon, status, index }) {
  return (
    <Reveal
      delay={index}
      className="group flex flex-col rounded-[18px] border border-rule bg-card p-[36px_30px] transition-[transform,background-color,border-color] duration-[250ms] hover:translate-y-[-4px] hover:border-dark hover:bg-dark"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[2px] text-orange">
          {sector}
        </p>
        <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-xl border border-rule bg-white text-ink transition-colors duration-[250ms] group-hover:border-white/20 group-hover:text-orange">
          <Icon name={icon} size={24} className="emoji-shake" />
        </div>
      </div>

      <h3 className="mb-4 font-barlow text-worktitle font-extrabold uppercase text-ink transition-colors duration-[250ms] group-hover:text-white">
        {title}
      </h3>

      <p className="mb-6 max-w-[720px] text-[14px] leading-[1.72] text-body transition-colors duration-[250ms] group-hover:text-white/70">
        {desc}
      </p>

      <div className="mb-5 flex flex-wrap gap-[7px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-orange/40 px-[13px] py-1 text-[11.5px] font-medium text-orange transition-colors duration-[250ms] group-hover:border-white/30 group-hover:text-white/80"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className="text-[10px] font-semibold uppercase tracking-[1.2px] text-muted transition-colors duration-[250ms] group-hover:text-white/50">
        {status}
      </span>
    </Reveal>
  )
}
