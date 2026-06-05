
/**
 * Inline line-icons that take their colour from `currentColor`, so they can be
 * styled black by default and recoloured (brand orange) on hover via a
 * parent's text colour. Each icon also carries an `icon-<name>` class that
 * drives a meaning-based hover animation defined in styles/index.css.
 *
 * mic    -> emits sound waves        shield -> deflects an arrow
 * flask  -> wobbles like mixing      pen    -> scribbles
 * others -> a light shake
 */

/** Every icon has its own bespoke hover animation (icon-<name>). */
const CUSTOM = new Set([
  'mic',
  'shield',
  'flask',
  'pen',
  'bank',
  'community',
  'ticket',
  'trophy',
  'cap',
  'instagram',
  'linkedin',
])

const paths = {
  // Selected Works
  bank: (
    <>
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="m12 3 9 7H3l9-7Z" />
      <path d="M5 10v11M9 10v11M15 10v11M19 10v11" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      {/* arrow that flies in and is deflected on hover */}
      <path className="arrow" d="M23 12h-4M21 10l-2 2 2 2" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v6.5L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9.5V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  // Credentials
  trophy: (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
      {/* sparkle that twinkles on hover */}
      <path className="sparkle" d="M12 7v3M10.5 8.5h3" />
    </>
  ),
  cap: (
    <>
      <path d="m22 9-10-4L2 9l10 4 10-4Z" />
      <path d="M6 11v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
    </>
  ),
  // Beyond the Data
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
      {/* sound waves that pulse out on hover */}
      <path className="wave" d="M17 8a4 4 0 0 1 0 8" />
      <path className="wave wave-2" d="M19.5 6a8 8 0 0 1 0 12" />
    </>
  ),
  community: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-1a6 6 0 0 1 12 0v1" />
      <path d="M16 3.5a3 3 0 0 1 0 7M21 21v-1a6 6 0 0 0-4-5.6" />
    </>
  ),
  ticket: (
    <>
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z" />
      <path d="M9 6v12" strokeDasharray="2 2" />
    </>
  ),
  pen: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </>
  ),
  // Social
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
    </>
  ),
}

export function Icon({ name, size = 28, className = '' }) {
  const animClass = CUSTOM.has(name) ? `icon-${name}` : 'icon-shake'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${animClass} ${className}`}
    >
      {paths[name]}
    </svg>
  )
}
