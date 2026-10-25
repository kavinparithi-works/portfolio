import { skillGroups } from '../../../data/skills'
import { Container, Section, SectionHeading, Reveal } from '../../layout'
import { Chip } from '../../ui/Chip'
import { WorkingStyle } from './WorkingStyle'

/**
 * "The toolbox." One drawer card per skill group, each with a small pull
 * handle; cards invert to dark on hover like the rest of the site. Tools used
 * on every engagement are filled in. A dark card at the end holds the four
 * working-style lines.
 */
export function Skills() {
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0)

  return (
    <Section id="skills" className="scroll-mt-3 bg-bg-deep py-20 md:-scroll-mt-5 md:py-28">
      <Container>
        <SectionHeading
          id="skills"
          eyebrow="What I work with"
          title="The toolbox"
          aside={
            <p className="flex items-center gap-3 font-mono text-[12.5px] text-muted">
              <span>
                <span className="text-ink">{skillGroups.length}</span> drawers · <span className="text-ink">{total}</span> tools
              </span>
              <span aria-hidden="true" className="inline-block h-3 w-px bg-rule" />
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-3 w-3 rounded-full bg-ink" />
                used on every engagement
              </span>
            </p>
          }
        />

        <ul role="list" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal as="li" key={group.label} delay={(gi % 3) * 70}>
              <article className="group card relative flex h-full flex-col px-6 pt-7 pb-6 transition-[background-color,border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-dark hover:bg-dark hover:shadow-[0_24px_40px_-28px_rgba(0,0,0,.5)]">
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-1/2 h-1 w-9 -translate-x-1/2 rounded-full bg-rule transition-colors duration-300 group-hover:bg-orange-light"
                />
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="eyebrow flex items-baseline gap-3 text-ink transition-colors duration-300 group-hover:text-white">
                    <span className="font-display text-[15px] font-black text-orange transition-colors duration-300 group-hover:text-orange-light">
                      {String(gi + 1).padStart(2, '0')}
                    </span>
                    {group.label}
                  </h3>
                  <span className="font-mono text-[11px] text-muted transition-colors duration-300 group-hover:text-white/50">{group.items.length}</span>
                </div>
                <ul role="list" className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const core = group.core.includes(item)
                    return (
                      <Chip
                        as="li"
                        key={item}
                        tone={core ? 'solid' : 'ink'}
                        className={
                          core
                            ? 'group-hover:border-white group-hover:bg-white group-hover:text-ink'
                            : 'group-hover:border-white/25 group-hover:text-white/80'
                        }
                      >
                        {item}
                      </Chip>
                    )
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>

        <WorkingStyle className="mt-6" />
      </Container>
    </Section>
  )
}
