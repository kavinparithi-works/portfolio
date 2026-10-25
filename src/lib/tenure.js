/** Whole months between the joining date and `now`, as "2 yrs 1 mo". */
export function tenureSince(iso, now = new Date()) {
  const start = new Date(iso)
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
  if (now.getDate() < start.getDate()) months -= 1
  months = Math.max(0, months)
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = []
  if (years) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
  if (rest || !years) parts.push(`${rest} ${rest === 1 ? 'mo' : 'mos'}`)
  return parts.join(' ')
}
