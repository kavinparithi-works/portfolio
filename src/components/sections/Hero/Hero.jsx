import { Container, Section } from '../../layout'
import { HeroHeadline } from './HeroHeadline'
import { HeroPhoto } from './HeroPhoto'
import { HeroIntro } from './HeroIntro'
import { HeroMeta } from './HeroMeta'
import { HeroActions } from './HeroActions'
import { StatsStrip } from './StatsStrip'

/**
 * Landing band: the oversized headline, a three-column row (portrait, intro,
 * spec sheet), the calls to action and the proof-point strip.
 */
export function Hero() {
  return (
    <Section id="top" labelled={false} className="overflow-x-clip pt-28 md:pt-36">
      <div
        aria-hidden="true"
        className="dotgrid pointer-events-none absolute inset-x-0 top-0 h-[85vh] opacity-80 [mask-image:radial-gradient(ellipse_75%_60%_at_80%_0%,#000_10%,transparent_70%)]"
      />
      <Container className="relative">
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
