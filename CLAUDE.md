# CLAUDE.md

## Project Overview

**papyrai-ui** (papyrus + ai + ui) — the first framework-agnostic, paper-style open-source UI component library designed for AI application scenarios.

**Three differentiators (by priority):**
1. **AI-specific components** — no other UI library has these
2. **SVG-first** — parameterized logos, icons, decorative elements
3. **Paper visual style** — paper textures, shadows, handwritten fonts

**License:** MIT

## Tech Stack

| Item | Choice | Why |
|------|--------|-----|
| Component tech | Web Components | Framework-agnostic (React/Vue/vanilla HTML) |
| Base class | Lit (~6KB) | Less boilerplate, output is standard WC |
| Build tool | Rollup | Designed for libraries, clean output |
| Docs site | VitePress | GitHub Pages deployment |
| i18n | Chinese + English | Docs and component text bilingual |
| Themes | Light + Dark | CSS variable driven |

## Project Structure

```
papyrai-ui/
├── src/
│   ├── core/           # CSS variables, paper textures, base styles, dark theme
│   │   ├── tokens.js   # Design tokens as CSS variables
│   │   ├── styles.css  # Global reset, @font-face, paper texture
│   │   └── base.js     # PapyraiElement extends LitElement (base class)
│   ├── ai/             # AI-specific components (highest priority)
│   ├── svg/            # SVG logo templates + icon component
│   ├── icons/          # Individual SVG icon files
│   ├── components/     # Base UI components
│   │   ├── elements/   # 22 components (accordion, button, etc.)
│   │   ├── inputs/     # 20 components (input, select, etc.)
│   │   ├── navigation/ # 10 components (tabs, pagination, etc.)
│   │   ├── overlays/   # 8 components (modal, toast, etc.)
│   │   ├── layout/     # 3 components (card, container, skeleton)
│   │   └── data/       # 6 components (table, calendar, etc.)
│   ├── fonts/          # Embedded font files
│   └── index.js        # Full export
├── preview/            # Dev-time live preview (not published to npm)
├── docs/               # VitePress docs site (GitHub Pages)
├── dist/               # Build output
└── examples/           # User usage examples
```

## Naming Conventions

| Type | Prefix | Example |
|------|--------|---------|
| AI component | `ai-` | `<ai-thinking>`, `<ai-stream>` |
| SVG component | `svg-` | `<svg-logo>`, `<svg-icon>` |
| Base component | `p-` | `<p-button>`, `<p-modal>` |
| CSS variable | `--paper-`, `--ai-` | `--paper-white`, `--ai-thinking` |

- File names use kebab-case: `ai-thinking.js`, `date-picker.js`

## Component Conventions

1. All components extend `PapyraiElement` (Lit base class in `src/core/base.js`)
2. Must support light/dark theme via CSS variables — never hardcode colors
3. Styles go in `static styles` — no external CSS files
4. Must declare `static properties` with types and defaults
5. Interactive components must support keyboard navigation
6. Provide `slot` for custom content where applicable

## Visual Conventions

- Colors: only CSS variables, no hardcoded values
- Border radius: `--radius-sm/md/lg`
- Spacing: `--spacing-xs/sm/md/lg/xl`
- Shadows: `--elevation-1/2/3`
- Fonts: `--font-handwrite/serif/mono`
- All paper effects (texture, dog-ear, shadow) must be consistent

## SVG Icon Conventions

- `viewBox` must be `0 0 24 24`
- `stroke-width` must be `1.5` (hand-drawn feel without being too thick)
- Use `currentColor` for color inheritance
- Line caps: `stroke-linecap="round"` + `stroke-linejoin="round"`

## Size Constraints

- Single component JS: < 10KB gzipped
- Full bundle: < 100KB gzipped (excluding fonts)
- English fonts embedded: < 200KB
- Chinese fonts: separate optional package

## Theme System

- **Light theme (default):** white paper / stationery metaphor, paper texture background (SVG noise), paper float shadows (elevation levels), dog-ear fold effect
- **Dark theme:** black card / dark kraft paper metaphor, triggered via `<html data-theme="dark">`
- All driven by CSS variables — users can override any variable to customize

## Fonts

| Usage | Font | License |
|-------|------|---------|
| English handwriting/titles | Caveat | OFL |
| English monospace/code | JetBrains Mono | OFL |
| Chinese body (default) | Noto Serif SC | OFL |
| Chinese body (optional) | TsangerYuYangT W01-W05 | Free commercial use (zku declaration) |

## Commands

```bash
npm run dev       # Rollup watch mode
npm run build     # Rollup production build
npm run preview   # live-server preview/
```

## Component List (136 total)

### AI Components (9)
`<ai-thinking>` `<ai-stream>` `<ai-hallucination>` `<ai-not-found>` `<ai-fake-error>` `<ai-confidence>` `<ai-diff>` `<ai-cost>` `<ai-model-badge>`

### SVG (8 logo templates + 50 icons)
`<svg-logo>` (templates: stamp, seal, badge, minimal, scroll, ribbon, wax, corner)
`<svg-icon>` (50 hand-drawn style icons)

### Base Components (69)
- **Elements (22):** accordion, alert, avatar, badge, button, select-button, toggle-button, breadcrumb, carousel, chat-bubble, divider, dropdown, listbox, indicator, mockup, panel-splitter, qr-code, keyboard-key, scroll-bar, speed-dial, stack, timeline
- **Inputs (20):** auto-complete, color-picker, input-chips, otp-input, date-picker, rich-text-editor, input, input-mask, knob, password-indicator, textarea, select, swap, signature-pad, checkbox, radio, toggle, range, rating, file-input
- **Navigation (10):** bottom-tabs, command-palette, dock, pagination, progress, scroll-spy, scroll-top, steps, tabs, vertical-navigation
- **Overlays (8):** modal, slideover, popover, tooltip, context-menu, toast, tour, watermark
- **Layout (3):** card, container, skeleton
- **Data (6):** table, calendar, order-list, tree, pick-list, virtual-scroller

## Current Status & Items Needing Improvement

### Completed
- [x] Project initialization (directory structure, package.json, rollup config, preview skeleton, LICENSE files)
- [x] Core style system (tokens.js, styles.css, base.js)
- [x] All 9 AI-specific components
- [x] SVG logo component (8 templates) + SVG icon component
- [x] All 69 base components (Elements, Inputs, Navigation, Overlays, Layout, Data)
- [x] Rollup build configuration

### Needs Improvement / Not Yet Done
- [ ] **SVG icon asset alignment:** `src/icons/` has 39 icon files but spec calls for 50 — 11 icons are missing (copy, download, edit, error, external, eye, eye-off, info, link, success, warning need verification)
- [ ] **Per-component build (tree-shaking):** `dist/components/` per-component output not yet configured — users cannot do `import 'papyrai-ui/components/ai-thinking'`
- [ ] **Production build:** `dist/` directory is currently empty — Rollup build has not been run or is failing
- [ ] **npm publish:** package not yet published to npm registry
- [ ] **VitePress docs site:** `docs/` only has README files and screenshots, no VitePress config or component documentation pages
- [ ] **examples/ directory:** empty — no usage examples for React, Vue, or vanilla HTML
- [ ] **Tests:** no unit tests or integration tests exist for any component
- [ ] **Component quality review:** all base components were scaffolded in bulk and may need individual review for completeness, interactive behavior, edge cases, and accessibility
- [ ] **Keyboard accessibility audit:** interactive components (inputs, dropdowns, modals, etc.) need verification of keyboard navigation support
- [ ] **CHANGELOG.md:** needs to be kept up to date with releases
