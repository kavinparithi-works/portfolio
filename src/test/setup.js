import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom lacks the layout/observer APIs the site relies on.
class ObserverStub {
  constructor(callback) {
    this.callback = callback
    ObserverStub.instances.push(this)
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
ObserverStub.instances = []

globalThis.IntersectionObserver = ObserverStub
globalThis.ResizeObserver = ObserverStub

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

window.scrollTo = vi.fn()
Element.prototype.scrollIntoView = vi.fn()
if (!document.fonts) {
  Object.defineProperty(document, 'fonts', { value: { ready: Promise.resolve() } })
}

afterEach(() => {
  cleanup()
  ObserverStub.instances.length = 0
})

export { ObserverStub }
