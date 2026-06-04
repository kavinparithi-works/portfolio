import React from 'react'
import { site } from '../../data/site'

/**
 * Fixed top navigation. The `on` class (toggled by useNavScrolled) reveals the
 * bottom border once the page scrolls.
 */
export function Navbar() {
  return (
    <nav
      id="N"
      className="fixed inset-x-0 top-0 z-[100] border-b border-transparent bg-bg/[.92] backdrop-blur-[16px] transition-colors duration-300 [&.on]:border-rule"
    >
      <div className="mx-auto flex h-[60px] max-w-site items-center justify-between px-[64px] max-[680px]:px-[22px]">
        <div className="flex items-center gap-[10px] font-barlow text-[18px] font-extrabold uppercase tracking-[.5px] text-ink">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-ink text-[13px] font-black text-white">
            {site.initial}
          </div>
          {site.name}
        </div>
        <div className="flex items-center gap-[8px]">
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="inline-flex items-center gap-[8px] rounded-full bg-dark px-[20px] py-[9px] text-[14px] font-bold text-white transition-[background,transform] duration-200 hover:translate-y-[-1px] hover:bg-[#333]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
            Email
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center gap-[8px] rounded-full bg-dark px-[20px] py-[9px] text-[14px] font-bold text-white transition-[background,transform] duration-200 hover:translate-y-[-1px] hover:bg-[#333]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  )
}
