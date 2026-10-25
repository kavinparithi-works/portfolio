import { Fragment } from 'react'
import { heroCopy } from '../../../data/site'
import { TaglineFlourish } from './TaglineFlourish'

/**
 * Intro paragraph, specialisations and the tagline.
 */
export function HeroIntro() {
  return (
    <div className="fade-up max-w-[560px]" style={{ '--d': '520ms' }}>
      <p className="text-[14.5px] leading-[1.65] text-body md:text-[16.5px]">{heroCopy.intro}</p>
      <p className="mt-3 text-[14.5px] leading-[1.65] text-body md:mt-4 md:text-[16.5px]">
        Specialized in{' '}
        {heroCopy.stacks.map((stack, i) => {
          const isLast = i === heroCopy.stacks.length - 1
          return (
            <Fragment key={stack}>
              {isLast && '& '}
              <span className="font-semibold text-orange-deep">{stack}</span>
              {!isLast && ', '}
            </Fragment>
          )
        })}
        . {heroCopy.focus}
      </p>
      <TaglineFlourish className="mt-4" />
    </div>
  )
}
