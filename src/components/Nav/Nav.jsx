import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'
import { site } from '../../data/site'
import { navLinks } from '../../data/nav'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { Icon } from '../icons/Icon'
import { MobileMenu } from './MobileMenu'

const SECTION_IDS = navLinks.map((l) => l.id)

/**
 * Fixed top bar. The "K" monogram doubles as a reading-progress ring and a
 * back-to-top control; the active section link uses bold text. Phones keep
 * Resume, Email and GitHub within reach. Below `lg` sections use a menu.
 */
export function Nav() {
  const logoRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useScrollProgress(
    useCallback((p) => {
      logoRef.current?.style.setProperty('--p', String(Math.round(p * 100)))
      setScrolled(window.scrollY > 24)
    }, [])
  )

  const spinLogo = () => {
    const el = logoRef.current
    if (!el) return
    el.classList.remove('logo-spin')
    void el.offsetWidth
    el.classList.add('logo-spin')
  }

  useEffect(() => {
    const id = setTimeout(spinLogo, 300)
    return () => clearTimeout(id)
  }, [])

  const toTop = () => {
    spinLogo()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] border-b transition-[border-color,background-color] duration-300',
          scrolled ? 'border-rule bg-bg/85 backdrop-blur-xl' : 'border-transparent bg-bg/0',
          menuOpen && 'border-transparent bg-transparent backdrop-blur-none'
        )}
      >
        <nav aria-label="Primary" className="site flex h-16 items-center justify-between gap-2 md:gap-4">
          <div className={cn('flex min-w-0 items-center gap-2 transition-colors duration-300 md:gap-3', menuOpen ? 'text-white' : 'text-ink')}>
            <button
              ref={logoRef}
              type="button"
              onClick={toTop}
              style={{ '--p': 0 }}
              className={cn(
                'progress-ring relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-[14px] font-black transition-colors duration-300',
                menuOpen ? 'bg-white text-ink' : 'bg-ink text-white'
              )}
            >
              <span aria-hidden="true">{site.initial}</span>
              <span className="sr-only">Back to top</span>
            </button>
            <a
              href="#top"
              aria-label={`${site.name}, home`}
              data-cursor="ignore"
              className="hidden truncate font-display text-[17px] font-extrabold tracking-[0.03em] uppercase min-[360px]:block"
              onClick={(e) => {
                e.preventDefault()
                toTop()
              }}
            >
              <span className="hidden sm:inline">{site.name}</span>
              <span className="hidden min-[421px]:inline sm:hidden">{site.shortName}</span>
              <span className="hidden min-[360px]:inline min-[421px]:hidden">{site.firstName}</span>
            </a>
          </div>

          <ul className="hidden items-center lg:flex" role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={cn(
                    'block px-3 py-2 text-[13.5px] transition-colors duration-200',
                    active === link.id ? 'font-semibold text-ink' : 'text-body hover:text-ink'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Kavin-Parithi-Sivasamy-Resume.pdf"
              aria-label="Download resume"
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-orange text-[13px] font-semibold text-white shadow-[0_0_16px_rgba(200,72,42,.4)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-px hover:bg-ink md:h-auto md:w-auto md:px-4 md:py-2',
                menuOpen && 'invisible'
              )}
            >
              <span className="hidden md:inline">Resume</span>
              <Icon name="download" size={16} strokeWidth={2.2} />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-dark text-[13px] font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-px hover:bg-[#2b2b2b] md:h-auto md:w-auto md:px-4 md:py-2',
                menuOpen && 'invisible'
              )}
            >
              <Icon name="mail" size={16} strokeWidth={2} />
              <span className="hidden md:inline">Email</span>
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full bg-dark text-white transition-colors duration-200 hover:bg-[#2b2b2b] md:hidden',
                menuOpen && 'invisible'
              )}
            >
              <Icon name="github" size={18} />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className={cn(
                'relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 md:h-10 md:w-10 lg:hidden',
                menuOpen ? 'bg-white text-ink' : 'bg-ink text-white'
              )}
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span
                  className={cn(
                    'absolute left-0 block h-[2px] w-4 rounded bg-current transition-transform duration-300',
                    menuOpen ? 'top-[5px] rotate-45' : 'top-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-[2px] w-4 rounded bg-current transition-transform duration-300',
                    menuOpen ? 'top-[5px] -rotate-45' : 'top-[10px]'
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  )
}
