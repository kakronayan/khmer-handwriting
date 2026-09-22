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
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm start` — run production server
