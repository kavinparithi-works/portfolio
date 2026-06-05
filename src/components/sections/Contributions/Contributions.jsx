import { Container, Section, Reveal } from '../../layout'
import { contributions } from '../../../data/contributions'
import { ContributionCard } from './ContributionCard'

/**
 * "Ways I Contribute" — a three-up grid of contribution cards.
 */
export function Contributions() {
  return (
    <Section className="py-20">
      <Container>
        <Reveal as="p" className="mb-4 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[2px] text-muted">
          Across the data lifecycle
        </Reveal>
        <Reveal as="h2" delay={1} className="mb-[56px] font-barlow text-display font-black uppercase text-ink">
          WAYS I CONTRIBUTE.
        </Reveal>
        <div className="group/cards grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
          {contributions.map((card, index) => (
            <ContributionCard key={card.num} index={index} {...card} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
