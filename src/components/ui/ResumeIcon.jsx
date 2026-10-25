import { Icon } from '../icons/Icon'

/** A download arrow, alternating with a tap cue on phones. */
export function ResumeIcon({ size = 16, strokeWidth = 2.2 }) {
  return (
    <span
      aria-hidden="true"
      className="resume-cue pointer-events-none relative inline-block shrink-0 align-middle"
      style={{ width: size, height: size }}
    >
      <Icon name="handClick" size={size} strokeWidth={1.8} className="resume-hand absolute inset-0 md:hidden" />
      <Icon name="download" size={size} strokeWidth={strokeWidth} className="download-cue" />
    </span>
  )
}
