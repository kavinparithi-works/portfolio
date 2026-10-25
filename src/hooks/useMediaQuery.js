import { useSyncExternalStore } from 'react'

function subscribe(query) {
  return (callback) => {
    const mql = window.matchMedia(query)
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
  }
}

/**
 * Reactive media query. Server/snapshot default is `false`.
 */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false
  )
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const useFinePointer = () => useMediaQuery('(pointer: fine)')
