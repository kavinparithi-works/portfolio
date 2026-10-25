import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../icons/Icon'

/**
 * Copies `text` to the clipboard and confirms inline for a moment.
 */
export function CopyButton({ text, label = 'Copy email', className }) {
  const [state, setState] = useState('idle')

  useEffect(() => {
    if (state === 'idle') return undefined
    const id = setTimeout(() => setState('idle'), 2200)
    return () => clearTimeout(id)
  }, [state])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
  }

  const message = state === 'copied' ? 'Copied' : state === 'failed' ? 'Could not copy' : label

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label}: ${text}`}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/25 px-4 py-2 font-mono text-[12px] tracking-[0.04em] text-white/80 transition-colors duration-200 hover:border-white hover:text-white',
        state === 'copied' && 'border-teal text-teal hover:border-teal hover:text-teal',
        className
      )}
    >
      <Icon name={state === 'copied' ? 'check' : 'copy'} size={14} />
      <span aria-live="polite">{message}</span>
    </button>
  )
}
