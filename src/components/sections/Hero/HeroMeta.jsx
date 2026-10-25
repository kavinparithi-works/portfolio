import { site } from '../../../data/site'
import { useLocalTime } from '../../../hooks/useLocalTime'
import { Icon } from '../../icons/Icon'

function Row({ icon, label, children, className = '' }) {
  return (
    <div className={`relative min-w-0 md:py-4 ${className}`}>
      <dt className="flex items-center gap-2">
        <span className="text-orange-deep"><Icon name={icon} size={13} strokeWidth={1.8} /></span>
        <span className="eyebrow text-[9.5px]">{label}</span>
      </dt>
      <dd className="mt-2 text-[13px] leading-[1.5] text-ink">{children}</dd>
    </div>
  )
}

/**
 * Personal details inside the profile card. Phones get a compact two-column
 * layout; the local clock stays on wider screens.
 */
export function HeroMeta() {
  const time = useLocalTime(site.timeZone)
  return (
    <dl
      className="relative grid grid-cols-2 gap-x-5 gap-y-5 border-t border-rule bg-bg/55 p-6 md:block md:border-t-0 md:border-l md:px-6 md:py-3"
    >
      <Row icon="pin" label="Based in" className="md:border-b md:border-rule">
        <span className="md:hidden">{site.locationShort}</span>
        <span className="hidden md:inline">{site.location}</span>
      </Row>
      <Row icon="briefcase" label="Currently" className="md:border-b md:border-rule">
        {site.role} at {site.employer}
      </Row>
      <Row icon="spark" label="Open to" className="col-span-2 border-t border-rule pt-4 md:border-t-0 md:border-b">
        <span className="flex items-start gap-2">
          <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal ring-[3px] ring-teal/15" />
          {site.availability}
        </span>
      </Row>
      <Row icon="clock" label="Local time" className="max-md:hidden">
        <span className="font-mono text-[14px] tabular-nums">{time ?? '--:--'}</span> <span className="text-muted">IST · Chennai</span>
      </Row>
    </dl>
  )
}
