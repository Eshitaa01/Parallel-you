# Parallel You

**Meet the future versions of yourself.**

A landing page for a career-simulation product. Pick one of four career
paths — AI Engineer, Frontend Engineer, Product Manager, Data Scientist —
and an interactive dashboard instantly shows the skills, projects, and
milestones that path implies through 2029.

Live demo: _add your deployed URL here_
Repo: _add your GitHub URL here_

## Stack

- **React 18** + **Vite** — fast dev server, small production bundle
- **Tailwind CSS** — utility styling driven by a small custom design-token set
- **Framer Motion** — scroll reveals, tab transitions, the hero path animation

No backend. No fabricated data. All copy in `src/data/careerPaths.js` is
illustrative career-simulation content, written to be honest rather than to
look impressive.

## Folder structure

```
parallel-you/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── README.md
├── DECISIONS.md
└── src/
    ├── main.jsx
    ├── App.jsx              # page shell + easter-egg state
    ├── index.css            # Tailwind entry + a few hand-written rules
    ├── data/
    │   └── careerPaths.js   # all simulator content, one source of truth
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── ParallelPaths.jsx  # signature SVG motif, reused in 2 sections
        ├── Simulator.jsx      # the interactive dashboard (core deliverable)
        ├── Features.jsx
        ├── Roadmap.jsx
        ├── CTASection.jsx
        └── Footer.jsx
```

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # serve the production build locally
```

## Deploying

Any static host works since this is a Vite SPA with no server code:

- **Vercel / Netlify**: import the repo, build command `npm run build`,
  output directory `dist`.
- **GitHub Pages**: run `npm run build`, publish `/dist` via
  `gh-pages` or a `deploy` workflow.

## Design system (short version)

- **Palette**: deep-navy base (`#0B0E1A`), four path accents (violet, teal,
  amber, rose) — one per career, used consistently everywhere that career
  appears.
- **Type**: Fraunces (display) + Inter (body) + JetBrains Mono (data/labels).
- **Signature element**: `ParallelPaths.jsx` — one line diverging into four
  colored futures. Appears full-size in the hero, then again, smaller, next
  to the simulator to reinforce "you are here, four ways forward."

Full rationale in `DECISIONS.md`.

## Easter egg

Double-click the "Parallel You" logo in the nav. Toggles "Unlimited
Potential" mode — the nav title gets a shimmering multi-color gradient
sourced from all four path colors. Zero effect on layout or content.
