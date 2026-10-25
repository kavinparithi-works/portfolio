import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { navLinks } from './nav'
import { skillGroups } from './skills'
import { experience } from './experience'
import { credentials } from './credentials'
import { site, heroCopy, contactCopy } from './site'

const DASHES = /[\u2013\u2014]/

function walkStrings(value, visit, path = '') {
  if (typeof value === 'string') visit(value, path)
  else if (Array.isArray(value)) value.forEach((v, i) => walkStrings(v, visit, `${path}[${i}]`))
  else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => walkStrings(v, visit, `${path}.${k}`))
}

describe('content data', () => {
  it('contains no em or en dashes anywhere in the copy', () => {
    const offenders = []
    walkStrings({ projects, skillGroups, experience, credentials, site, heroCopy, contactCopy }, (s, path) => {
      if (DASHES.test(s)) offenders.push(path)
    })
    expect(offenders).toEqual([])
  })

  it('has unique, complete case studies', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const p of projects) {
      expect(p.title).toBeTruthy()
      expect(p.short).toBeTruthy()
      expect(p.story.problem && p.story.approach && p.story.result).toBeTruthy()
      expect(p.outcomes.length).toBeGreaterThanOrEqual(3)
      expect(p.tags.length).toBeGreaterThan(0)
      expect(p.pipeline.length).toBeGreaterThanOrEqual(3)
      p.pipeline.forEach((stage) => expect(stage.nodes.length).toBeGreaterThan(0))
      if (p.related) expect(ids).toContain(p.related.id)
    }
  })

  it('numbers the case studies in order', () => {
    expect(projects.map((p) => p.index)).toEqual(projects.map((_, i) => String(i + 1).padStart(2, '0')))
  })

  it('has skills with no duplicates and every core skill present in its group', () => {
    for (const g of skillGroups) {
      expect(new Set(g.items).size).toBe(g.items.length)
      g.core.forEach((c) => expect(g.items).toContain(c))
    }
  })

  it('marks exactly one current role', () => {
    expect(experience.roles.filter((r) => r.current)).toHaveLength(1)
  })

  it('links to the Databricks credential', () => {
    expect(credentials[0].href).toMatch(/^https:\/\/credentials\.databricks\.com\//)
  })

  it('keeps the nav labels short and ids kebab-case', () => {
    for (const l of navLinks) {
      expect(l.id).toMatch(/^[a-z]+(-[a-z]+)*$/)
      expect(l.label.length).toBeLessThanOrEqual(12)
    }
  })
})
