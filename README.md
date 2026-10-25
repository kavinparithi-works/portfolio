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
- `projects.js`: the case studies (full `summary` and compact `summaryShort`, problem / build / result, outcomes, stack, diagram stages, optional extras)
- `experience.js`: the employer card
- `skills.js`: skill groups and working style
- `credentials.js`, `beyond.js`, `principles.js`, `nav.js`

The architecture diagram in each case study is generated from the `pipeline`
array (stages and their nodes), so a new project only needs data, no drawing.
Projects start with a short summary, the first two outcomes and first three
tools on every screen. "Full case study" opens the remaining content; switching
projects returns to the compact view.

The resume lives at `public/resume.pdf`. Portrait sources are in `assets-src/`;
`python scripts/optimize-images.py` regenerates the WebP crops in
`public/assets/images/` (needs Pillow).

## Toolbox section

The skills "toolbox" drawers (`src/components/sections/Skills/Skills.jsx`,
data in `src/data/skills.js`) are built but switched off for now. Only the
black "How I work" card is shown, after "On record". Its shared component is
`src/components/sections/Skills/WorkingStyle.jsx`.

To show the full toolbox again:

1. In `src/App.jsx`, import `Skills` from `./components/sections`. Replace the
   standalone `<Container>` holding `<WorkingStyle />`, the commented
   `{/* <Skills /> */}` placeholder and the `<Divider />` immediately after it
   with `<Skills />`. Remove the now-unused `Container` and `WorkingStyle`
   imports. The full toolbox already includes the working-style card.
2. In `src/data/nav.js`, uncomment the `{ id: 'skills', label: 'Skills' }` entry
   so it appears in the navigation.

Then `npm run check` and push.

## The road so far

The employer card is commented out. Its component and data remain in
`src/components/sections/Experience/Experience.jsx` and `src/data/experience.js`.
The "On record" certification and education cards are independent and still
visible, followed by the black "How I work" card.

To restore the employer card, uncomment the `Experience` import and
`<Experience />` placeholder in `src/App.jsx`, then uncomment its navigation
entry in `src/data/nav.js`. Run `npm run check` and push.

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
