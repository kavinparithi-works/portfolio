import React from 'react'
import { cn } from '../../../lib/cn'
import { Reveal } from '../../layout'

/**
 * One "Way I Contribute" card. The `first` variant is the dark feature card;
 * `other` is the light bordered card.
 */
export function ContributionCard({ num, title, body, tag, variant, index }) {
  const isFirst = variant === 'first'

  return (
    <Reveal
      delay={index}
      className={cn(
        'group flex flex-col rounded-[18px] p-[36px_30px] transition-transform duration-[250ms] hover:translate-y-[-4px]',
        isFirst ? 'bg-dark text-white' : 'border border-rule bg-card'
      )}
    >
      <div className="mb-8 font-barlow text-[52px] font-black leading-none text-orange">
        {num}
      </div>
      <div
        className={cn(
          'mb-4 whitespace-pre-line font-barlow text-[28px] font-extrabold uppercase leading-[1.1] tracking-[-.3px]',
          isFirst ? 'text-white' : 'text-ink'
        )}
      >
        {title}
      </div>
      <p
        className={cn(
          'mb-7 flex-1 text-[13.5px] leading-[1.7]',
          isFirst ? 'text-white/[.65]' : 'text-body'
        )}
      >
        {body}
      </p>
      <span
        data-cursor="snap"
        className={cn(
          'inline-flex w-fit items-center rounded-full px-[18px] py-2 text-[12px] font-bold uppercase tracking-[.8px] transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white',
          isFirst ? 'bg-white text-ink' : 'border-[1.5px] border-rule text-ink'
        )}
      >
        {tag}
      </span>
    </Reveal>
  )
}
