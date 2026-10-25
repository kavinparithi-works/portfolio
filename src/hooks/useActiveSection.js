import { useEffect, useState } from 'react'

/**
 * Tracks which page section currently occupies the reading line (a band
 * ~40% down the viewport). Returns the active section id or null.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    elements.forEach((el) => observer.observe(el))

    const clearAtTop = () => {
      if (window.scrollY < 80) setActive(null)
    }
    window.addEventListener('scroll', clearAtTop, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', clearAtTop)
    }
  }, [ids])

  return active
}
