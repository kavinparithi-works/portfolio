import { beyond } from '../../../data/beyond'
import { Container, Section, SectionHeading, Reveal } from '../../layout'
import { Icon } from '../../icons/Icon'
import { useTouchHighlight } from '../../../hooks/useTouchHighlight'

/**
 * "Beyond the data." Four cards, each with its icon acting out the hobby
 * (see styles/index.css); they lift and invert to dark on hover.
 */
export function Beyond() {
  const { containerRef, getCardProps } = useTouchHighlight()
  return (
    <Section id="beyond" className="scroll-mt-9 py-14 md:-scroll-mt-5 md:py-28">
      <Container>
        <SectionHeading
          id="beyond"
          eyebrow="When I am away from the keyboard"
          title="Beyond the data"
          aside={<p className="hidden max-w-[300px] text-[14px] leading-relaxed text-body md:block">The parts of the week that do not involve a cluster.</p>}
        />
        <ul ref={containerRef} role="list" className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {beyond.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80}>
              <article {...getCardProps(item.title)} className="group card flex h-full flex-col items-start p-4 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-dark hover:bg-dark hover:shadow-[0_26px_40px_-30px_rgba(0,0,0,.6)] data-[active]:border-dark data-[active]:bg-dark md:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-rule bg-bg text-ink md:h-14 md:w-14 md:rounded-2xl transition-colors duration-300 group-hover:border-white/20 group-hover:bg-dark-2 group-hover:text-orange-light group-data-[active]:border-white/20 group-data-[active]:bg-dark-2 group-data-[active]:text-orange-light">
                  <Icon name={item.icon} size={24} />
                </span>
                <h3 className="display mt-4 text-[1.05rem] leading-[1.05] font-extrabold text-ink transition-colors duration-300 group-hover:text-white group-data-[active]:text-white md:mt-6 md:text-[clamp(1.4rem,1.8vw,1.6rem)]">
                  {item.title}
                </h3>
                <p className="mt-3 hidden text-[14px] leading-[1.7] text-body transition-colors duration-300 group-hover:text-white/70 group-data-[active]:text-white/70 md:block">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
