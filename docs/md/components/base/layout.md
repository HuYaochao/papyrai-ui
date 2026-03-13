# Layout

> Paper-style layout primitives | 类纸风格布局基础组件

Three building-block components: `p-card` · `p-container` · `p-skeleton`.

---

## p-card

Paper card with `header` / body / `footer` slots, optional dog-ear fold effect, and three elevation variants.

### Usage

```html
<!-- Basic card -->
<p-card>
  <span slot="header">Card Title</span>
  Body content goes here.
  <span slot="footer">Footer info</span>
</p-card>

<!-- Elevated with dog-ear corner fold -->
<p-card variant="elevated" folded>
  <span slot="header">Elevated + Folded</span>
  Content with a turned corner.
</p-card>

<!-- Clickable outlined card -->
<p-card variant="outlined" clickable>
  Click me — emits card-click
</p-card>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined'` | `'default'` | Visual elevation style |
| `folded` | `boolean` | `false` | Show dog-ear corner fold decoration |
| `clickable` | `boolean` | `false` | Add hover lift + pointer cursor; emits `card-click` |
| `padding` | `'sm' \| 'md' \| 'lg'` | `'md'` | Inner padding |

### Slots

| Slot | Description |
|------|-------------|
| *(default)* | Card body content |
| `header` | Top header bar |
| `footer` | Bottom footer bar |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `card-click` | `{}` | Emitted when `clickable` card is clicked |

---

## p-container

Responsive max-width wrapper with optional centering, padding, and paper-edge decoration.

### Usage

```html
<!-- Small centered column with padding -->
<p-container max-width="sm" centered padded>
  <p>Constrained content column</p>
</p-container>

<!-- Standard page layout container -->
<p-container max-width="lg" centered>
  <p>Main page content</p>
</p-container>

<!-- Full-width fluid -->
<p-container fluid>Full-bleed section</p-container>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `max-width` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` | Maximum width breakpoint |
| `centered` | `boolean` | `false` | Center with `margin: 0 auto` |
| `padded` | `boolean` | `false` | Add horizontal padding (`--spacing-md`) |
| `fluid` | `boolean` | `false` | Remove max-width constraint |

### Breakpoints

| Key | Max width |
|-----|-----------|
| `xs` | 480px |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `full` | 100% |

---

## p-skeleton

Loading placeholder that renders text lines, rectangles, or circles with pulse / wave animation.

### Usage

```html
<!-- Image / card placeholder -->
<p-skeleton variant="rect" width="100%" height="180px" animation="wave"></p-skeleton>

<!-- Multi-line text placeholder -->
<p-skeleton variant="text" lines="3" animation="pulse"></p-skeleton>

<!-- Avatar placeholder -->
<p-skeleton variant="circle" width="48px"></p-skeleton>

<!-- No animation (static) -->
<p-skeleton variant="rect" width="200px" height="40px" animation="none"></p-skeleton>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'rect' \| 'text' \| 'circle'` | `'rect'` | Shape of the placeholder |
| `width` | `string` | `'100%'` | CSS width |
| `height` | `string` | `'1em'` | CSS height (ignored for `text`) |
| `lines` | `number` | `1` | Number of text lines (`text` variant only) |
| `animation` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Loading animation |

### Composition example

```html
<!-- User list row skeleton -->
<div style="display:flex; gap:12px; align-items:center">
  <p-skeleton variant="circle" width="40px" animation="wave"></p-skeleton>
  <div style="flex:1">
    <p-skeleton variant="text" lines="1" animation="wave"></p-skeleton>
    <p-skeleton variant="text" lines="1" width="60%" animation="wave" style="margin-top:4px"></p-skeleton>
  </div>
</div>
```
