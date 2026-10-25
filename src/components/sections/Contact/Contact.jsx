import { contactCopy, site } from '../../../data/site'
import { Container, Section, Reveal } from '../../layout'
import { RollingWord } from '../../ui/RollingWord'
import { CopyButton } from '../../ui/CopyButton'
import { Icon } from '../../icons/Icon'
import { Footer } from './Footer'

const socials = [
  { name: 'LinkedIn', href: site.linkedin, icon: 'linkedin' },
  { name: 'GitHub', href: site.github, icon: 'github' },
  { name: 'Instagram', href: site.instagram, icon: 'instagram' },
]

function Info({ head, children, className = '' }) {
  return (
    <div className={className}>
      <p className="eyebrow text-white/50">{head}</p>
      <p className="mt-2.5 text-[14.5px] leading-[1.65] text-white/75">{children}</p>
    </div>
  )
}

/**
 * The dark closing band: the call to action, a copyable email, socials, the
 * contact details, and the footer.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      className="flex scroll-mt-7 flex-col border-t-2 border-teal/50 bg-dark pt-16 text-white md:min-h-[calc(100svh+2.25rem)] md:-scroll-mt-9 md:pt-32"
    >
      <Container className="pb-10 md:flex-1 md:pb-0">
        <Reveal as="p" className="eyebrow mb-6 flex items-center gap-3 text-white/55">
          <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-70" />
          Say hello
        </Reveal>
        <h2 id="contact-title" data-cursor="magnify" className="display text-contact text-white">
          Now. Bring me
          <br />
          the hard
          <span className="block">
            <RollingWord words={contactCopy.rotating} className="text-orange" />
            <span className="sr-only">{contactCopy.rotating[0]}</span>
          </span>
        </h2>

        <Reveal delay={160} className="mt-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-6 md:mt-20">
          <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-4">
            <span className="min-w-0 font-display text-[clamp(1.5rem,3.6vw,2.75rem)] leading-none font-extrabold break-all text-white select-all">
              {site.email.split(/(and|work)/).map((part, i) => (
                part === 'and' || part === 'work'
                  ? <span key={i} className="text-orange">{part}</span>
                  : part
              ))}
            </span>
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.firstName}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-[background-color,border-color,color] duration-300 hover:border-orange-light hover:bg-orange-light hover:text-ink"
            >
              <Icon name="arrowUpRight" size={18} strokeWidth={2.2} />
            </a>
            <CopyButton text={site.email} className="max-md:hidden" />
          </div>
          <ul role="list" className="flex gap-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-200 hover:border-orange-light hover:text-orange-light"
                >
                  <Icon name={s.icon} size={19} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200} className="mt-14 hidden gap-8 border-t border-white/10 py-12 md:grid md:grid-cols-2 lg:grid-cols-3">
          <Info head="Contact me for">{contactCopy.contactFor}</Info>
          <Info head="Response time" className="max-md:hidden">{contactCopy.responseTime}</Info>
          <Info head="Where" className="max-md:hidden">
            {site.location}
            <br />
            <a href={`mailto:${site.email}`} className="border-b border-white/25 text-white/90 transition-colors duration-200 hover:border-white/80">
              {site.email}
            </a>
          </Info>
        </Reveal>
      </Container>
      <Footer />
    </Section>
  )
}
