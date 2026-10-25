import { Fragment } from 'react'
import { heroCopy, site } from '../../../data/site'

/**
 * The original introduction, justified inside the profile card.
 */
export function HeroIntro() {
  return (
    <div className="min-w-0 p-6 md:p-7">
      <p className="eyebrow text-[10px]">What I do</p>
      <h2 id="profile-title" className="display mt-2 text-[32px] leading-none md:text-[38px]">
        {site.role}<span className="text-orange">.</span>
      </h2>
      <p className="mt-4 text-justify text-[14px] leading-[1.7] text-body md:text-[15px]">{heroCopy.intro}</p>
      <p className="mt-4 text-justify text-[14px] leading-[1.7] text-body md:text-[15px]">
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
    </div>
  )
}
