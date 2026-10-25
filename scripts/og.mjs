/**
 * Renders the social preview image (public/og-image.png, 1200x630) and the
 * Apple touch icon (public/apple-touch-icon.png, 180x180) from small HTML
 * templates, using the locally installed Chrome through playwright-core.
 *
 *   npm run og
 */
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'

const root = process.cwd()
const file = (p) => pathToFileURL(resolve(root, p)).href

const palette = { bg: '#EDEAE4', ink: '#111111', orange: '#C8482A', muted: '#67645E', rule: '#D8D4CC' }

const fontFace = `
  @font-face { font-family: 'Barlow Condensed'; font-weight: 900; src: url('${file('public/fonts/barlow-condensed-900.woff2')}') format('woff2'); }
  @font-face { font-family: 'Barlow Condensed'; font-weight: 800; src: url('${file('public/fonts/barlow-condensed-800.woff2')}') format('woff2'); }
`

const ogHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fontFace}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: ${palette.bg}; font-family: Arial, sans-serif; color: ${palette.ink}; overflow: hidden; position: relative; }
  .grid { position: absolute; inset: 0; background-image: radial-gradient(${palette.rule} 1.4px, transparent 1.6px); background-size: 28px 28px;
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 85% 10%, #000 10%, transparent 70%); opacity: .9; }
  .wrap { position: absolute; inset: 0; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between; }
  .eyebrow { font-size: 17px; letter-spacing: .18em; text-transform: uppercase; color: ${palette.muted}; display: flex; align-items: center; gap: 14px; }
  .eyebrow::before { content: ''; width: 34px; height: 2px; background: ${palette.muted}; }
  h1 { font-family: 'Barlow Condensed'; font-weight: 900; text-transform: uppercase; font-size: 100px; line-height: .9; letter-spacing: .005em; max-width: 780px; margin-top: -6px; }
  h1 .o { color: ${palette.orange}; }
  .bottom { display: flex; align-items: flex-end; justify-content: space-between; }
  .name { font-family: 'Barlow Condensed'; font-weight: 800; text-transform: uppercase; font-size: 30px; letter-spacing: .03em; }
  .role { margin-top: 8px; font-size: 19px; color: ${palette.muted}; }
  .pill { position: absolute; right: 88px; top: 104px; width: 288px; height: 360px; border-radius: 999px; overflow: hidden; border: 2px solid ${palette.ink}; background: #E5E1D9; }
  .pill img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badge { position: absolute; right: 54px; top: 380px; width: 112px; height: 112px; border-radius: 50%; background: ${palette.bg}; box-shadow: 0 10px 26px -12px rgba(0,0,0,.4); border: 1px solid ${palette.rule}; display: grid; place-items: center; }
  .badge .dot { width: 44px; height: 44px; border-radius: 50%; background: ${palette.orange}; display: grid; place-items: center; }
  .badge svg.ring { position: absolute; inset: 0; width: 100%; height: 100%; }
  .badge svg.ring text { font-family: Arial, sans-serif; font-size: 8.2px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; fill: ${palette.orange}; }
  .url { font-size: 18px; color: ${palette.muted}; letter-spacing: .02em; }
</style></head><body>
  <div class="grid"></div>
  <div class="wrap">
    <div class="eyebrow">Data Engineer · Databricks Certified Professional · Chennai</div>
    <h1>I build <span class="o">pipelines.</span><br>I&rsquo;m more interested<br>in the <span class="o">data.</span></h1>
    <div class="bottom">
      <div><div class="name">Kavin Parithi Sivasamy</div><div class="role">Azure Databricks · Delta Lake · Lakehouse platforms</div></div>
      <div class="url">kavinparithi-works.github.io/portfolio</div>
    </div>
  </div>
  <div class="pill"><img src="${file('public/assets/images/kavin-640.webp')}" alt=""></div>
  <div class="badge">
    <svg class="ring" viewBox="0 0 100 100"><defs><path id="c" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"/></defs>
      <text><textPath href="#c">Databricks · Data Engineer Professional ·</textPath></text></svg>
    <div class="dot"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg></div>
  </div>
</body></html>`

const iconHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fontFace}
  * { margin: 0; }
  body { width: 180px; height: 180px; background: ${palette.ink}; display: grid; place-items: center; position: relative; overflow: hidden; }
  .k { font-family: 'Barlow Condensed'; font-weight: 900; font-size: 128px; color: ${palette.bg}; line-height: 1; margin-top: -6px; }
  .dot { position: absolute; right: 22px; bottom: 22px; width: 30px; height: 30px; border-radius: 50%; background: ${palette.orange}; }
</style></head><body><div class="k">K</div><div class="dot"></div></body></html>`

// Templates are written to disk and opened as file:// so the local fonts and
// images they reference are allowed to load.
const tmp = await mkdtemp(join(tmpdir(), 'portfolio-og-'))
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--allow-file-access-from-files'] })
const shoot = async (html, { width, height }, out) => {
  const htmlPath = join(tmp, `${width}x${height}.html`)
  await writeFile(htmlPath, html)
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready.then(() => true))
  await page.waitForTimeout(200)
  await page.screenshot({ path: resolve(root, out), type: 'png' })
  await page.close()
  console.log(`wrote ${out} (${width}x${height})`)
}
try {
  await shoot(ogHtml, { width: 1200, height: 630 }, 'public/og-image.png')
  await shoot(iconHtml, { width: 180, height: 180 }, 'public/apple-touch-icon.png')
} finally {
  await browser.close()
  await rm(tmp, { recursive: true, force: true })
}
