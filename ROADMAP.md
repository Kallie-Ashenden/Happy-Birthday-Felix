# Happy Birthday Card — Roadmap

## Status Key
- 🟡 In progress
- 🔴 Not started
- ~~Strikethrough~~ = complete

---

## Current Milestone: Ship a working birthday page with 3D spinning text

What we're building toward right now. Tasks here are in sequence —
complete them in order, top to bottom.

- ~~Stage 1 — HTML skeleton: `index.html` + `404.html` with correct structure, linked CSS/JS files, and `?name` param placeholder~~
- ~~Stage 2 — 3D text styling: CSS-only 3D "Happy Birthday [NAME]" using `text-shadow` layering or `transform: perspective()` — centred, mobile-first, birthday colour palette~~
- 🟡 Stage 3 — Name injection: `main.js` reads `?name=` from URL and writes it into the DOM; falls back to `"Friend"` if absent
- 🔴 Stage 4 — Spin interaction: clicking the text triggers a full 3D CSS spin animation via a JS-toggled class
- 🔴 Stage 5 — Polish & cross-device check: verify layout on mobile viewport, smooth animation, fallback font, final tweaks

---

## Up Next

- Add a confetti burst on page load or on spin completion
- Support a `?age=` param to display "Happy 5th Birthday" (or any age)
- Shareable link helper — copy-to-clipboard button that pre-fills `?name=`

---

## Done

- ~~Stage 1 — HTML skeleton~~
- ~~Stage 2 — 3D text styling~~

---

## Backlog

- Consider Open Graph / social preview meta tags so shared links show a nice preview
- Explore CSS `@keyframes` with `transform: rotateY` vs JS-driven Web Animations API — prototype if behaviour feels janky on mobile
- Add a simple design system page (`/ds/index.html`) once colours, fonts, and animation tokens are settled
