/**
 * Pre-renders the app into dist/index.html after `vite build`.
 * The client then hydrates the existing markup (see src/main.jsx).
 */
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer } from 'vite'

const root = process.cwd()
const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
  const html = render()
  const file = resolve(root, 'dist/index.html')
  const template = await readFile(file, 'utf8')
  const marker = '<div id="root"></div>'
  if (!template.includes(marker)) throw new Error(`Could not find ${marker} in dist/index.html`)
  await writeFile(file, template.replace(marker, `<div id="root">${html}</div>`))
  console.log(`prerendered dist/index.html (${(html.length / 1024).toFixed(1)} kB of markup)`)
} finally {
  await vite.close()
}
