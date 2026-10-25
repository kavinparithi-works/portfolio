import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { RollingWord } from './RollingWord'
import { CopyButton } from './CopyButton'
import { formatLocalTime } from '../../hooks/useLocalTime'

describe('<RollingWord />', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('shows one word at a time and replaces it every 1.5 seconds', () => {
    const { container } = render(<RollingWord words={['data.', 'problems.']} />)
    const roll = container.querySelector('.roll')
    expect(roll).toHaveAttribute('aria-hidden', 'true')
    expect(roll).toHaveTextContent('data.')
    expect(screen.queryByText('problems.')).not.toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1499))
    expect(roll).toHaveTextContent('data.')
    act(() => vi.advanceTimersByTime(1))
    expect(roll).toHaveTextContent('problems.')
    expect(screen.queryByText('data.')).not.toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1500))
    expect(roll).toHaveTextContent('data.')
  })

  it('stays on the first word when the visitor prefers reduced motion', () => {
    window.matchMedia.mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion'),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    const { container } = render(<RollingWord words={['data.', 'problems.']} interval={500} />)
    const roll = container.querySelector('.roll')
    act(() => vi.advanceTimersByTime(2000))
    expect(roll).toHaveAttribute('data-index', '0')
    window.matchMedia.mockImplementation((query) => ({ matches: false, media: query, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
  })
})

describe('<CopyButton />', () => {
  const stubClipboard = (writeText) => Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })

  it('copies the text and confirms', async () => {
    const writeText = vi.fn().mockResolvedValue()
    stubClipboard(writeText)
    render(<CopyButton text="hello@example.com" />)
    fireEvent.click(screen.getByRole('button'))
    expect(writeText).toHaveBeenCalledWith('hello@example.com')
    expect(await screen.findByText('Copied')).toBeInTheDocument()
  })

  it('reports when the clipboard is unavailable', async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error('denied')))
    render(<CopyButton text="x" />)
    fireEvent.click(screen.getByRole('button'))
    expect(await screen.findByText('Could not copy')).toBeInTheDocument()
  })
})

describe('formatLocalTime', () => {
  it('formats in the requested zone as 24h HH:MM', () => {
    const t = formatLocalTime(new Date('2026-10-25T12:00:00Z'), 'Asia/Kolkata')
    expect(t).toBe('17:30')
  })
})
