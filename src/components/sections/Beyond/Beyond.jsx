import { Container, Section, Reveal } from '../../layout'
import { beyond } from '../../../data/beyond'
import { BeyondCard } from './BeyondCard'

/**
 * "Beyond the Data" shows a four-up card grid of interests outside data
 * engineering.
 */
export function Beyond() {
  return (
    <Section className="py-20">
      <Container>
        <Reveal as="p" className="mb-4 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[2px] text-muted">
          When I'm away from the keyboard
        </Reveal>
        <Reveal as="h2" delay={1} className="mb-[56px] font-barlow text-display font-black uppercase text-ink">
          BEYOND THE DATA.
        </Reveal>

        <div className="grid grid-cols-4 gap-4 max-[860px]:grid-cols-2 max-[460px]:grid-cols-1">
          {beyond.map((item, index) => (
            <BeyondCard key={item.title} index={index} {...item} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
