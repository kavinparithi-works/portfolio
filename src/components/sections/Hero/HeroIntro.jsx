import { heroCopy, site } from '../../../data/site'

/**
 * The editorial half of the profile card, with a shorter introduction on phones.
 */
export function HeroIntro() {
  return (
    <div className="min-w-0 p-6 md:p-7">
      <p className="eyebrow text-[10px]">What I do</p>
      <h2 id="profile-title" className="display mt-2 text-[32px] leading-none md:text-[38px]">
        {site.role}<span className="text-orange">.</span>
      </h2>
      <p className="mt-4 text-[14px] leading-[1.7] text-body md:hidden">{heroCopy.introCompact}</p>
      <p className="mt-4 hidden text-[15px] leading-[1.7] text-body md:block">{heroCopy.intro}</p>
      <ul aria-label="Specialisations" className="mt-5 flex flex-wrap gap-2">
        {heroCopy.stacks.map((stack) => (
          <li key={stack} className="rounded-full border border-orange/20 bg-orange/[0.04] px-3 py-1 text-[11.5px] font-medium text-orange-deep">
            {stack}
          </li>
        ))}
      </ul>
      <p className="mt-4 hidden text-[13px] leading-[1.65] text-muted md:block">{heroCopy.focus}</p>
    </div>
  )
}
