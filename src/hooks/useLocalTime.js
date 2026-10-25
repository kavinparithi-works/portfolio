import { useEffect, useState } from 'react'

export function formatLocalTime(date, timeZone) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(date)
}

/**
 * Wall-clock time in the given IANA time zone, refreshed every half minute.
 * Returns null until mounted so pre-rendered HTML and the client agree.
 */
export function useLocalTime(timeZone) {
  const [time, setTime] = useState(null)

  useEffect(() => {
    const tick = () => setTime(formatLocalTime(new Date(), timeZone))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [timeZone])

  return time
}
