# DECISIONS.md — Parallel You

## Concept & Vision

"Parallel You" simulates four future careers from one present moment — AI Engineer, Frontend Engineer, Product Manager, and Data Scientist. The product's core philosophy (one timeline branching into distinct futures) is deeply encoded into the user interface: every component, color accent, and transition reinforces the feeling of branching paths without unnecessary decorative clutter.

---

## Design System & Architecture

- **Theme Engine (Dark, Light, System)**: Built with CSS custom variables tied directly to semantic Tailwind tokens (`bg-ink`, `bg-surface`, `bg-surface-2`, `border-line`, `text-paper`, `text-fog`). In dark mode, it uses deep space-navy (`#0B0E1A`) for an immersive cosmic feel; in light mode, it switches to crisp slate/paper (`#F8FAFC`) with calibrated high-contrast accents (`#6366F1`, `#0D9488`, `#EA580C`, `#E11D48`). Color scheme transitions are fluid, persistent via `localStorage`, and respect system preferences.
- **Typography Hierarchy**: Fraunces (an elegant, humanist serif) for high-craft display headings; Inter for readable, accessible body copy; and JetBrains Mono for data-driven elements (years, tech stacks, metrics, and code chips).
- **Restrained Motion & Micro-interactions**:
  1. Staggered hero entrance and SVG path drawing on initial load.
  2. Smooth `AnimatePresence` cross-fades when switching career tracks or scrubbing through the 2026–2029 timeline.
  3. Interactive skill gap checklist with real-time readiness score calculation.
  4. Celebratory particle physics (`canvas-confetti`) upon simulation lock-in and easter egg activation.
  5. `prefers-reduced-motion` is strictly respected globally in `index.css`.
- **Responsive Craft**: Tested thoroughly from 390px mobile viewport up to 1440px+ ultra-wide desktop with zero horizontal scroll and an accessible mobile navigation drawer.

---

## 1. Why this approach over the obvious alternative?

The obvious version of a career comparison page is a static 3-column table or marketing cards filled with generic bullet points. 

I rejected static comparison tables because they fail to convey **temporal divergence** — the fact that small decisions today compound into radically different roles, deliverables, and technical challenges three years out. Instead, I built an interactive simulation engine featuring:
- A dynamic **Year Scrubber (2026 → 2029)** that demonstrates role evolution and weekly time allocation changes over time.
- An interactive **Skill Gap & Readiness Check** giving users an immediate, actionable metric.
- A **Side-by-Side Comparator Modal** that lets users pit two career paths against each other across core technical surfaces, mathematical rigor, and prototyping velocities.

This turns abstract career advice into an exploratory, stateful experience.

---

## 2. One trade-off made under the time limit & what I'd do with a real week

**Trade-off**: The career trajectories, skill trees, and timeline deliverables are structured as a rich, curated client-side dataset rather than dynamically generated from a live AI agent or user resume parser.

**With a real week**:
1. **Dynamic Intake & Resume Ingestion**: Build an intake endpoint where users upload a resume or GitHub profile to generate a customized 4-year branching simulation calibrated to their current seniority.
2. **Interactive Branching Trees**: Expand the linear 4-year trajectory into a multi-branch decision tree (e.g. "Do you choose Management or IC at year 2?").
3. **Live Market Telemetry**: Connect to live public salary and hiring indices to show real-time market demand curves and compensation ranges.

---

## 3. Where AI tools were used & what was personally verified

- **Where AI was used**: AI was used to assist in scaffolding boilerplate component structures, refining mathematical SVG cubic bezier coordinates for `ParallelPaths.jsx`, and drafting the initial technical career competency data.
- **What was personally verified & refined**:
  1. **Build & Type Integrity**: Verified that `npm run build` bundles with zero errors and clean asset output.
  2. **Theme & Contrast Accessibility**: Manually verified WCAG contrast ratios across all 4 career accent colors in both Dark and Light modes.
  3. **Zero Fake Metrics / Honest Copy**: Ensured no fabricated customer testimonials, fake user counters, or generic stock logos were introduced. All copy reflects genuine engineering ladders and technical challenges.
  4. **Layout & Viewport Testing**: Verified responsive behavior at 390px (mobile) and 1440px (desktop), ensuring no overflow or truncated elements.
  5. **Easter Eggs**: Implemented and verified the Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`) and logo double-click "Unlimited Potential" modes.
