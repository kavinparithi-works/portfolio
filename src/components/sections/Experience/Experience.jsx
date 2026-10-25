import { useCallback, useRef } from 'react'
import { cn } from '../../../lib/cn'
import { experience } from '../../../data/experience'
import { useScrollProgress } from '../../../hooks/useScrollProgress'
import { Container, Section, SectionHeading, Reveal } from '../../layout'
import { Chip } from '../../ui/Chip'
import { Credentials } from '../Credentials/Credentials'

/**
 * "The road so far." One employer, three roles, drawn as a timeline whose
 * rail fills as you scroll. Credentials sit under it in the same band.
 */
export function Experience() {
  const railRef = useRef(null)
  const fillRef = useRef(null)

  useScrollProgress(
    useCallback((p) => fillRef.current?.style.setProperty('--fill', p.toFixed(3)), []),
    { ref: railRef, end: 0.55 }
  )

  return (
    <Section id="experience" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="experience"
          eyebrow="Where I have been"
          title="The road so far"
          aside={
            <p className="font-mono text-[13px] text-muted">
              {experience.company} · {experience.location} · {experience.span}
            </p>
          }
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(240px,340px)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-black text-ink">
              {experience.company}
              <span className="text-orange">.</span>
            </p>
            <p className="eyebrow mt-3">{experience.location}</p>
            <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.7] text-body">{experience.intro}</p>
          </Reveal>

          <ol ref={railRef} role="list" className="relative">
            <div aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-rule">
              <div ref={fillRef} className="tl-fill h-full w-full bg-orange" style={{ '--fill': 0 }} />
            </div>
            {experience.roles.map((role, i) => (
              <Reveal as="li" key={role.title} delay={i * 80} className="relative pb-12 pl-10 last:pb-0 md:pl-14">
                <span
                  aria-hidden="true"
                  className={cn(
                    'tl-node absolute top-1 left-0 h-[15px] w-[15px] rounded-full border-2 bg-bg transition-colors duration-500',
                    role.current ? 'border-orange' : 'border-rule'
                  )}
                >
                  {role.current && <span className="absolute inset-0 rounded-full bg-orange/40 motion-ok:animate-ping" />}
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="eyebrow">{role.period}</p>
                  {role.current && <Chip tone="solid" className="py-0.5 text-[10px]">Now</Chip>}
                </div>
                <h3 className="display mt-2 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.02] font-extrabold text-ink">{role.title}</h3>
                <p className="mt-3 max-w-[62ch] text-[14.5px] leading-[1.7] text-body">{role.summary}</p>
                <ul role="list" className="mt-4 flex flex-wrap gap-2">
                  {role.highlights.map((h) => (
                    <Chip as="li" key={h} tone="ink">
                      {h}
                    </Chip>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        <Credentials />
      </Container>
    </Section>
  )
}
