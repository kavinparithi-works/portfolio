import { site } from '../../../data/site'
import { useLocalTime } from '../../../hooks/useLocalTime'
import { Icon } from '../../icons/Icon'

function Row({ icon, label, children }) {
  return (
    <div className="grid grid-cols-[15px_1fr] gap-x-4 border-b border-rule py-3.5 lg:last:border-b-0">
      <dt className="contents">
        <span className="mt-0.5 text-muted">
          <Icon name={icon} size={15} strokeWidth={1.8} />
        </span>
        <span className="eyebrow text-[0.66rem]">{label}</span>
      </dt>
      <dd className="col-start-2 mt-0.5 text-[14px] leading-snug text-ink">{children}</dd>
    </div>
  )
}

/**
 * A small spec sheet: where, what, open to, and the live local time so a
 * visitor abroad knows when to expect a reply.
 */
export function HeroMeta() {
  const time = useLocalTime(site.timeZone)
  return (
    <dl
      className="fade-up w-full max-w-[380px] md:col-start-2 md:grid md:max-w-none md:grid-cols-2 md:gap-x-10 lg:col-start-auto lg:block lg:max-w-[380px]"
      style={{ '--d': '640ms' }}
    >
      <Row icon="pin" label="Based in">
        {site.location}
      </Row>
      <Row icon="briefcase" label="Currently">
        {site.role} at {site.employer}
      </Row>
      <Row icon="spark" label="Open to">
        {site.availability}
      </Row>
      <Row icon="clock" label="Local time">
        <span className="font-mono tabular-nums">{time ?? '--:--'}</span> <span className="text-muted">IST</span>
      </Row>
    </dl>
  )
}
