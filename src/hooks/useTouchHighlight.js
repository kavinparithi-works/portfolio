import { useEffect, useRef, useState } from 'react'

/** Touch equivalent of card hover, without intercepting links or scrolling. */
export function useTouchHighlight() {
  const containerRef = useRef(null)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const dismiss = (event) => {
      if (!containerRef.current?.contains(event.target)) setActiveId(null)
    }
    document.addEventListener('pointerdown', dismiss, { passive: true })
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [])

  const getCardProps = (id) => ({
    'data-active': activeId === id ? '' : undefined,
    onPointerUp: (event) => {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') {
        setActiveId((current) => current === id ? null : id)
      }
    },
  })

  return { containerRef, getCardProps }
}
