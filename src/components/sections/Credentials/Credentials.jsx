import { credentials } from '../../../data/credentials'
import { Container, Section, Reveal } from '../../layout'
import { Icon } from '../../icons/Icon'
import { useTouchHighlight } from '../../../hooks/useTouchHighlight'

/**
 * Independent certification and education cards. Each card inverts to dark
 * on hover and links out to its source.
 */
export function Credentials() {
  const { containerRef, getCardProps } = useTouchHighlight()
  return (
    <Section id="on-record" className="scroll-mt-9 py-14 md:-scroll-mt-5 md:py-28">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal as="p" className="eyebrow mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-70" />
              Certification and education
            </Reveal>
            <Reveal as="h2" id="on-record-title" delay={80} className="display text-display-sm text-ink">
              On record<span className="text-orange">.</span>
            </Reveal>
          </div>
        </div>
        <ul ref={containerRef} role="list" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {credentials.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 90}>
              <article {...getCardProps(c.name)} className="group card flex h-full flex-col p-6 transition-[background-color,border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-dark hover:bg-dark data-[active]:border-dark data-[active]:bg-dark md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="eyebrow transition-colors duration-300 group-hover:text-white/55 group-data-[active]:text-white/55">{c.label}</p>
                  <span className="text-ink transition-colors duration-300 group-hover:text-orange-light group-data-[active]:text-orange-light">
                    <Icon name={c.icon} size={30} />
                  </span>
                </div>
                <h3 className="display mt-6 text-[clamp(1.35rem,2vw,1.6rem)] leading-[1.08] font-extrabold text-ink transition-colors duration-300 group-hover:text-white group-data-[active]:text-white">
                  {c.name}
                </h3>
                <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/55 group-data-[active]:text-white/55">{c.sub}</p>
                <p className="mt-4 hidden flex-1 text-[14px] leading-[1.7] text-body transition-colors duration-300 group-hover:text-white/70 group-data-[active]:text-white/70 md:block">{c.body}</p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border-[1.5px] border-ink px-5 py-2 text-[12.5px] font-semibold text-ink md:mt-7 transition-colors duration-300 group-hover:border-white group-hover:text-white hover:bg-ink hover:text-white group-data-[active]:border-white group-data-[active]:bg-white group-data-[active]:text-ink"
                >
                  {c.cta}
                  <Icon name="arrowUpRight" size={14} strokeWidth={2.2} />
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
