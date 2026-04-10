# Happy Birthday Card

A simple customisable 5th birthday wish — displays "Happy Birthday [NAME]" in 3D spinning text, with the name driven by a URL parameter.

---

## Setup

This is a fully static site — no build step, no dependencies to install.

1. Clone the repo
2. Open `index.html` in a browser, or use a local static server (e.g. `npx serve .`)
3. Append `?name=Felix` to the URL to personalise the greeting

---

## File Structure

```
/
├── CLAUDE.md               # Claude Code instructions
├── ROADMAP.md              # Feature roadmap and task backlog
├── README.md               # This file
├── netlify.toml            # Netlify build + redirect + header config
├── 404.html                # Custom 404 page
├── index.html              # Main page
├── css/
│   └── styles.css          # All styles: layout, 3D text, animations
└── js/
    └── main.js             # URL param parsing + spin interaction logic
```

---

## Usage

Personalise the greeting by passing a `name` query parameter:

```
https://your-site.netlify.app/?name=Felix
```

If no `name` param is provided, the page falls back to "Happy Birthday Friend".

---

## Deployment

Deployed on **Netlify** as a static site (no build command).

- Publish directory: `.` (repo root)
- Config: `netlify.toml`
- Deploys automatically on push to `main`
