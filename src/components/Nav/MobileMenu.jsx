import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'
import { site } from '../../data/site'
import { navLinks } from '../../data/nav'
import { Icon } from '../icons/Icon'

/**
 * Full-screen navigation for small screens. Locks page scroll while open,
 * closes on Escape or on any link, and hands focus back to the toggle.
 */
export function MobileMenu({ open, onClose, active }) {
  const firstLinkRef = useRef(null)
  const openerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    openerRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const focusTimer = setTimeout(() => firstLinkRef.current?.focus(), 80)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      clearTimeout(focusTimer)
      openerRef.current?.focus?.()
    }
  }, [open, onClose])

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      inert={!open}
      className={cn(
        'fixed inset-0 z-[90] flex flex-col bg-dark text-white transition-[opacity,visibility] duration-300 lg:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0'
      )}
    >
      <div className="site flex flex-1 flex-col justify-center gap-2 pt-16">
        <ul role="list" className="flex flex-col">
          {navLinks.map((link, i) => (
            <li key={link.id} className={cn(open && 'menu-item')} style={{ '--d': `${80 + i * 50}ms` }}>
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={`#${link.id}`}
                onClick={onClose}
                className={cn(
                  'group flex items-baseline gap-4 border-b border-white/10 py-3 font-display text-[clamp(2.25rem,9vw,3.5rem)] leading-none font-black uppercase transition-colors duration-200',
                  active === link.id ? 'text-orange' : 'text-white hover:text-orange'
                )}
              >
                <span className="font-mono text-[12px] font-medium tracking-[0.1em] text-white/40">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={cn('site flex flex-wrap items-center justify-between gap-4 pb-10', open && 'menu-item')}
        style={{ '--d': '420ms' }}
      >
        <div className="flex gap-3">
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download="Kavin-Parithi-Sivasamy-Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-[14px] font-semibold text-white"
          >
            Resume <Icon name="download" size={15} strokeWidth={2.2} />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/30 px-5 py-3 text-[14px] font-semibold text-white"
          >
            <Icon name="mail" size={15} strokeWidth={2} /> Email
          </a>
        </div>
        <div className="flex gap-2">
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80">
            <Icon name="linkedin" size={18} />
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80">
            <Icon name="github" size={18} />
          </a>
          <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80">
            <Icon name="instagram" size={18} />
          </a>
        </div>
      </div>
    </div>
  )
}
