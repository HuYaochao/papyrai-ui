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

## Current Status

### Done
- [x] Project initialization (directory structure, package.json, rollup config, preview skeleton, LICENSE)
- [x] Core style system (tokens.js, styles.css, base.js) — fully functional
- [x] 9 AI components — real implementations with animations, state, dark theme (100-160 lines each)
- [x] SVG logo (8 templates) + SVG icon (50 icons in svg-icon.js)
- [x] 69 base component **files exist** — but all are identical ~80-line placeholders (click-toggle skeleton only)
- [x] Rollup build configuration (3 output formats configured)

### Reality Check
- **AI components (9)**: genuinely functional, production-quality
- **SVG components (2)**: functional
- **69 base components**: ALL are copy-paste placeholders — same code, only class name differs. Need full rewrite per component
- **dist/**: empty, build not yet run
- **Icon wrappers**: 39/50, missing 11 (copy, download, edit, error, external, eye, eye-off, info, link, success, warning)

---

## Development Tasks — Sonnet

> Tasks assigned to Sonnet sessions. Execute in order within each priority group.
> Each task is self-contained — read existing code, implement, update preview HTML, ensure `npm run build` passes.

### S-P0: Infrastructure (do first)

**S-01** ✅ Fix Rollup build & generate dist/
- Run `npm run build`, diagnose and fix any errors
- Verify `dist/papyrai-ui.js`, `dist/papyrai-ui.esm.js`, `dist/papyrai-ui.min.js` are generated
- Ensure sourcemaps work

**S-02** ✅ Add 11 missing icon wrapper files in `src/icons/`
- Missing: copy, download, edit, error, external, eye, eye-off, info, link, success, warning
- Follow existing pattern in `src/icons/icon-pen.js` — extend PapyraiIcon, SVG paths from `src/svg/svg-icon.js`
- Update `src/index.js` exports if needed

**S-03** ✅ Configure per-component tree-shaking build
- Add Rollup multi-entry config so each component outputs to `dist/components/<name>.js`
- Users should be able to `import 'papyrai-ui/components/ai-thinking'`
- Update package.json `exports` field accordingly

### S-P1: New AI Components (highest value)

> All new AI components must: extend PapyraiElement, use CSS variables only, support light/dark theme, emit relevant custom events, include ARIA attributes, be registered as custom elements with `ai-` prefix.

**S-04** ✅ `<ai-citation>` — Knowledge base citation / source reference
- Props: `source` (string), `page` (string), `confidence` (number 0-1), `url` (string), `title` (string)
- Display: inline or block citation mark with paper-style footnote appearance
- Confidence shown as color indicator (high=green, mid=yellow, low=red)
- Click to expand source detail or navigate to url
- Slot for cited content
- Events: `citation-click`

**S-05** ✅ `<ai-message>` — Chat message bubble
- Props: `role` ('user'|'assistant'|'system'), `model` (string), `timestamp` (string), `avatar` (string), `loading` (boolean)
- User messages: right-aligned, paper-note style
- Assistant messages: left-aligned, typewriter paper style, show model badge via `<ai-model-badge>`
- System messages: centered, muted ink style
- Loading state: show `<ai-thinking>` inline
- Slot for message content (users handle their own markdown rendering)
- Events: `message-action` (for copy/retry/etc)

**S-06** ✅ `<ai-prompt>` — AI prompt input box
- Props: `placeholder`, `maxTokens` (number), `value` (string), `disabled`, `showTokenCount` (boolean)
- Paper-style textarea with quill pen decoration
- Live token count display (estimate: chars / 4)
- Submit on Enter (Shift+Enter for newline), submit button with ink-stamp style
- Slot `actions` for custom action buttons (e.g., template selector)
- Events: `prompt-submit`, `prompt-change`

**S-07** ✅ `<ai-tool-call>` — Function/tool call display
- Props: `name` (string), `status` ('pending'|'running'|'success'|'error'), `input` (string/JSON), `output` (string/JSON)
- Collapsed by default, click to expand
- Status indicator dot (animated spinning for running)
- Input/output displayed in monospace code blocks
- Paper clip decoration on the side
- Events: `tool-expand`, `tool-collapse`

**S-08** ✅ `<ai-reasoning>` — Chain-of-thought / thinking process
- Props: `steps` (JSON array of {title, content}), `collapsed` (boolean, default true), `label` (string, default "Thinking...")
- Collapsed: show "Thinking..." with animated dots, click to expand
- Expanded: numbered steps with connecting line (timeline style), each step has title + content
- Ink-and-paper style connecting line between steps
- Events: `reasoning-toggle`

**S-09** ✅ `<ai-feedback>` — Response feedback (thumbs up/down)
- Props: `value` ('up'|'down'|null), `showCopy` (boolean), `showRetry` (boolean)
- Horizontal button group: 👍 👎 📋Copy 🔄Retry (use svg-icon, not emoji)
- Selected state: filled icon with accent color
- Paper button style with hover elevation
- Events: `feedback-change`, `feedback-copy`, `feedback-retry`

**S-10** ✅ `<ai-guardrail>` — Content safety/filter notice
- Props: `level` ('info'|'warning'|'blocked'), `reason` (string), `policy` (string)
- Info: blue border, subtle notice
- Warning: amber border, caution stamp
- Blocked: red border, BLOCKED stamp, content hidden with blur overlay
- Slot for the filtered content
- Events: `guardrail-action` (if user requests to see blocked content)

**S-11** ✅ `<ai-source-card>` — RAG retrieval result card
- Props: `title` (string), `source` (string), `score` (number 0-1), `snippet` (string), `url` (string), `type` ('document'|'webpage'|'code'|'database')
- Paper card with dog-ear fold, source type icon top-right
- Relevance score bar (reuse confidence color logic)
- Snippet with keyword highlight slot
- Click to navigate to url
- Events: `source-click`

**S-12** ✅ `<ai-token-usage>` — Detailed token usage dashboard
- Props: `inputTokens` (number), `outputTokens` (number), `inputRate` (number), `outputRate` (number), `model` (string)
- Horizontal bar showing input vs output token ratio
- Cost breakdown: input cost + output cost = total
- Model badge integration
- Compact and expanded modes
- Events: `usage-click`

### S-P2: Base Component Rewrites

> All 69 base components are currently identical placeholders. Rewrite each to be a real, functional component.
> General rules: extend PapyraiElement, CSS variables only, light/dark theme, keyboard navigation, ARIA attributes, `slot` where applicable, emit semantic events.
> Reference existing UI libraries (Shoelace, Spectrum, Radix) for behavior specs — but keep the paper visual style unique.

**S-13** Rewrite `button`, `toggle-button`, `select-button`
- Button: variants (default/primary/danger/ghost), sizes (sm/md/lg), loading spinner, icon slot, disabled
- Toggle-button: pressed/not-pressed toggle with ARIA, icon swap
- Select-button: button group where one is selected, `value` property, keyboard left/right

**S-14** Rewrite `input`, `textarea`, `select`
- Input: type (text/email/number/password), label, placeholder, error message, prefix/suffix slots, clearable
- Textarea: auto-resize, character count, min/max rows
- Select: dropdown option list, keyboard navigation (arrow/enter/escape), searchable, multi-select, option groups

**S-15** Rewrite `checkbox`, `radio`, `toggle`, `range`, `rating`
- Checkbox: indeterminate state, label slot, group support
- Radio: radio group with name binding, keyboard arrow navigation
- Toggle: on/off with label, size variants
- Range: min/max/step, tooltip showing value, dual thumb for range selection
- Rating: star count, half-star support, readonly mode, custom icon

**S-16** Rewrite `tabs`, `pagination`, `steps`, `progress`
- Tabs: horizontal/vertical, closable, scrollable overflow, keyboard arrow navigation, ARIA tablist/tab/tabpanel
- Pagination: page count, prev/next, jump to page, page size selector
- Steps: horizontal/vertical, current step, clickable completed steps, error state
- Progress: linear/circular, determinate/indeterminate, label, color variants

**S-17** ✅ Rewrite `card`, `container`, `skeleton`
- Card: header/body/footer slots, paper texture background, elevation variants, clickable option
- Container: max-width breakpoints, centered, fluid option, paper edge decoration
- Skeleton: text/circle/rect shapes, animation (pulse/wave), custom width/height

**S-18** ✅ Rewrite `accordion`, `alert`, `avatar`, `badge`, `divider`
- Accordion: single/multi expand, animated open/close, icon rotation, keyboard enter/space
- Alert: variants (info/success/warning/error), closable, icon, title + description
- Avatar: image/initials/icon fallback, sizes, group stacking, status indicator
- Badge: count, dot mode, color variants, max count with "99+"
- Divider: horizontal/vertical, label slot, dashed/solid styles

**S-19** ✅ Rewrite `dropdown`, `listbox`, `auto-complete`
- Dropdown: trigger slot, menu with items/dividers/headers, keyboard navigation, nested submenus, placement (top/bottom/left/right)
- Listbox: single/multi select, keyboard navigation, virtualized for long lists, option groups
- Auto-complete: input + dropdown suggestions, async data source support, highlight matching text, debounced input

**S-20** ✅ Rewrite `breadcrumb`, `chat-bubble`, `indicator`, `timeline`, `stack`
- Breadcrumb: separator customization, overflow collapse, current page indicator
- Chat-bubble: left/right alignment, tail direction, timestamp, avatar slot (different from ai-message — this is a generic bubble)
- Indicator: dot/badge on any slotted element, position (top-right/top-left/bottom-right/bottom-left), pulse animation
- Timeline: vertical/horizontal, alternating sides, icon per item, connector line
- Stack: z-stack of overlapping elements, configurable offset, hover-to-fan

**S-21** ✅ Rewrite `otp-input`, `input-chips`, `input-mask`, `knob`, `password-indicator`
- OTP input: N digit boxes, auto-focus next, paste support, backspace to previous
- Input chips: tag/chip list with add/remove, input for new chips, max count
- Input mask: phone/date/credit-card format masks, custom mask patterns
- Knob: rotary dial input, min/max/step, visual arc indicator, drag + scroll input
- Password indicator: strength meter (weak/fair/strong/very-strong), color bar, rules checklist

**S-22** ✅ Rewrite `swap`, `signature-pad`, `file-input`, `rich-text-editor`
- Swap: animate between two states (icon swap, text swap), transition effects (rotate/flip/fade)
- Signature pad: canvas-based drawing, pen pressure simulation, clear button, export as PNG/SVG
- File input: drag-and-drop zone, file type filter, preview thumbnails, multiple files, size limit
- Rich text editor: basic toolbar (bold/italic/underline/list/link), contenteditable-based, output HTML

**S-23** ✅ Rewrite `bottom-tabs`, `command-palette`, `dock`, `scroll-spy`, `scroll-top`, `vertical-navigation`
- Bottom tabs: mobile-style fixed bottom bar, icon + label, badge support, active indicator
- Command palette: Cmd+K overlay, fuzzy search, keyboard navigation, grouped results, recent items
- Dock: macOS-style magnifying dock, icon slots, tooltip on hover
- Scroll spy: track scroll position, highlight active section in nav, smooth scroll to section
- Scroll top: floating button appears after scroll threshold, smooth scroll to top, customizable icon
- Vertical navigation: sidebar nav with sections, collapsible groups, active item indicator, icon support

**S-24** ✅ Rewrite `popover`, `tooltip`, `context-menu`, `slideover`, `tour`, `watermark`
- Popover: trigger click/hover, placement auto-flip, arrow, close on outside click, focus trap
- Tooltip: trigger hover/focus, placement, delay, rich content support
- Context menu: right-click trigger, nested submenus, keyboard navigation, dividers
- Slideover: side panel (left/right), overlay backdrop, close button, transition slide animation
- Tour: step-by-step product tour, highlight target element, popover with prev/next/skip, overlay mask
- Watermark: repeating diagonal text overlay, configurable opacity/rotation/gap, canvas-rendered for performance

**S-25** ✅ Rewrite `order-list`, `pick-list`, `virtual-scroller`
- Order list: drag-and-drop reorder, handle grip icon, keyboard reorder (alt+arrow), numbered
- Pick list: dual-list transfer (available → selected), search filter, move all/selected buttons
- Virtual scroller: render only visible items, dynamic item height support, scroll-to-index API

### S-P3: Documentation & Examples

**S-26** ✅ Set up VitePress docs site
- Install vitepress, create `docs/.vitepress/config.js` with sidebar/nav for all component categories
- Chinese + English i18n configuration
- Custom theme with papyrai CSS variables
- Component demo embedding (live code blocks)
- Deploy config for GitHub Pages

**S-27** ✅ Write AI component documentation pages
- One page per AI component with: description, props table, events table, live demo code, usage examples
- Both Chinese and English versions

**S-28** ✅ Write base component documentation pages
- Same format as AI docs, one page per component
- Group by category (elements, inputs, navigation, overlays, layout, data)

**S-29** ✅ Create usage examples
- `examples/vanilla/` — plain HTML usage
- `examples/react/` — React wrapper usage with @lit/react
- `examples/vue/` — Vue usage (Web Components work natively)
- Each example: package.json + minimal app demonstrating 5-10 key components

### S-P4: Quality & Publish

**S-30** Set up test framework
- Install @open-wc/testing + @web/test-runner
- Configure test runner for Lit components
- Write test helpers for theme switching, event assertions

**S-31** Write AI component tests
- Test each AI component: rendering, props, events, theme switching, accessibility
- Async tests for animated components (ai-stream, ai-thinking, ai-fake-error)

**S-32** Accessibility audit & fix
- Run axe-core on all components
- Fix ARIA roles (current base components wrongly use role="button" for everything)
- Add proper focus management to overlays
- Keyboard navigation for all interactive components

**S-33** npm publish preparation
- Update package.json version, description, keywords, repository
- Verify exports map and file references
- Create .npmignore (exclude src/, preview/, docs/, examples/)
- Test with `npm pack` and local install
- CHANGELOG.md initial entry

---

## Development Tasks — Opus

> Tasks assigned to Opus sessions. These involve complex algorithms, multi-component interactions, or intricate state management.

**O-01** ✅ Rewrite `<ai-diff>` with Myers diff algorithm
- Current implementation is a naive line-by-line positional compare — breaks on insertions/deletions
- Implement Myers diff algorithm (or equivalent LCS-based) for proper added/removed/moved detection
- Add character-level diff within changed lines (highlight exact changed words/chars)
- Support side-by-side view mode (prop `mode`: 'inline' | 'side-by-side')
- Syntax highlighting for code diffs (detect language, use token-based coloring with CSS variables)
- Red pen teacher style: strikethrough removed, green underline added, margin annotations
- Events: `diff-computed` (with stats: added/removed/changed line counts)
- Performance: handle diffs up to 5000 lines without jank

**O-02** Rewrite `modal`, `toast` ✅
- **Modal**: open/close with transition, backdrop overlay with click-to-close (configurable), focus trap (tab cycles within modal), escape to close, scroll lock on body, header/body/footer slots, sizes (sm/md/lg/full), stacking multiple modals with z-index management, ARIA dialog role
- **Toast**: notification system — static method `Toast.show({message, type, duration})`, position (top-right/top-left/bottom-right/bottom-left/top-center/bottom-center), auto-dismiss with progress bar, stack multiple toasts, swipe to dismiss, variants (info/success/warning/error), max visible count with queue

**O-03** Rewrite `table` ✅
- Column definition via JSON or slot-based
- Sortable columns (click header, asc/desc/none cycle)
- Column filtering (text/select/date range)
- Row selection (single/multi with checkbox column)
- Pagination integration (use `<p-pagination>`)
- Fixed header on scroll, fixed left/right columns
- Virtual scrolling for large datasets (integrate with virtual-scroller logic)
- Responsive: collapse columns or switch to card layout on mobile
- Cell editing (inline edit mode)
- Row expand for detail view
- Keyboard navigation: arrow keys for cells, enter to edit, escape to cancel
- Events: `sort-change`, `filter-change`, `selection-change`, `cell-edit`

**O-04** Rewrite `date-picker`, `color-picker` ✅
- **Date-picker**: calendar grid, month/year navigation, range selection, min/max date, disabled dates, today button, keyboard navigation (arrow keys for days, page up/down for months), locale formatting, time picker integration option, ARIA grid role
- **Color-picker**: hue/saturation/brightness canvas, hue slider, alpha slider, hex/rgb/hsl input, preset color swatches, eyedropper tool (if browser supports), recent colors, output format selection, keyboard accessible

**O-05** Rewrite `carousel`, `tree`, `calendar` ✅
- **Carousel**: slide/fade transitions, auto-play with pause on hover, prev/next buttons, dot indicators, swipe gesture on touch, infinite loop option, slides-per-view, responsive breakpoints, keyboard left/right, ARIA live region
- **Tree**: hierarchical data rendering, expand/collapse nodes, lazy loading children, checkbox selection (parent-child cascade), drag-and-drop reorder, search/filter, keyboard navigation (arrow up/down/left/right for expand/collapse/navigate), virtual rendering for large trees, ARIA tree/treeitem roles
- **Calendar**: month/week/day views, event rendering with time slots, drag to create events, drag to resize events, event overlap layout, navigation between months, today indicator, locale support, ARIA grid, events: `date-select`, `event-create`, `event-change`
