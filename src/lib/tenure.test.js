import { describe, expect, it } from 'vitest'
import { tenureSince } from './tenure'

describe('tenureSince', () => {
  it('counts whole months and years', () => {
    expect(tenureSince('2024-09-01', new Date('2026-10-26'))).toBe('2 yrs 1 mo')
    expect(tenureSince('2024-09-01', new Date('2025-09-01'))).toBe('1 yr')
    expect(tenureSince('2024-09-15', new Date('2024-10-10'))).toBe('0 mos')
    expect(tenureSince('2024-09-01', new Date('2024-11-20'))).toBe('2 mos')
  })
})
