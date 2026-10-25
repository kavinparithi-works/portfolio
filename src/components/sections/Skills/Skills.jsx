import { skillGroups, workingStyle } from '../../../data/skills'
import { Container, Section, SectionHeading, Reveal } from '../../layout'
import { Chip } from '../../ui/Chip'

/**
 * "The toolbox." Skills grouped as on the resume. Tools used on every
 * engagement are filled in; the rest are outlined.
 */
export function Skills() {
  return (
    <Section id="skills" className="bg-bg-deep py-20 md:py-28">
      <Container>
        <SectionHeading
          id="skills"
          eyebrow="What I work with"
          title="The toolbox"
          aside={
            <p className="flex items-center gap-2 font-mono text-[12.5px] text-muted">
              <span aria-hidden="true" className="inline-block h-3 w-3 rounded-full bg-ink" />
              filled = used on every engagement
            </p>
          }
        />

        <ul role="list" className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal as="li" key={group.label} delay={(gi % 3) * 80} className="border-t border-ink/15 pt-5">
              <h3 className="eyebrow flex items-baseline gap-3 text-ink">
                <span className="font-display text-[15px] font-black text-orange">{String(gi + 1).padStart(2, '0')}</span>
                {group.label}
              </h3>
              <ul role="list" className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip as="li" key={item} tone={group.core.includes(item) ? 'solid' : 'ink'} className="bg-card/60">
                    {item}
                  </Chip>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 grid gap-6 rounded-card border border-ink/15 p-7 md:mt-20 md:grid-cols-[220px_1fr] md:p-9">
          <h3 className="display text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.02] text-ink">
            How I<br />work<span className="text-orange">.</span>
          </h3>
          <ol role="list" className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {workingStyle.map((line, i) => (
              <li key={line} className="flex gap-4 text-[14.5px] leading-[1.65] text-body">
                <span className="font-display text-[18px] leading-[1.3] font-black text-orange">0{i + 1}</span>
                {line}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  )
}
