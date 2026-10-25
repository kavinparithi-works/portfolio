/**
 * Visual QA: full-page screenshots at desktop / tablet / phone widths plus a
 * few interaction checks (menu, case-study tabs, overflow, console errors).
 * Uses the locally installed Chrome through playwright-core (no download).
 *
 *   npm run shots                 # against http://localhost:5173/portfolio/
 *   SHOT_URL=http://localhost:4173/portfolio/ npm run shots
 *
 * Output: <tmpdir>/portfolio-shots/*.png (override with SHOT_OUT).
 */
import { mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { chromium, devices } from 'playwright-core'

const URL = process.env.SHOT_URL || 'http://localhost:5173/portfolio/'
const OUT = process.env.SHOT_OUT || join(tmpdir(), 'portfolio-shots')

const targets = [
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
  { name: 'laptop', viewport: { width: 1280, height: 800 } },
  { name: 'tablet', viewport: { width: 834, height: 1112 } },
  // deviceScaleFactor is forced to 1 below: full-page captures of a long
  // page at 3x exceed Chrome's texture limit and come back tiled.
  { name: 'phone', ...devices['iPhone 14'] },
  { name: 'phone-small', viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true },
]

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
let failures = 0

for (const t of targets) {
  const { name, ...ctxOptions } = t
  const context = await browser.newContext({ ...ctxOptions, deviceScaleFactor: 1, reducedMotion: 'no-preference' })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`))

  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready.then(() => true))
  await page.waitForTimeout(600)

  // Reveal everything by scrolling through the page once (instantly, since the
  // site uses smooth scrolling), then back to top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6
    const max = document.documentElement.scrollHeight
    for (let y = 0; y <= max; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo({ top: max, behavior: 'instant' })
    await new Promise((r) => setTimeout(r, 250))
    window.scrollTo({ top: 0, behavior: 'instant' })
    await new Promise((r) => setTimeout(r, 900))
  })

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    offenders: [...document.querySelectorAll('body *')]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1 && getComputedStyle(el).position !== 'fixed')
      .slice(0, 6)
      .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join('.')} right=${Math.round(el.getBoundingClientRect().right)}`),
  }))

  await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true })
  await page.screenshot({ path: `${OUT}/${name}-fold.png` })

  // Interaction: second case study tab.
  const tabs = page.getByRole('tab')
  if ((await tabs.count()) > 1) {
    await tabs.nth(1).click()
    await page.waitForTimeout(700)
    const panelTitle = await page.getByRole('tabpanel').locator('h3').first().textContent()
    await page.getByRole('tabpanel').screenshot({ path: `${OUT}/${name}-project-2.png` })
    console.log(`[${name}] second tab -> "${panelTitle?.trim()}"`)
  }

  // Interaction: mobile menu.
  const menuButton = page.getByRole('button', { name: 'Open menu' })
  if (await menuButton.isVisible()) {
    await menuButton.click()
    await page.waitForTimeout(600)
    await page.screenshot({ path: `${OUT}/${name}-menu.png` })
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
  }

  const hasOverflow = overflow.scrollWidth > overflow.innerWidth
  if (hasOverflow) failures++
  if (errors.length) failures++
  console.log(
    `[${name}] ${t.viewport?.width ?? ctxOptions.viewport.width}px  overflow=${hasOverflow ? `YES (${overflow.scrollWidth} > ${overflow.innerWidth})` : 'no'}  errors=${errors.length}`
  )
  overflow.offenders.forEach((o) => console.log(`   overflow offender: ${o}`))
  errors.forEach((e) => console.log(`   ${e}`))
  await context.close()
}

await browser.close()
console.log(failures ? `\n${failures} check(s) failed` : '\nAll viewport checks passed')
process.exit(failures ? 1 : 0)
