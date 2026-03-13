# Overlays

> Floating layer components | 浮层组件

8 components: `p-modal` · `p-slideover` · `p-popover` · `p-tooltip` · `p-context-menu` · `p-toast` · `p-tour` · `p-watermark`.

---

## p-modal

Dialog modal with focus trap, scroll lock, backdrop click-to-close, and Escape key support.

### Usage

```html
<button onclick="document.getElementById('m1').open = true">Open</button>

<p-modal id="m1" label="Confirm Delete" size="md">
  <p>Are you sure you want to delete this item?</p>
  <div slot="footer" style="display:flex;gap:8px;justify-content:flex-end">
    <button onclick="document.getElementById('m1').open = false">Cancel</button>
    <button onclick="document.getElementById('m1').open = false">Delete</button>
  </div>
</p-modal>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Show/hide the modal |
| `label` | `string` | `''` | Dialog title |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Modal width |
| `backdrop-closable` | `boolean` | `true` | Click backdrop to close |
| `close-on-escape` | `boolean` | `true` | Escape key closes modal |
| `scroll-lock` | `boolean` | `true` | Lock body scroll when open |

### Slots

| Slot | Description |
|------|-------------|
| *(default)* | Modal body content |
| `footer` | Footer action area |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `modal-close` | `{}` | Modal was closed |

---

## p-slideover

Side panel that slides in from left or right with an optional backdrop overlay.

### Usage

```html
<button onclick="document.getElementById('so1').open = true">Open Panel</button>

<p-slideover id="so1" label="Settings" placement="right" width="320px">
  <p>Side panel content here.</p>
</p-slideover>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Show/hide the panel |
| `label` | `string` | `''` | Panel title |
| `placement` | `'left' \| 'right'` | `'right'` | Slide direction |
| `width` | `string` | `'320px'` | Panel width |
| `backdrop` | `boolean` | `true` | Show dimmed backdrop |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `slideover-close` | `{}` | Panel was closed |

---

## p-popover

Rich floating content panel with click or hover trigger, auto-flip placement, and arrow.

### Usage

```html
<!-- Click trigger (default) -->
<p-popover placement="bottom">
  <button slot="trigger">Open Popover ▾</button>
  <div style="padding:12px 16px">
    <strong>Popover Title</strong>
    <p>Rich content — any HTML allowed.</p>
  </div>
</p-popover>

<!-- Hover trigger -->
<p-popover placement="top" trigger="hover">
  <button slot="trigger">Hover me</button>
  <div style="padding:8px 12px">Hover content</div>
</p-popover>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state |
| `trigger` | `'click' \| 'hover'` | `'click'` | How the popover is opened |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred placement (auto-flips) |
| `offset` | `number` | `8` | Distance from trigger in px |

### Slots

| Slot | Description |
|------|-------------|
| `trigger` | The element that opens the popover |
| *(default)* | Popover content |

---

## p-tooltip

Lightweight hover/focus tooltip. Uses `text` attribute — no slot required.

### Usage

```html
<p-tooltip text="This is a tooltip" placement="top">
  <button>Hover me</button>
</p-tooltip>

<p-tooltip text="Delayed tooltip" placement="right" delay="500">
  <span style="border-bottom:1px dashed">Underlined text</span>
</p-tooltip>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `''` | Tooltip text content |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Preferred placement |
| `delay` | `number` | `0` | Show delay in ms |

---

## p-context-menu

Right-click context menu bound to a target element. Supports submenus, dividers, and danger items.

### Usage

```html
<div id="target" oncontextmenu="showCtx(event)">Right-click here</div>
<p-context-menu id="ctx"></p-context-menu>

<script>
  const ctx = document.getElementById('ctx');
  ctx.items = [
    { id: 'open',   label: 'Open',   icon: 'external' },
    { id: 'copy',   label: 'Copy link', icon: 'copy' },
    { divider: true },
    { id: 'delete', label: 'Delete', icon: 'error', danger: true },
  ];

  function showCtx(e) {
    e.preventDefault();
    ctx.show(e.clientX, e.clientY);
  }
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{id?, label?, icon?, danger?, divider?}[]` | `[]` | Menu items (JS property) |
| `open` | `boolean` | `false` | Controlled visibility |

### Methods

| Method | Description |
|--------|-------------|
| `show(x, y)` | Open the menu at page coordinates |
| `hide()` | Close the menu |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `menu-select` | `{ id: string }` | An item was clicked |

---

## p-toast

Notification toasts with auto-dismiss, queue management, and progress bar.

### Usage

```html
<!-- Place once in your app -->
<p-toast id="toasts" position="top-right" max-count="5"></p-toast>

<script>
  const toast = document.getElementById('toasts');

  // Show a toast
  toast.show({ message: 'Saved successfully!', type: 'success' });
  toast.show({ message: 'Something went wrong.', type: 'error', duration: 0 }); // persistent
  toast.show({ message: 'Note: file is large.', type: 'warning', duration: 4000 });
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'top-right'` | Screen position |
| `max-count` | `number` | `5` | Max visible toasts before queuing |
| `duration` | `number` | `3000` | Default auto-dismiss delay (ms); `0` = persistent |

### `show()` options

| Key | Type | Description |
|-----|------|-------------|
| `message` | `string` | Toast text |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | Visual variant |
| `duration` | `number` | Override default duration (ms) |

---

## p-tour

Step-by-step product tour that highlights target elements and overlays a popover.

### Usage

```html
<p-tour id="tour" show-progress show-skip></p-tour>
<button onclick="document.getElementById('tour').open = true">Start Tour</button>

<script>
  document.getElementById('tour').steps = [
    {
      target: '#step1',
      title: 'Welcome!',
      content: 'This is the main action button.',
    },
    {
      target: '#step2',
      title: 'Settings',
      content: 'Configure your preferences here.',
    },
  ];
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `{target, title, content}[]` | `[]` | Tour step definitions (JS property) |
| `open` | `boolean` | `false` | Start/stop the tour |
| `current-step` | `number` | `0` | Active step index |
| `show-progress` | `boolean` | `false` | Show "Step N of M" progress |
| `show-skip` | `boolean` | `false` | Show a "Skip" button |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `tour-finish` | `{}` | Tour completed |
| `tour-skip` | `{ step: number }` | Tour was skipped |
| `tour-step` | `{ step: number }` | Step changed |

---

## p-watermark

Canvas-rendered repeating diagonal watermark. Resistant to CSS removal.

### Usage

```html
<p-watermark text="CONFIDENTIAL" opacity="0.1" rotate="-25">
  <div>Protected content area</div>
</p-watermark>

<!-- Custom font size and gap -->
<p-watermark text="papyrai-ui" opacity="0.06" rotate="-30" font-size="14" gap="120">
  <article>Document content</article>
</p-watermark>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `'watermark'` | Watermark text |
| `rotate` | `number` | `-25` | Rotation angle in degrees |
| `opacity` | `number` | `0.1` | Text opacity (0–1) |
| `font-size` | `number` | `16` | Font size in px |
| `gap` | `number` | `100` | Spacing between repetitions in px |
| `color` | `string` | `'currentColor'` | Text color |
