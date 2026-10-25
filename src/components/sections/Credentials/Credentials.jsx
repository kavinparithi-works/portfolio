import { credentials } from '../../../data/credentials'
import { Reveal } from '../../layout'
import { Icon } from '../../icons/Icon'

/**
 * Certification and education, rendered as two cards inside the Experience
 * band. Each card inverts to dark on hover and links out to its source.
 */
export function Credentials() {
  return (
    <div className="mt-20 md:mt-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Reveal as="p" className="eyebrow mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-70" />
            Proof of the work
          </Reveal>
          <Reveal as="h3" delay={80} className="display text-display-sm text-ink">
            Credentials<span className="text-orange">.</span>
          </Reveal>
        </div>
      </div>
      <ul role="list" className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {credentials.map((c, i) => (
          <Reveal as="li" key={c.name} delay={i * 90}>
            <article className="group card flex h-full flex-col p-7 transition-[background-color,border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-dark hover:bg-dark md:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow transition-colors duration-300 group-hover:text-white/55">{c.label}</p>
                <span className="text-ink transition-colors duration-300 group-hover:text-orange-light">
                  <Icon name={c.icon} size={30} />
                </span>
              </div>
              <h4 className="display mt-6 text-[clamp(1.35rem,2vw,1.6rem)] leading-[1.08] font-extrabold text-ink transition-colors duration-300 group-hover:text-white">
                {c.name}
              </h4>
              <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/55">{c.sub}</p>
              <p className="mt-4 flex-1 text-[14px] leading-[1.7] text-body transition-colors duration-300 group-hover:text-white/70">{c.body}</p>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border-[1.5px] border-ink px-5 py-2 text-[12.5px] font-bold text-ink transition-colors duration-300 group-hover:border-white group-hover:text-white hover:bg-ink hover:text-white group-hover:hover:bg-white group-hover:hover:text-ink"
              >
                {c.cta}
                <Icon name="arrowUpRight" size={14} strokeWidth={2.2} />
              </a>
            </article>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
