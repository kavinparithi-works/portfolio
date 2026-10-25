import { HeroIntro } from './HeroIntro'
import { HeroMeta } from './HeroMeta'
import { TaglineFlourish } from './TaglineFlourish'

/** One continuous card for the introduction, expertise and personal details. */
export function HeroProfile() {
  return (
    <article
      aria-labelledby="profile-title"
      className="fade-up relative min-w-0 overflow-hidden rounded-[24px] border border-rule bg-card shadow-[0_16px_40px_-28px_rgba(17,17,17,0.28)]"
      style={{ '--d': '520ms' }}
    >
      <div aria-hidden="true" className="absolute top-7 left-0 h-12 w-1 rounded-r-full bg-orange md:top-8" />
      <div className="grid md:grid-cols-[minmax(0,1fr)_240px]">
        <HeroIntro />
        <HeroMeta />
      </div>
      <footer className="flex items-center justify-between gap-4 border-t border-rule bg-bg/40 px-6 py-4 md:px-7">
        <TaglineFlourish />
        <span aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink" />
          <span className="h-2 w-5 rounded-full bg-orange" />
          <span className="h-2 w-2 rounded-full bg-teal" />
        </span>
      </footer>
    </article>
  )
}
