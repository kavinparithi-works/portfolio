import { stats } from '../../../data/site'
import { useReveal } from '../../../hooks/useReveal'
import { useCountUp } from '../../../hooks/useCountUp'

function Stat({ value, suffix = '', label, sub, active }) {
  const n = useCountUp(value, active)
  return (
    <div className="py-6 md:py-7">
      <p className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none font-black text-ink tabular-nums">
        {n.toLocaleString('en-US')}
        {suffix && <span className="text-orange">{suffix}</span>}
      </p>
      <p className="mt-2 text-[14px] font-semibold text-ink">{label}</p>
      <p className="mt-0.5 text-[12.5px] text-muted">{sub}</p>
    </div>
  )
}

/**
 * Four numbers from the resume, counting up the first time they scroll in.
 */
export function StatsStrip() {
  const [ref, revealed] = useReveal()
  return (
    <div
      ref={ref}
      className="grid grid-cols-2 border-t border-rule md:grid-cols-4 md:divide-x md:divide-rule [&>div]:md:px-6 [&>div:first-child]:md:pl-0"
    >
      {stats.map((s) => (
        <Stat key={s.label} {...s} active={revealed} />
      ))}
    </div>
  )
}
