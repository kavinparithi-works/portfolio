import { beyond } from '../../../data/beyond'
import { Container, Section, SectionHeading, Reveal } from '../../layout'
import { Icon } from '../../icons/Icon'

/**
 * "Beyond the data." Four slightly tilted tiles that straighten on hover,
 * each with its icon acting out the hobby (see styles/index.css).
 */
export function Beyond() {
  return (
    <Section id="beyond" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="beyond"
          eyebrow="When I am away from the keyboard"
          title="Beyond the data"
          aside={<p className="max-w-[300px] text-[14px] leading-relaxed text-body">The parts of the week that do not involve a cluster.</p>}
        />
        <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {beyond.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80}>
              <article
                style={{ '--tilt': `${item.tilt}deg` }}
                className="group card flex h-full flex-col items-start p-7 transition-[transform,background-color,border-color,box-shadow] duration-500 ease-out motion-ok:lg:rotate-[var(--tilt)] hover:border-dark hover:bg-dark hover:shadow-[0_26px_40px_-30px_rgba(0,0,0,.6)] motion-ok:lg:hover:rotate-0 motion-ok:lg:hover:-translate-y-1.5"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rule bg-bg text-ink transition-colors duration-300 group-hover:border-white/20 group-hover:bg-dark-2 group-hover:text-orange-light">
                  <Icon name={item.icon} size={28} />
                </span>
                <h3 className="display mt-6 text-[clamp(1.4rem,1.8vw,1.6rem)] leading-[1.05] font-extrabold text-ink transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-body transition-colors duration-300 group-hover:text-white/70">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
