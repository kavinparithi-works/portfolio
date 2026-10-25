import './styles/index.css'

/**
 * The page is pre-rendered, so React is only needed for interactivity. Loading
 * it on the first idle moment keeps script evaluation off the critical path
 * to first paint; the hero's entrance animations are pure CSS and start as
 * soon as the stylesheet arrives.
 */
const start = () => import('./bootstrap.jsx')

if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1200 })
else setTimeout(start, 1)
