import { Container, Section } from '../../layout'
import { HeroHeadline } from './HeroHeadline'
import { HeroPhoto } from './HeroPhoto'
import { HeroProfile } from './HeroProfile'
import { HeroActions } from './HeroActions'

/**
 * Landing band: the headline, portrait, combined profile card and actions.
 */
export function Hero() {
  return (
    <Section id="top" labelled={false} className="overflow-x-clip pt-20 pb-14 md:pt-[84px] md:pb-20">
      <div
        aria-hidden="true"
        className="dotgrid pointer-events-none absolute inset-x-0 top-0 h-[85vh] opacity-80 [mask-image:radial-gradient(ellipse_75%_60%_at_80%_0%,#000_10%,transparent_70%)]"
      />
      <Container className="relative">
        <HeroHeadline />

        <div className="mt-10 grid grid-cols-1 items-center gap-y-8 md:mt-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-8 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-x-10">
          <HeroPhoto className="fade-up mx-auto w-[240px] lg:mx-0 lg:w-full" style={{ '--d': '420ms' }} />
          <HeroProfile />
        </div>

        <div className="hidden md:mt-12 md:block">
          <HeroActions />
        </div>
      </Container>
    </Section>
  )
}
