# Whistle Frontend Assessment

Recreation of 3 sections from the Whistle (House of Clove) landing page Figma design, built as a React + TanStack Start take-home assessment for Unbundl.

## Sections Built

1. **Why Whistle?** - Feature cards in a horizontally scrollable carousel (button-navigable on mouse/desktop, native swipe on touch).
2. **What sets Whistle apart?** - Comparison table (Whistle vs. Other Brands) with expandable detail rows per feature.
3. **Got Questions?** - FAQ accordion with single-open expand/collapse.

## Tech Stack

- React 19 + TypeScript
- TanStack Start (file-based routing + server routes)
- CSS Modules (hand-written, no UI libraries)
- lucide-react (icons only)

## API

Data is served from custom backend routes built with TanStack Start's server route handlers (`src/routes/api/v1/*.ts`), returning mock JSON - rather than one of the three suggested public APIs. The Figma content (feature cards, a brand comparison table, FAQ copy) is specific to Whistle's actual marketing site and doesn't map cleanly onto Fake Store, DummyJSON, or JSONPlaceholder's generic data shapes, so real-feeling mock data scoped to this content was a better fit. Each route mirrors the project's existing `/api/v1/health` handler pattern.

- `GET /api/v1/why-whistle`
- `GET /api/v1/comparison`
- `GET /api/v1/faqs`

The frontend fetches these client-side via `useEffect`/`useState` (not server-loaded), specifically so a loading state is visibly demonstrated rather than data arriving pre-rendered.

## Setup

```bash
git clone <repo-url>
cd <repo-folder>
pnpm install
pnpm dev
```

App runs at `http://localhost:5000`.

## Approach

Each section fetches its own data through a small custom hook (`useFaqs`, `useWhyWhistle`, `useComparison`) built on a shared low-level `fetch` wrapper in `lib/api.ts` that normalizes error handling. Loading states use skeleton placeholders shaped like the real content (rather than a generic spinner) to avoid layout shift, and the FAQ/comparison interactions use a CSS `grid-template-rows` trick for smooth expand/collapse animation without JavaScript height measurement.

## Notes

- Responsive down to mobile (carousel buttons hide on touch devices via `pointer: fine` media query; comparison table compresses rather than restructuring, matching the Figma's mobile behavior).
- Built with accessibility in mind: `aria-expanded`, `aria-controls`, and `role="region"` on all expandable elements.
