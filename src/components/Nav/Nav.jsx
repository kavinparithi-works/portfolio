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
 * back-to-top control; section links underline as their section scrolls into
 * the reading line. Below `lg` the links collapse into a full-screen menu.
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
        <nav aria-label="Primary" className="site flex h-16 items-center justify-between gap-4">
          <div className={cn('flex min-w-0 items-center gap-3 transition-colors duration-300', menuOpen ? 'text-white' : 'text-ink')}>
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
              data-cursor="ignore"
              className="truncate font-display text-[17px] font-extrabold tracking-[0.03em] uppercase"
              onClick={(e) => {
                e.preventDefault()
                toTop()
              }}
            >
              <span className="hidden sm:inline">{site.name}</span>
              <span className="sm:hidden">{site.shortName}</span>
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

          <div className="flex items-center gap-2">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Kavin-Parithi-Sivasamy-Resume.pdf"
              className={cn(
                'hidden items-center gap-2 rounded-full bg-orange px-4 py-2 text-[13px] font-semibold text-white shadow-[0_0_16px_rgba(200,72,42,.4)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-px hover:bg-ink md:inline-flex',
                menuOpen && 'invisible'
              )}
            >
              Resume
              <Icon name="download" size={14} strokeWidth={2.2} />
            </a>
            <a
              href={`mailto:${site.email}`}
              className={cn(
                'hidden items-center gap-2 rounded-full bg-dark px-4 py-2 text-[13px] font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-px hover:bg-[#2b2b2b] md:inline-flex',
                menuOpen && 'invisible'
              )}
            >
              <Icon name="mail" size={14} strokeWidth={2} />
              Email
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className={cn(
                'relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 lg:hidden',
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
