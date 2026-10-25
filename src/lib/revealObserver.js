/**
 * One shared IntersectionObserver for every scroll-reveal element. Elements
 * register themselves on mount (so dynamically rendered content works too)
 * and are released after their first reveal.
 */
let observer = null
const callbacks = new Map()

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const cb = callbacks.get(entry.target)
        callbacks.delete(entry.target)
        observer.unobserve(entry.target)
        cb?.()
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
  )
  return observer
}

/** Observe `el`; `onReveal` fires once. Returns an unsubscribe function. */
export function observeReveal(el, onReveal) {
  const io = getObserver()
  if (!io) {
    onReveal()
    return () => {}
  }
  callbacks.set(el, onReveal)
  io.observe(el)
  return () => {
    callbacks.delete(el)
    io.unobserve(el)
  }
}
