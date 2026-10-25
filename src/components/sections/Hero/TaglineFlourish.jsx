/**
 * "I Design, Develop & Debug." with small hover surprises (from v1):
 * Design lifts and sparkles, Develop jitters like typing, a bug runs across
 * Debug and the word turns green once it is fixed. The period blinks.
 */
export function TaglineFlourish({ className = '' }) {
  return (
    <p className={`tagline inline-block cursor-default text-[15px] font-bold text-orange-deep select-none ${className}`}>
      I{' '}
      <span className="tw-design relative">
        Design
        <span aria-hidden="true" className="tw-sparkle pointer-events-none absolute -top-2 -right-2 text-[10px]">
          ✦
        </span>
      </span>
      , <span className="tw-develop">Develop</span> &amp;{' '}
      <span className="tw-debug relative">
        Debug
        <span aria-hidden="true" className="tw-bug pointer-events-none absolute -bottom-1 left-0 text-[11px]">
          🐛
        </span>
      </span>
      <span className="tw-dot">.</span>
    </p>
  )
}
