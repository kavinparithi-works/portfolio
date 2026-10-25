import { Container, Section } from '../../layout'
import { heroCopy, site } from '../../../data/site'
import { HeroHeadline } from './HeroHeadline'
import { HeroPhoto } from './HeroPhoto'
import { HeroIntro } from './HeroIntro'
import { HeroMeta } from './HeroMeta'
import { HeroActions } from './HeroActions'
import { StatsStrip } from './StatsStrip'

/**
 * Landing band: eyebrow + availability, the oversized headline, a
 * three-column row (portrait, intro, spec sheet), the calls to action and
 * the proof-point strip.
 */
export function Hero() {
  return (
    <Section id="top" labelled={false} className="overflow-x-clip pt-24 md:pt-32">
      <div
        aria-hidden="true"
        className="dotgrid pointer-events-none absolute inset-x-0 top-0 h-[85vh] opacity-80 [mask-image:radial-gradient(ellipse_75%_60%_at_80%_0%,#000_10%,transparent_70%)]"
      />
      <Container className="relative">
        <div className="fade-up mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3" style={{ '--d': '40ms' }}>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-70" />
            {heroCopy.eyebrow}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-rule bg-card/70 py-1.5 pr-3.5 pl-2.5 font-mono text-[11.5px] tracking-[0.04em] text-body transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-75 motion-ok:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Open to {site.availability.split(' · ')[0].toLowerCase()}
          </a>
        </div>

        <HeroHeadline />

        <div className="mt-12 grid grid-cols-1 items-start gap-x-10 gap-y-10 md:mt-16 md:grid-cols-[200px_1fr] lg:grid-cols-[260px_minmax(0,1fr)_minmax(280px,340px)] lg:gap-x-14">
          <HeroPhoto className="fade-up w-[200px] md:w-full" style={{ '--d': '420ms' }} />
          <HeroIntro />
          <HeroMeta />
        </div>

        <div className="mt-10 md:mt-12">
          <HeroActions />
        </div>

        <div className="mt-14 md:mt-20">
          <StatsStrip />
        </div>
      </Container>
    </Section>
  )
}
