# សរសេរខ្មែរ — Khmer Handwriting

Production-ready responsive web app for learning Khmer handwriting, built from the Figma designs in the parent `khmer-carved` folder.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide icons
- HTML Canvas (Pointer Events)
- SVG stroke animation
- LocalStorage progress persistence

## Getting started

```bash
cd khmer-handwriting
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/learn` | Character learning by category |
| `/characters` | Character library with search |
| `/characters/[id]` | Character detail |
| `/characters/[id]/strokes` | Stroke animation |
| `/practice/[id]` | Guided drawing practice |
| `/practice/[id]/result` | Practice result |
| `/recognition` | Free drawing & mock recognition |
| `/progress` | Progress dashboard |

## Characters

Initial set: **ក, ខ, គ, ឃ, ង** with Khmer names, IPA, stroke SVG paths, example words, and learning status.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build (local, no base path)
- `npm run build:pages` — static export for GitHub Pages (`out/index.html`)
- `npm run lint` — ESLint
- `npm start` — run production server

## Static export & GitHub Pages

This app is configured for [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports). The build writes HTML to the `out/` folder (e.g. `out/index.html`).

For GitHub Pages project sites, use the pages build script:

```bash
npm run build:pages
```

Live site: [https://kakronayan.github.io/khmer-handwriting/](https://kakronayan.github.io/khmer-handwriting/)

Pushes to `main` trigger the [Deploy to GitHub Pages](.github/workflows/deploy.yml) workflow, which publishes `out/` to the `gh-pages` branch.
