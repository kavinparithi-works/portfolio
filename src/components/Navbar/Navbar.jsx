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
            href="#contact"
            className="inline-flex items-center gap-[6px] rounded-full bg-dark px-[22px] py-[9px] text-[14px] font-bold text-white transition-[background,transform] duration-200 hover:translate-y-[-1px] hover:bg-[#333]"
          >
            Contact ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
