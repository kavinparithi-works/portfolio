import { Container, Section } from '../../layout'
import { HeroHeadline } from './HeroHeadline'
import { HeroPhoto } from './HeroPhoto'
import { HeroIntro } from './HeroIntro'

/**
 * Landing hero: display headline above a photo + intro two-column layout.
 */
export function Hero() {
  return (
    <Section>
      <Container>
        <div className="relative flex flex-col justify-start pt-[60px]">
          <HeroHeadline />
        </div>
        <div className="grid grid-cols-[220px_1fr] items-start gap-[72px] pb-20 max-[760px]:grid-cols-1 max-[760px]:gap-10">
          <HeroPhoto />
          <HeroIntro />
        </div>
      </Container>
    </Section>
  )
}
