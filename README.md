# HARTPH — Coming Soon

A single-page, scrollable "work in progress" site for **HARTPH**, built as a
set of drawing sheets: the page is unfinished by concept, finished by execution.

| Sheet | Section | What happens |
| --- | --- | --- |
| 01 | Hero | Sheet rules draw in → labels → the HARTPH wordmark is drafted as outlines, then inked → the isometric structure assembles piece by piece → message + status. |
| 02 | What we're building | Statement whose last words fill like ink in a stencil; three modules (Identity / Digital / Experience) with technical drawings that draw on scroll. |
| 03 | Assembly | Sticky, scroll-driven: the wordmark is outlined, measured (real glyph widths), then filled. |
| 04 | Contact / footer | "Need to talk?", architectural title block, back-to-top, cropped wordmark. |

## Run

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # dist/        → upload to any static host
npm run build:single   # dist-single/ → index.html with everything inlined
```

`dist-single/index.html` opens directly from disk (double-click, `file://`) with
no server — the JS, CSS and fonts are inlined. Keep the `assets/` folder and
`og-image.png` next to it for the favicon and social preview.

## Stack

- React 19 + Vite 7 — no UI framework, no animation library.
- Animation is CSS transitions + SVG stroke drawing; JS only drives the
  pointer parallax, cursor, status scramble and the scroll-linked assembly.
- Fonts are self-hosted via Fontsource (Latin subset only):
  **Space Grotesk** 500/700 (display) and **IBM Plex Mono** 400/500 (technical).
- No CDN dependencies at runtime.

## Structure

```
hartph-coming-soon/
├── index.html                 meta, OG, favicon
├── public/
│   ├── og-image.png           1200×630 social preview (screenshot of the hero)
│   └── assets/
│       ├── brand/             hartph-logo.svg, hartph-mark.svg, favicon.svg
│       └── icons/             arrow.svg, plus.svg, crosshair.svg
├── scripts/build-wordmark.mjs glyph outlines → src/brand/wordmark.js + brand SVGs
└── src/
    ├── brand/wordmark.js      GENERATED letter paths + metrics
    ├── components/
    │   ├── Hero.jsx           sheet 01 layout
    │   ├── Wordmark.jsx       HART / PH drawing with construction guides
    │   ├── Blueprint.jsx      isometric structure, projected from 3D boxes
    │   ├── Building.jsx       sheet 02
    │   ├── Assembly.jsx       sheet 03 (scroll-driven)
    │   ├── Closing.jsx        sheet 04 + footer
    │   ├── SheetRules.jsx     ruled lines placed on named grid lines
    │   ├── Cursor.jsx         crosshair + live coordinates (mouse only)
    │   ├── Marker.jsx         "+ DETAILS" annotation buttons
    │   ├── BuildMeter.jsx, PhaseLine.jsx, ScrambleCycle.jsx, Icons.jsx
    │   └── Defs.jsx           shared SVG filters (ink + wash textures)
    ├── hooks/                 pointer engine, in-view, scroll progress, reduced motion
    └── styles/                reset.css, variables.css (tokens), main.css
```

### The wordmark

The giant HARTPH is not live text: `npm run wordmark` converts Space Grotesk
700 glyphs into SVG paths (via `opentype.js`), so the construction lines sit
on the real cap height and baseline, and the logo/favicon render identically
without the font installed. Swap the font file in the script to change it.

### The blueprint

`Blueprint.jsx` describes the structure as simple 3D boxes
(`[x, y, z, w, d, h]`) and projects them isometrically. To change the
drawing, edit the `PIECES` array — `kind` is the finish
(`solid`, `glass`, `accent`, `blue`, `dark`, `ghost`), `t` the assembly order.

## Content rules followed

- No progress percentage is shown — the meter only says *currently building*.
- No email, social links or business claims were invented. Contact reads
  "Contact information coming soon." When real details exist, update
  `Closing.jsx` and the hero footer row in `Hero.jsx`.
- Dimension numbers in the drawings are the model's own measurements.

## Accessibility

- Semantic landmarks, a real `<h1>`/`<h2>` outline, skip link.
- All interactive parts are buttons/links, keyboard reachable, with visible
  `:focus-visible` outlines; markers toggle with Enter/Space, close with Escape.
- The blueprint is focusable and reveals its hidden dimensions on focus.
- `prefers-reduced-motion`: entrance animation, parallax, status scramble and
  the sticky scroll scene are disabled; the page renders in its final state.
- The custom cursor only appears for a fine pointer (mouse); touch keeps native behaviour.
- Small accent text uses `--color-accent-text` (#B23A25) for AA contrast.

## Before launch

- `og:image` is relative (`./og-image.png`). Most social crawlers need an
  absolute URL — replace it with `https://<your-domain>/og-image.png`.
- Regenerate `og-image.png` after design changes (it is a 1200×630 hero capture).
