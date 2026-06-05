
/**
 * The "I Design, Develop & Debug." tagline with playful hover surprises:
 *  - Design  -> a sparkle pops and the word lifts
 *  - Develop -> a quick "typing" jitter, like code being written
 *  - Debug   -> a little bug scurries across, then the word turns green ("fixed")
 * The whole line also nudges and the period winks.
 */
export function TaglineFlourish() {
  return (
    <p className="tagline group/tag mb-[10px] max-w-[580px] cursor-default select-none text-[14px] font-extrabold leading-[1.65] text-orange">
      I{' '}
      <span className="tw-design relative inline-block">
        Design
        <span className="tw-sparkle pointer-events-none absolute -right-2 -top-2 text-[10px]">
          ✦
        </span>
      </span>
      ,{' '}
      <span className="tw-develop inline-block">Develop</span> &amp;{' '}
      <span className="tw-debug relative inline-block">
        Debug
        {/* the bug that scurries across on hover */}
        <span className="tw-bug pointer-events-none absolute -bottom-1 left-0 text-[11px]">
          🐛
        </span>
      </span>
      <span className="tw-dot">.</span>
    </p>
  )
}
