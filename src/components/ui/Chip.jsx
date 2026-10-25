import { cn } from '../../lib/cn'

/**
 * Small rounded label used for tech tags and skills.
 * `tone`: 'orange' (on white), 'ink', 'light' (on dark), 'solid' (filled).
 */
export function Chip({ tone = 'ink', as: Tag = 'span', className, children, ...rest }) {
  const tones = {
    orange: 'border-orange/40 text-orange-deep',
    ink: 'border-rule text-body hover:border-ink hover:text-ink',
    light: 'border-white/25 text-white/80',
    solid: 'border-ink bg-ink text-white',
  }
  return (
    <Tag
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11.5px] leading-[1.6] font-medium tracking-[0.01em] transition-colors duration-200',
        tones[tone],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
