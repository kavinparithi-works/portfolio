/**
 * Inline line icons drawn with `currentColor`. Icons that carry a bespoke
 * hover animation (styles/index.css) get an `icon-<name>` class; others shake.
 */
const ANIMATED = new Set([
  'mic', 'shield', 'flask', 'pen', 'bank', 'community', 'ticket', 'trophy', 'cap',
  'instagram', 'linkedin', 'github', 'handClick',
])

const paths = {
  // Projects
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
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </>
  ),
  // Credentials
  trophy: (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
      <path className="sparkle" d="M12 7v3M10.5 8.5h3" />
    </>
  ),
  cap: (
    <>
      <path d="m22 9-10-4L2 9l10 4 10-4Z" />
      <path d="M6 11v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
    </>
  ),
  // Beyond the data
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
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
  linkedinSolid: (
    <path
      d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.4 9H7v12H3.4V9Zm6.4 0h3.5v1.6c.5-1 1.7-1.9 3.5-1.9 3.7 0 4.3 2.4 4.3 5.5V21h-3.6v-6c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H9.8V9Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  // UI
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v12h14V9M9 21v-7h6v7" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  download: (
    <>
      <path d="M10 3h4v9h5l-7 7-7-7h5V3Z" fill="currentColor" stroke="none" />
      <path d="M5 19v3h14v-3" />
    </>
  ),
  handClick: (
    <>
      <path d="M9 13V6a2 2 0 0 1 4 0v5l1-.4a2 2 0 0 1 1.8.1l3.2 1.9a2 2 0 0 1 1 2l-.6 4.4a3 3 0 0 1-3 2.6H13a3 3 0 0 1-2.4-1.2L6 15a1.5 1.5 0 0 1 2.2-2L9 14Z" />
      <path className="tap-rays" d="M4 7H2M5 3 3.5 1.5M16 3l1.5-1.5" />
    </>
  ),
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowDownRight: <path d="M7 7l10 10M17 8v9H8" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
  pin: (
    <>
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </>
  ),
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />,
}

export function Icon({ name, size = 24, strokeWidth = 1.7, className = '' }) {
  const animClass = ANIMATED.has(name) ? `icon-${name}` : 'icon-shake'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`${animClass} ${className}`.trim()}
    >
      {paths[name]}
    </svg>
  )
}
