# Elements

> Core UI element components | 核心 UI 元素组件

22 components across display, feedback, and interaction categories.

---

## p-accordion

Collapsible content sections with animated open/close. Keyboard: `Enter` / `Space` to toggle.

```html
<p-accordion label="What is papyrai-ui?">
  A framework-agnostic paper-style Web Components library.
</p-accordion>
<p-accordion label="How to install?" open>
  Run <code>npm install papyrai-ui</code>
</p-accordion>
<p-accordion label="Disabled section" disabled>
  Not accessible.
</p-accordion>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Header text |
| `open` | `boolean` | `false` | Expanded state |
| `disabled` | `boolean` | `false` | Prevent toggling |

**Events:** `accordion-toggle` `{ open: boolean }`

---

## p-alert

Informational message banner with icon, title, description, and optional close button.

```html
<p-alert variant="info"    title="Info">This is an informational message.</p-alert>
<p-alert variant="success" title="Success" closable>Saved successfully!</p-alert>
<p-alert variant="warning" title="Warning" closable>Please review before proceeding.</p-alert>
<p-alert variant="error"   title="Error">Something went wrong.</p-alert>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Color and icon |
| `title` | `string` | `''` | Bold title text |
| `closable` | `boolean` | `false` | Show × close button |

**Events:** `alert-close` `{}`

---

## p-avatar

User avatar with image, initials fallback, size variants, shape, and status indicator.

```html
<p-avatar name="Alice Wang" size="xl" status="online"></p-avatar>
<p-avatar name="Bob Smith"  size="lg" status="busy"></p-avatar>
<p-avatar name="Carol"      size="md" shape="square"></p-avatar>
<p-avatar size="sm" status="offline"></p-avatar>
<p-avatar src="https://i.pravatar.cc/100" name="Remote" size="lg"></p-avatar>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `''` | Image URL |
| `name` | `string` | `''` | Full name — used for initials fallback |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |
| `shape` | `'circle' \| 'square'` | `'circle'` | Border shape |
| `status` | `'online' \| 'busy' \| 'away' \| 'offline' \| ''` | `''` | Status dot color |

---

## p-badge

Count or dot badge overlaid on any slotted child element.

```html
<!-- Count badge -->
<p-badge count="5" variant="danger">
  <p-button>Messages</p-button>
</p-badge>

<!-- Over-limit with max -->
<p-badge count="128" max="99" variant="primary">
  <p-button>Notifications</p-button>
</p-badge>

<!-- Dot pulse -->
<p-badge dot pulse variant="success">
  <p-avatar name="User" size="md"></p-avatar>
</p-badge>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `0` | Number to display |
| `max` | `number` | `0` | Show `max+` when count exceeds (0 = no limit) |
| `dot` | `boolean` | `false` | Show as small dot instead of count |
| `pulse` | `boolean` | `false` | Add pulse animation |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'danger'` | Color |

---

## p-button · p-toggle-button · p-select-button

```html
<!-- p-button -->
<p-button>Default</p-button>
<p-button variant="primary">Primary</p-button>
<p-button variant="danger">Danger</p-button>
<p-button variant="ghost">Ghost</p-button>
<p-button loading>Loading...</p-button>
<p-button disabled>Disabled</p-button>

<!-- p-toggle-button (pressed/unpressed) -->
<p-toggle-button pressed>Bold</p-toggle-button>

<!-- p-select-button (mutually exclusive group) -->
<p-select-button id="sb" value="md"></p-select-button>
<script>
  document.getElementById('sb').options = [
    { value: 'sm', label: 'SM' },
    { value: 'md', label: 'MD' },
    { value: 'lg', label: 'LG' },
  ];
</script>
```

**Button props:** `variant` (`default|primary|danger|ghost`), `size` (`sm|md|lg`), `loading`, `disabled`
**Toggle-button props:** `pressed`, `disabled`
**Select-button props:** `value`, `options` (JS), `size`

---

## p-breadcrumb

Navigation path with configurable separator and overflow collapse.

```html
<p-breadcrumb id="bc"></p-breadcrumb>
<script>
  document.getElementById('bc').items = [
    { label: 'Home',       href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb' },          // current page — no href
  ];
</script>

<!-- Custom separator -->
<p-breadcrumb separator=">" id="bc2"></p-breadcrumb>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{label, href?}[]` | `[]` | Breadcrumb items (JS property) |
| `separator` | `string` | `'/'` | Separator character |

---

## p-chat-bubble

Generic chat bubble — left/right alignment, tail, timestamp, and avatar slot.
*(For AI conversations see [`ai-message`](../ai/message).)*

```html
<p-chat-bubble name="Alice" timestamp="10:32 AM">
  <p-avatar slot="avatar" name="Alice" size="sm"></p-avatar>
  Hello! How are you doing?
</p-chat-bubble>

<p-chat-bubble align="right" name="Bob" timestamp="10:33 AM">
  <p-avatar slot="avatar" name="Bob" size="sm"></p-avatar>
  I'm doing great, thanks!
</p-chat-bubble>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `'left' \| 'right'` | `'left'` | Bubble side |
| `name` | `string` | `''` | Sender name |
| `timestamp` | `string` | `''` | Time label |
| `variant` | `'default' \| 'paper'` | `'default'` | Visual style |

---

## p-divider

Horizontal or vertical separator line with optional label.

```html
<p-divider></p-divider>
<p-divider label="OR"></p-divider>
<p-divider dashed label="Section End"></p-divider>

<!-- Vertical (in a flex row) -->
<div style="display:flex;height:40px;align-items:center;gap:12px">
  <span>Left</span>
  <p-divider orientation="vertical" style="height:100%"></p-divider>
  <span>Right</span>
</div>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Line direction |
| `label` | `string` | `''` | Centered label text |
| `dashed` | `boolean` | `false` | Dashed line style |

---

## p-dropdown

Floating menu with click/hover trigger and keyboard navigation.

```html
<p-dropdown>
  <p-button slot="trigger">Options ▾</p-button>
  <div style="padding:8px 0">
    <div role="menuitem" style="padding:8px 16px;cursor:pointer">Edit</div>
    <div role="menuitem" style="padding:8px 16px;cursor:pointer">Duplicate</div>
    <hr style="margin:4px 0;border:none;border-top:1px solid var(--paper-border)">
    <div role="menuitem" style="padding:8px 16px;cursor:pointer;color:var(--accent-red)">Delete</div>
  </div>
</p-dropdown>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `'click' \| 'hover'` | `'click'` | Open trigger |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred placement |
| `open` | `boolean` | `false` | Controlled open state |

---

## p-listbox

Scrollable option list with single/multi select and keyboard navigation.

```html
<p-listbox id="lb" style="width:200px"></p-listbox>
<p-listbox id="lb2" multiple searchable style="width:220px"></p-listbox>
<script>
  document.getElementById('lb').options  = ['Fountain Pen','Quill','Ballpoint'];
  document.getElementById('lb2').options = [
    { label: 'React',   value: 'react' },
    { label: 'Vue',     value: 'vue'   },
    { label: 'Svelte',  value: 'svelte' },
  ];
</script>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `string[] \| {label,value}[]` | `[]` | Option list (JS property) |
| `value` | `string \| string[]` | `''` | Selected value(s) |
| `multiple` | `boolean` | `false` | Multi-select mode |
| `searchable` | `boolean` | `false` | Show search filter |

**Events:** `listbox-change` `{ value }`

---

## p-indicator

Badge / dot overlay on any slotted element, with four corner positions and pulse animation.

```html
<p-indicator count="3" variant="danger">
  <p-avatar name="User" size="md"></p-avatar>
</p-indicator>

<p-indicator dot pulse variant="success" position="bottom-right">
  <p-avatar name="Online" size="md"></p-avatar>
</p-indicator>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `0` | Count to display |
| `max` | `number` | `0` | Display `max+` when exceeded |
| `dot` | `boolean` | `false` | Dot mode (ignores count) |
| `pulse` | `boolean` | `false` | Pulse animation |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Corner position |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'danger'` | Color |

---

## p-timeline

Vertical or horizontal timeline with connector line and per-item icons.

```html
<p-timeline id="tl"></p-timeline>
<script>
  document.getElementById('tl').items = [
    { title: 'Project Created', content: 'Scaffolded with Rollup + Lit.', date: 'Jan 2024' },
    { title: 'AI Components',   content: '9 production AI components.',   date: 'Feb 2024' },
    { title: 'Base Components', content: '69 component rewrites.',        date: 'Mar 2024', icon: '★' },
  ];
</script>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{title, content?, date?, icon?}[]` | `[]` | Timeline entries (JS property) |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |
| `alternating` | `boolean` | `false` | Alternate left/right (vertical only) |

---

## p-stack

Z-stack of overlapping elements with configurable offset. Hover to fan out cards.

```html
<!-- Card stack -->
<p-stack offset="10" direction="bottom" fan-on-hover>
  <p-card style="width:120px;height:80px"><span slot="header">Card 1</span></p-card>
  <p-card style="width:120px;height:80px"><span slot="header">Card 2</span></p-card>
  <p-card style="width:120px;height:80px"><span slot="header">Card 3</span></p-card>
</p-stack>

<!-- Avatar group -->
<p-stack offset="8" direction="right">
  <p-avatar name="Alice" size="md"></p-avatar>
  <p-avatar name="Bob"   size="md"></p-avatar>
  <p-avatar name="Carol" size="md"></p-avatar>
</p-stack>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `offset` | `number` | `8` | Pixel offset between stacked items |
| `direction` | `'bottom' \| 'right' \| 'left'` | `'bottom'` | Stack direction |
| `fan-on-hover` | `boolean` | `false` | Spread items on mouse enter |

---

## p-carousel

Auto-play image/content carousel with touch swipe and dot indicators.

```html
<p-carousel id="c" auto-play interval="3000" loop></p-carousel>
<script>
  document.getElementById('c').slides = [
    { content: '<img src="slide1.jpg" alt="Slide 1">' },
    { content: '<img src="slide2.jpg" alt="Slide 2">' },
    { content: '<div style="padding:32px;text-align:center">Text slide</div>' },
  ];
</script>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slides` | `{content: string}[]` | `[]` | Slide definitions (JS property) |
| `auto-play` | `boolean` | `false` | Enable auto-advance |
| `interval` | `number` | `3000` | Auto-play interval in ms |
| `loop` | `boolean` | `false` | Loop after last slide |
| `show-dots` | `boolean` | `true` | Show dot indicators |
| `show-arrows` | `boolean` | `true` | Show prev/next arrows |

**Events:** `slide-change` `{ index: number }`
