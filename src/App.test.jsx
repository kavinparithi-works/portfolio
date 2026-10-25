import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { navLinks } from './data/nav'
import { site } from './data/site'

describe('<App />', () => {
  it('has one h1 and a landmark for every nav link', () => {
    render(<App />)
    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent(/I build pipelines/i)
    for (const link of navLinks) {
      const section = document.getElementById(link.id)
      expect(section, `section #${link.id}`).not.toBeNull()
      expect(section.tagName).toBe('SECTION')
      expect(document.getElementById(`${link.id}-title`), `heading for #${link.id}`).not.toBeNull()
    }
  })

  it('renders primary navigation links pointing at existing sections', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    for (const link of navLinks) {
      const a = within(nav).getByRole('link', { name: link.label })
      expect(a).toHaveAttribute('href', `#${link.id}`)
    }
  })

  it('offers the resume download and email in the header', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(nav).getByRole('link', { name: /resume/i })).toHaveAttribute('download')
    expect(within(nav).getByRole('link', { name: /email/i })).toHaveAttribute('href', `mailto:${site.email}`)
  })

  it('opens and closes the mobile menu with proper aria state', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Open menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    expect(document.body.style.overflow).toBe('hidden')
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).toBe('')
  })

  it('returns home and closes the mobile menu from the logo', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    window.scrollTo.mockClear()
    await user.click(screen.getByRole('button', { name: 'Back to top' }))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
    expect(document.body.style.overflow).toBe('')
  })

  it('has a skip link to the main content', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
    expect(document.getElementById('main')).not.toBeNull()
  })
})
