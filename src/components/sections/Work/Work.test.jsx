import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Work } from './Work'
import { projects } from '../../../data/projects'

describe('<Work />', () => {
  it('shows the first case study by default with proper tab semantics', () => {
    render(<Work />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(projects.length)
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', tabs[0].id)
    expect(screen.getByRole('heading', { level: 3, name: projects[0].title })).toBeInTheDocument()
  })

  it('switches case studies on click', async () => {
    const user = userEvent.setup()
    render(<Work />)
    await user.click(screen.getAllByRole('tab')[2])
    expect(screen.getByRole('heading', { level: 3, name: projects[2].title })).toBeInTheDocument()
    expect(screen.getAllByRole('tab')[2]).toHaveAttribute('aria-selected', 'true')
  })

  it('moves between case studies with the keyboard', async () => {
    const user = userEvent.setup()
    render(<Work />)
    const tabs = screen.getAllByRole('tab')
    tabs[0].focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('heading', { level: 3, name: projects[1].title })).toBeInTheDocument()
    expect(document.activeElement).toBe(screen.getAllByRole('tab')[1])
    await user.keyboard('{End}')
    expect(screen.getByRole('heading', { level: 3, name: projects.at(-1).title })).toBeInTheDocument()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('heading', { level: 3, name: projects[0].title })).toBeInTheDocument()
  })

  it('follows the related-study link', async () => {
    const user = userEvent.setup()
    render(<Work />)
    const related = projects[0].related
    await user.click(screen.getByRole('button', { name: related.label }))
    const target = projects.find((p) => p.id === related.id)
    expect(screen.getByRole('heading', { level: 3, name: target.title })).toBeInTheDocument()
  })
})
