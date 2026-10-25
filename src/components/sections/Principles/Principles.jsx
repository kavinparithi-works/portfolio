import { useState } from 'react'
import { cn } from '../../../lib/cn'
import { principles } from '../../../data/principles'
import { Container, Section, SectionHeading, Reveal } from '../../layout'

/**
 * "Ways I Contribute." Three principle cards. The first is dark by default
 * and hands its emphasis to whichever sibling is hovered; the others invert
 * to dark on hover.
 */
export function Principles() {
  const [hovered, setHovered] = useState(null)

  return (
    <Section id="principles" className="scroll-mt-9 py-14 md:-scroll-mt-5 md:py-28">
      <Container>
        <SectionHeading
          id="principles"
          eyebrow="Across the data lifecycle"
          title="Ways I contribute"
          aside={<p className="max-w-[300px] text-[14px] leading-relaxed text-body">How I approach a platform, from the first architecture diagram to the overnight runs.</p>}
        />
        <ul role="list" className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {principles.map((p, i) => {
            const featured = Boolean(p.featured)
            const dark = featured ? hovered === null || hovered === i : hovered === i
            return (
              <Reveal
                as="li"
                key={p.num}
                delay={i * 90}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="h-full"
              >
                <article
                  className={cn(
                    'flex h-full flex-col rounded-card border p-6 transition-[background-color,border-color,transform,box-shadow] duration-300 ease-out md:p-9',
                    dark
                      ? 'border-dark bg-dark text-white shadow-[0_24px_40px_-28px_rgba(0,0,0,.5)] md:-translate-y-1'
                      : 'border-rule bg-card text-ink'
                  )}
                >
                  <p className={cn('font-display text-[40px] leading-none font-black md:text-[56px]', dark ? 'text-orange-light' : 'text-orange')}>{p.num}</p>
                  <h3 className="display mt-5 text-[clamp(1.35rem,2vw,1.85rem)] leading-[1.02] font-extrabold tracking-[-0.01em] whitespace-pre-line md:mt-8">
                    {p.title}
                  </h3>
                  <p className={cn('mt-3 flex-1 text-[13.5px] leading-[1.65] md:mt-4 md:text-[14.5px] md:leading-[1.7]', dark ? 'text-white/70' : 'text-body')}>{p.body}</p>
                  <span
                    className={cn(
                      'mt-6 inline-flex w-fit items-center rounded-full border px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 md:mt-8',
                      dark ? 'border-white/20 bg-white text-ink' : 'border-rule text-ink'
                    )}
                  >
                    {p.tag}
                  </span>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
