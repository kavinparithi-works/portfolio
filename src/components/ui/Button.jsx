import { useRef } from 'react'
import { cn } from '../../lib/cn'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'

const variants = {
  dark: 'bg-dark text-white hover:bg-[#2b2b2b] hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,.45)]',
  orange:
    'bg-orange text-white font-bold shadow-[0_0_18px_rgba(200,72,42,.45)] hover:bg-dark hover:shadow-[0_0_28px_rgba(200,72,42,.65)]',
  ghost: 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white',
  light: 'bg-white text-ink hover:bg-bg',
  outlineLight: 'border-[1.5px] border-white/30 text-white hover:border-white hover:bg-white hover:text-ink',
}

const sizes = {
  md: 'px-[26px] py-[13px] text-[14px]',
  sm: 'px-[18px] py-[9px] text-[13px]',
}

/**
 * Pill button/link. On mouse devices it leans a few pixels toward the
 * pointer while hovered (a small magnetic pull), and springs back on leave.
 */
export function Button({ as, href, variant = 'dark', size = 'md', className, children, icon, ...rest }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const magnetic = fine && !reduced

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height
    el.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const Tag = as || (href ? 'a' : 'button')
  return (
    <Tag
      ref={ref}
      href={href}
      type={Tag === 'button' ? 'button' : undefined}
      onMouseMove={magnetic ? onMove : undefined}
      onMouseLeave={magnetic ? onLeave : undefined}
      className={cn(
        'group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-300 ease-out select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
      {icon && (
        <span aria-hidden="true" className="inline-flex transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
          {icon}
        </span>
      )}
    </Tag>
  )
}
