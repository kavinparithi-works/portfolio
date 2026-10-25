import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Used by scripts/prerender.mjs after `vite build` to bake the page into
 * dist/index.html, so first paint and crawlers do not wait for JavaScript.
 */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
