import { site } from '../../../data/site'
import { useLocalTime } from '../../../hooks/useLocalTime'
import { Icon } from '../../icons/Icon'

function Row({ icon, label, children, last = false, className = '' }) {
  return (
    <div className={`relative grid grid-cols-[16px_1fr] gap-x-4 py-4 ${last ? '' : 'border-b border-rule'} ${className}`}>
      <dt className="contents">
        <span className="mt-0.5 text-orange-deep">
          <Icon name={icon} size={16} strokeWidth={1.8} />
        </span>
        <span className="eyebrow text-[0.66rem]">{label}</span>
      </dt>
      <dd className="col-start-2 mt-1 text-[14.5px] leading-snug text-ink">{children}</dd>
    </div>
  )
}

/**
 * A small spec-sheet card: where, what, open to, and the live local time so
 * a visitor abroad knows when to expect a reply.
 */
export function HeroMeta() {
  const time = useLocalTime(site.timeZone)
  return (
    <dl
      className="card fade-up relative w-full max-w-[380px] overflow-hidden px-6 py-2 md:col-start-2 md:grid md:max-w-none md:grid-cols-2 md:gap-x-10 lg:col-start-auto lg:block lg:max-w-[380px]"
      style={{ '--d': '640ms' }}
    >
      <div aria-hidden="true" className="dotgrid pointer-events-none absolute top-0 right-0 h-40 w-40 opacity-80 [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]" />
      <Row icon="pin" label="Based in">
        {site.location}
      </Row>
      <Row icon="briefcase" label="Currently">
        {site.role} at {site.employer}
      </Row>
      <Row icon="spark" label="Open to" className="max-md:border-b-0">
        <span className="flex items-start gap-2">
          <span className="relative mt-[7px] flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-75 motion-ok:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
          </span>
          {site.availability}
        </span>
      </Row>
      <Row icon="clock" label="Local time" last className="max-md:hidden">
        <span className="font-mono text-[15px] tabular-nums">{time ?? '--:--'}</span> <span className="text-muted">IST · Chennai</span>
      </Row>
    </dl>
  )
}
