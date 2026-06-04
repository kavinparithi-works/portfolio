import React from 'react'
import { cn } from '../../../lib/cn'
import { Reveal } from '../../layout'
import { useTapActive } from '../../../hooks/useTapActive'

/**
 * One "Way I Contribute" card. The `first` variant is dark by default and
 * inverts to light; the others are light and invert to dark. Inversion fires
 * on hover (desktop, with row-coordination for card 1) or tap (touch, per card).
 */
export function ContributionCard({ num, title, body, tag, variant, index }) {
  const isFirst = variant === 'first'
  const { ref, active } = useTapActive()

  return (
    <Reveal
      ref={ref}
      delay={index}
      className={cn(
        'group flex flex-col rounded-[18px] border p-[36px_30px] transition-[transform,background-color,border-color] duration-[250ms] hover:translate-y-[-4px]',
        isFirst
          ? // dark by default -> inverts to light when ANY card in the row is hovered
            'border-transparent bg-dark group-hover/cards:border-rule group-hover/cards:bg-card'
          : // light by default -> inverts to dark only on its own hover
            'border-rule bg-card hover:border-dark hover:bg-dark',
        // touch tap state
        active &&
          (isFirst
            ? 'tapped translate-y-[-4px] border-rule bg-card'
            : 'tapped translate-y-[-4px] border-dark bg-dark')
      )}
    >
      <div className="mb-8 font-barlow text-[52px] font-black leading-none text-orange">
        {num}
      </div>
      <div
        className={cn(
          'mb-4 whitespace-pre-line font-barlow text-[28px] font-extrabold uppercase leading-[1.1] tracking-[-.3px] transition-colors duration-[250ms]',
          isFirst
            ? 'text-white group-hover/cards:text-ink group-[.tapped]:text-ink'
            : 'text-ink group-hover:text-white group-[.tapped]:text-white'
        )}
      >
        {title}
      </div>
      <p
        className={cn(
          'mb-7 flex-1 text-[13.5px] leading-[1.7] transition-colors duration-[250ms]',
          isFirst
            ? 'text-white/[.65] group-hover/cards:text-body group-[.tapped]:text-body'
            : 'text-body group-hover:text-white/[.65] group-[.tapped]:text-white/[.65]'
        )}
      >
        {body}
      </p>
      <span
        data-cursor="snap"
        className={cn(
          'inline-flex w-fit items-center rounded-full px-[18px] py-2 text-[12px] font-bold uppercase tracking-[.8px] transition-colors duration-[250ms]',
          isFirst
            ? 'bg-white text-ink group-hover/cards:border-[1.5px] group-hover/cards:border-rule group-hover/cards:bg-transparent group-hover/cards:text-ink group-[.tapped]:border-[1.5px] group-[.tapped]:border-rule group-[.tapped]:bg-transparent group-[.tapped]:text-ink'
            : 'border-[1.5px] border-rule text-ink group-hover:border-white/30 group-hover:text-white group-[.tapped]:border-white/30 group-[.tapped]:text-white'
        )}
      >
        {tag}
      </span>
    </Reveal>
  )
}
