import { useSyncExternalStore } from 'react'
import { contactCopy, site } from '../../../data/site'
import { navLinks } from '../../../data/nav'
import { Container, Reveal } from '../../layout'
import { RollingWord } from '../../ui/RollingWord'
import { Icon } from '../../icons/Icon'

/**
 * Footer inside the dark band: the growth line with its rolling word, the
 * Tamil sign-off, and the bottom bar.
 */
const BUILD_YEAR = 2026
const noop = () => () => {}

export function Footer() {
  // Pre-rendered with the build year; the client swaps in the current one if it has rolled over.
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => BUILD_YEAR)
  const tamilParts = contactCopy.tamil.split(' ')

  return (
    <footer className="border-t border-white/10">
      <Container>
        <Reveal className="py-8 text-center">
          <p className="text-[13px] leading-[1.6] tracking-[0.01em] text-white/55">
            I believe <span className="font-semibold text-orange-light">growth</span> is not about knowing{' '}
            <span className="text-white">everything</span>. It&rsquo;s about staying <span className="text-white">curious</span> enough to keep{' '}
            <span className="inline-block font-semibold text-orange-light">
              <RollingWord words={contactCopy.quoteRotating} interval={2000} />
              <span className="sr-only">{contactCopy.quoteRotating[0]}</span>
            </span>
            .
          </p>
          <p lang="ta" className="mt-4 font-tamil text-[13px] leading-[1.8] text-white/55">
            {tamilParts.map((word, i) => (
              <span key={`${word}-${i}`}>
                {contactCopy.tamilAccent.includes(word) ? <span className="text-orange-light">{word}</span> : word}
                {i < tamilParts.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </Reveal>

        <div className="flex flex-col gap-5 border-t border-white/10 py-7 text-[12.5px] text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.name}. Designed and built by me with React, Vite and Tailwind.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {navLinks.slice(0, -1).map((l) => (
              <a key={l.id} href={`#${l.id}`} className="transition-colors duration-200 hover:text-white">
                {l.label}
              </a>
            ))}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-white/70 transition-colors duration-200 hover:border-white hover:text-white"
            >
              Top <Icon name="arrowUp" size={12} strokeWidth={2.2} />
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
