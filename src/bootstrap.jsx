import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is pre-rendered (scripts/prerender.mjs); dev starts empty.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
