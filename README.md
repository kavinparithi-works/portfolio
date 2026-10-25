# Kavin Parithi Sivasamy, Data Engineer

Personal portfolio, live at https://kavinparithi-works.github.io/portfolio/

React 19, Vite 7 and Tailwind CSS 4. The production HTML is pre-rendered at
build time and hydrated on the first idle moment, so the page paints before
any JavaScript runs.

## Commands

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm install`     | Install dependencies (Node 20.19+ or 22+)                            |
| `npm run dev`     | Dev server at http://localhost:5173/portfolio/                       |
| `npm run build`   | Production build into `dist/`, then pre-renders `dist/index.html`    |
| `npm run preview` | Serves `dist/` at http://localhost:4173/portfolio/                   |
| `npm run lint`    | ESLint                                                               |
| `npm test`        | Vitest unit and component tests                                      |
| `npm run check`   | Lint, test and build in one go                                       |
| `npm run shots`   | Full-page screenshots at five viewports plus overflow/console checks (needs Chrome, uses the dev server by default; `SHOT_URL=...` to point elsewhere) |
| `npm run og`      | Regenerates `public/og-image.png` and `public/apple-touch-icon.png`   |

## Editing content

Everything a visitor reads lives in `src/data/`:

- `site.js`: name, links, hero copy, availability, contact copy
- `projects.js`: the case studies (summary, problem / build / result, outcomes, stack, diagram stages, optional extras)
- `experience.js`: the employer card
- `skills.js`: skill groups and working style
- `credentials.js`, `beyond.js`, `principles.js`, `nav.js`

The architecture diagram in each case study is generated from the `pipeline`
array (stages and their nodes), so a new project only needs data, no drawing.

The resume lives at `public/resume.pdf`. Portrait sources are in `assets-src/`;
`python scripts/optimize-images.py` regenerates the WebP crops in
`public/assets/images/` (needs Pillow).

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`: lint, test, build, then
publish `dist/` to GitHub Pages. The site is built for the `/portfolio/` path.
To serve it from a custom domain, set `VITE_BASE_PATH=/` at build time and
update the canonical and Open Graph URLs in `index.html`, `public/robots.txt`,
`public/sitemap.xml` and `public/site.webmanifest`.

## Fonts

Barlow Condensed (OFL) is self-hosted: weight 900 is inlined into the stylesheet at build time, weight 800 is preloaded from `public/fonts/`. Noto Sans Tamil
(OFL) comes from `@fontsource/noto-sans-tamil`. Google Sans and Google Sans
Code load from Google Fonts without blocking first paint; a metric-matched
local fallback keeps the text from shifting when they arrive.
