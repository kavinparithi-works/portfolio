import { Container, Section, Reveal } from '../../layout'
import { credentials } from '../../../data/credentials'
import { CredentialCard } from './CredentialCard'

/**
 * "Credentials" — certification and education cards in a two-up grid.
 */
export function Credentials() {
  return (
    <Section className="py-20">
      <Container>
        <Reveal as="p" className="mb-4 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[2px] text-muted">
          Proof of the work
        </Reveal>
        <Reveal as="h2" delay={1} className="mb-12 font-barlow text-display-sm font-black uppercase text-ink">
          CREDENTIALS.
        </Reveal>
        <div className="grid grid-cols-2 gap-4 max-[580px]:grid-cols-1">
          {credentials.map((credential, index) => (
            <CredentialCard key={credential.name} index={index} {...credential} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
