# Navigation

> Navigation & orientation components | 路由与导航组件

10 components: `p-tabs` · `p-pagination` · `p-steps` · `p-progress` · `p-bottom-tabs` · `p-command-palette` · `p-dock` · `p-scroll-spy` · `p-scroll-top` · `p-vertical-nav`.

---

## p-tabs

Tab panels with keyboard navigation (←→ arrows) and ARIA `tablist` / `tab` / `tabpanel` roles.

### Usage

```html
<p-tabs active="overview">
  <span slot="tab-overview">Overview</span>
  <div slot="panel-overview">Overview content.</div>

  <span slot="tab-api">API</span>
  <div slot="panel-api">API reference.</div>
</p-tabs>

<!-- Pills style -->
<p-tabs active="a" variant="pills">
  <span slot="tab-a">Tab A</span>
  <div slot="panel-a">A content</div>
  <span slot="tab-b">Tab B</span>
  <div slot="panel-b">B content</div>
</p-tabs>
```

Slot naming convention: `tab-{key}` for the label, `panel-{key}` for the content.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `string` | — | Key of the active tab |
| `variant` | `'line' \| 'pills' \| 'card'` | `'line'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tab label size |
| `closable` | `boolean` | `false` | Show × close button on each tab |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `tab-change` | `{ key: string }` | Active tab changed |
| `tab-close` | `{ key: string }` | Tab close button clicked |

---

## p-pagination

Page navigation with prev/next, optional page-size selector, and jump-to-page input.

### Usage

```html
<p-pagination current="1" total="200" page-size="10"></p-pagination>

<!-- With controls -->
<p-pagination
  current="3" total="500" page-size="20"
  show-size-changer show-quick-jumper
></p-pagination>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `current` | `number` | `1` | Current page (1-indexed) |
| `total` | `number` | `0` | Total number of items |
| `page-size` | `number` | `10` | Items per page |
| `show-size-changer` | `boolean` | `false` | Show page-size dropdown |
| `show-quick-jumper` | `boolean` | `false` | Show jump-to-page input |
| `page-size-options` | `number[]` | `[10,20,50,100]` | Options for the size changer |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `page-change` | `{ page: number, pageSize: number }` | Page or size changed |

---

## p-steps

Step-by-step wizard indicator. Supports clickable completed steps and error states.

### Usage

```html
<p-steps id="wizard" current="1" clickable></p-steps>
<script>
  document.getElementById('wizard').items = [
    { title: 'Account',  description: 'Create your account' },
    { title: 'Profile',  description: 'Fill in your details' },
    { title: 'Confirm',  description: 'Verify your email' },
  ];
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{title, description?, icon?}[]` | `[]` | Step definitions (JS property) |
| `current` | `number` | `0` | Zero-based active step index |
| `status` | `'process' \| 'finish' \| 'error' \| 'wait'` | `'process'` | Status of the current step |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `clickable` | `boolean` | `false` | Allow clicking completed steps |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `step-click` | `{ index: number }` | A completed step was clicked |

---

## p-progress

Linear or circular progress bar with determinate and indeterminate states.

### Usage

```html
<!-- Linear -->
<p-progress value="65" max="100" label="Uploading..."></p-progress>
<p-progress indeterminate label="Loading..."></p-progress>

<!-- Variants -->
<p-progress value="80" variant="success" label="Done"></p-progress>
<p-progress value="40" variant="warning" label="Caution"></p-progress>
<p-progress value="20" variant="danger"  label="Critical"></p-progress>

<!-- Circular -->
<p-progress type="circular" value="72" label="72%"></p-progress>
<p-progress type="circular" indeterminate></p-progress>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `max` | `number` | `100` | Maximum value |
| `indeterminate` | `boolean` | `false` | Animated indeterminate state |
| `type` | `'linear' \| 'circular'` | `'linear'` | Bar shape |
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Thickness |
| `label` | `string` | `''` | Descriptive text |

---

## p-bottom-tabs

Mobile-style fixed bottom navigation bar with icon + label + optional badge.

### Usage

```html
<p-bottom-tabs id="nav" value="home"></p-bottom-tabs>
<script>
  document.getElementById('nav').items = [
    { value: 'home',    label: 'Home',    icon: 'home' },
    { value: 'search',  label: 'Search',  icon: 'search' },
    { value: 'saved',   label: 'Saved',   icon: 'bookmark', badge: 3 },
    { value: 'profile', label: 'Profile', icon: 'user' },
  ];
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Active tab value |
| `items` | `{value, label, icon, badge?}[]` | `[]` | Tab definitions (JS property) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `tab-change` | `{ value: string }` | Active tab changed |

---

## p-command-palette

Cmd+K style overlay with fuzzy search, grouped commands, recent items, and keyboard navigation.

### Usage

```html
<p-command-palette id="cmd" placeholder="Type a command..."></p-command-palette>
<script>
  const cmd = document.getElementById('cmd');
  cmd.groups = [
    {
      label: 'Navigation',
      items: [
        { id: 'home',  label: 'Go to Home',  shortcut: '⌘H' },
        { id: 'docs',  label: 'Open Docs',   shortcut: '⌘D' },
      ]
    },
    {
      label: 'Actions',
      items: [
        { id: 'theme', label: 'Toggle Theme', shortcut: '⌘T' },
      ]
    }
  ];
  cmd.recent = [{ id: 'last', label: 'Last visited page' }];

  // Open on Cmd+K / Ctrl+K
  window.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      cmd.open = !cmd.open;
    }
  });
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Show/hide the palette |
| `placeholder` | `string` | `'Search...'` | Input placeholder |
| `groups` | `{label, items: {id, label, shortcut?}[]}[]` | `[]` | Command groups (JS property) |
| `recent` | `{id, label}[]` | `[]` | Recently used items (JS property) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `command-select` | `{ id: string }` | An item was selected |

---

## p-dock

macOS-style magnifying dock. Icons scale up based on proximity to the cursor.

### Usage

```html
<p-dock id="dock" icon-size="48" magnification="1.8" position="bottom"></p-dock>
<script>
  document.getElementById('dock').items = [
    { icon: 'home',     label: 'Home' },
    { icon: 'search',   label: 'Search' },
    { icon: 'star',     label: 'Favorites' },
    { icon: 'settings', label: 'Settings' },
  ];
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{icon, label, href?}[]` | `[]` | Dock items (JS property) |
| `icon-size` | `number` | `48` | Base icon size in px |
| `magnification` | `number` | `1.5` | Max scale factor on hover |
| `position` | `'bottom' \| 'left' \| 'right'` | `'bottom'` | Dock anchor position |

---

## p-scroll-spy

Highlights the current section in a nav list as the user scrolls through the page.

### Usage

```html
<!-- The spy component renders the nav links -->
<p-scroll-spy id="spy"></p-scroll-spy>

<!-- Content sections must have matching IDs -->
<h2 id="intro">Introduction</h2>
<h2 id="install">Installation</h2>

<script>
  document.getElementById('spy').sections = [
    { id: 'intro',   label: 'Introduction' },
    { id: 'install', label: 'Installation' },
  ];
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sections` | `{id, label}[]` | `[]` | Section definitions (JS property) |
| `offset` | `number` | `80` | Scroll offset in px (for fixed headers) |
| `scroll-container` | `string` | `''` | CSS selector of custom scroll container |

---

## p-scroll-top

Floating "back to top" button that fades in after scrolling past a threshold.

### Usage

```html
<p-scroll-top threshold="300" position="bottom-right"></p-scroll-top>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `threshold` | `number` | `300` | Scroll distance (px) before button appears |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Fixed position |
| `icon` | `string` | `'arrow-up'` | `svg-icon` name for the button |

---

## p-vertical-nav

Sidebar navigation with collapsible groups, icons, and active-item highlight.

### Usage

```html
<p-vertical-nav id="vnav" value="overview" collapsible></p-vertical-nav>
<script>
  document.getElementById('vnav').items = [
    { value: 'overview',    label: 'Overview',    icon: 'home' },
    {
      value: 'components', label: 'Components',  icon: 'stack',
      children: [
        { value: 'ai',      label: 'AI Components' },
        { value: 'inputs',  label: 'Inputs' },
      ]
    },
    { value: 'settings',    label: 'Settings',    icon: 'settings' },
  ];
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{value, label, icon?, children?}[]` | `[]` | Nav tree (JS property) |
| `value` | `string` | `''` | Active item value |
| `collapsible` | `boolean` | `false` | Allow collapsing groups |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `nav-change` | `{ value: string }` | Active item changed |
