import { useSyncExternalStore } from 'react'
import { experience } from '../../../data/experience'
import { Container, Section, SectionHeading, Reveal } from '../../layout'
import { Chip } from '../../ui/Chip'
import { Icon } from '../../icons/Icon'
import { Credentials } from '../Credentials/Credentials'
import { tenureSince } from '../../../lib/tenure'

const BUILD_TENURE = tenureSince(experience.joinedISO)
const noop = () => () => {}

/**
 * "The road so far." One card: the employer, where, since when, and the
 * current title. Credentials sit under it in the same band.
 */
export function Experience() {
  // Pre-rendered with the build-time tenure; the client recomputes it on load.
  const tenure = useSyncExternalStore(noop, () => tenureSince(experience.joinedISO), () => BUILD_TENURE)

  return (
    <Section id="experience" className="scroll-mt-9 py-14 md:-scroll-mt-5 md:py-28">
      <Container>
        <SectionHeading id="experience" eyebrow="Where I have been" title="The road so far" />

        <Reveal>
          <article className="card relative grid grid-cols-1 gap-7 overflow-hidden p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10 md:p-12">
            <div aria-hidden="true" className="dotgrid pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-70 [mask-image:linear-gradient(to_left,#000,transparent)]" />
            <div className="relative">
              <p className="eyebrow flex items-center gap-2">
                <Icon name="briefcase" size={14} strokeWidth={1.8} />
                Currently at
              </p>
              <p className="mt-3 font-display text-[clamp(4rem,11vw,9rem)] leading-[0.85] font-black text-ink md:mt-4">
                {experience.company}
                <span className="text-orange">.</span>
              </p>
              <p className="mt-5 text-[15px] text-body">
                <span className="font-semibold text-ink">{experience.role}</span> · {experience.location}
              </p>
              <p className="mt-2 hidden max-w-[48ch] text-[14.5px] leading-[1.65] text-body md:block">{experience.note}</p>
            </div>

            <div className="relative flex flex-col items-start gap-3 md:items-end md:text-right">
              <Chip tone="solid" className="py-0.5 text-[10px]">
                Now
              </Chip>
              <p className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-none font-extrabold text-ink uppercase">
                {experience.joined} <span className="text-orange">to</span> present
              </p>
              <p className="font-mono text-[12.5px] text-muted">{tenure} and counting</p>
            </div>
          </article>
        </Reveal>

        <Credentials />
      </Container>
    </Section>
  )
}
