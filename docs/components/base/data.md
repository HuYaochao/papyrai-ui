# Data

> Data display and management components | 数据展示与管理组件

6 components: `p-table` · `p-calendar` · `p-order-list` · `p-tree` · `p-pick-list` · `p-virtual-scroller`.

---

## p-table

Feature-rich data table with sort, filter, row selection, pagination, and virtual scrolling.

### Usage

```html
<p-table id="tbl" striped hoverable sortable selectable selection-mode="multi"
         page-size="10" pagination></p-table>
<script>
  const tbl = document.getElementById('tbl');

  tbl.columns = [
    { key: 'name',   label: 'Name',   sortable: true },
    { key: 'role',   label: 'Role',   filterable: true },
    { key: 'status', label: 'Status', filterable: true },
    { key: 'score',  label: 'Score',  sortable: true },
  ];

  tbl.data = [
    { name: 'Alice Wang', role: 'Designer', status: 'Active',   score: 98 },
    { name: 'Bob Smith',  role: 'Engineer', status: 'Active',   score: 87 },
    { name: 'Carol Lee',  role: 'Manager',  status: 'On leave', score: 92 },
  ];
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `{key, label, sortable?, filterable?, width?}[]` | `[]` | Column definitions (JS property) |
| `data` | `object[]` | `[]` | Row data (JS property) |
| `striped` | `boolean` | `false` | Alternating row background |
| `bordered` | `boolean` | `false` | Cell borders |
| `hoverable` | `boolean` | `false` | Row hover highlight |
| `sortable` | `boolean` | `false` | Enable column sorting |
| `filterable` | `boolean` | `false` | Enable column filters |
| `selectable` | `boolean` | `false` | Enable row selection |
| `selection-mode` | `'single' \| 'multi'` | `'single'` | Selection mode |
| `pagination` | `boolean` | `false` | Show pagination below table |
| `page-size` | `number` | `10` | Rows per page |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `sort-change` | `{ key, direction }` | Column sort changed |
| `filter-change` | `{ filters }` | Column filters changed |
| `selection-change` | `{ selected: object[] }` | Row selection changed |
| `cell-edit` | `{ row, key, value }` | Cell value edited |

---

## p-calendar

Month / week / day calendar with event rendering, drag-to-create, and locale support.

### Usage

```html
<p-calendar id="cal"></p-calendar>
<script>
  const cal = document.getElementById('cal');

  // Add events
  cal.events = [
    { id: 1, title: 'Team standup',   date: '2026-03-05', color: '#4a7c9b' },
    { id: 2, title: 'Design review',  date: '2026-03-12', color: '#c4453c' },
    { id: 3, title: 'Sprint planning',date: '2026-03-15', color: '#5a8a5a' },
  ];
</script>

<!-- Week view -->
<p-calendar view="week"></p-calendar>

<!-- Day view -->
<p-calendar view="day"></p-calendar>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `view` | `'month' \| 'week' \| 'day'` | `'month'` | Calendar view |
| `value` | `string` | today | Currently displayed date (ISO) |
| `events` | `{id, title, date, color?, time?}[]` | `[]` | Calendar events (JS property) |
| `min` | `string` | `''` | Minimum selectable date |
| `max` | `string` | `''` | Maximum selectable date |
| `locale` | `string` | `'en-US'` | Locale for day/month labels |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `date-select` | `{ date: string }` | A date was clicked |
| `event-create` | `{ date, time? }` | Drag-to-create completed |
| `event-change` | `{ id, date, time? }` | Event dragged/resized |

---

## p-order-list

Drag-and-drop reorderable list with optional numbering and keyboard reorder (Alt+↑↓).

### Usage

```html
<p-order-list id="ol" numbered handle></p-order-list>
<script>
  document.getElementById('ol').items = [
    { id: 1, label: 'First task',  description: 'High priority' },
    { id: 2, label: 'Second task', description: 'Medium priority' },
    { id: 3, label: 'Third task'  },
  ];
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `{id, label, description?}[]` | `[]` | List items (JS property) |
| `numbered` | `boolean` | `false` | Show position numbers |
| `handle` | `boolean` | `false` | Show drag handle grip icon |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `order-change` | `{ items: object[] }` | Items reordered |

---

## p-tree

Hierarchical tree with expand/collapse, lazy loading, checkbox selection, and search.

### Usage

```html
<p-tree id="tree" selectable show-line></p-tree>
<script>
  document.getElementById('tree').data = [
    {
      key: 'components', label: 'Components',
      children: [
        { key: 'ai',     label: 'AI (18)' },
        { key: 'inputs', label: 'Inputs (20)' },
      ]
    },
    {
      key: 'core', label: 'Core',
      children: [
        { key: 'tokens', label: 'tokens.js' },
        { key: 'base',   label: 'base.js'   },
      ]
    },
  ];
</script>

<!-- Checkable multi-select -->
<p-tree id="tree2" checkable multiple></p-tree>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `{key, label, children?}[]` | `[]` | Tree data (JS property) |
| `selectable` | `boolean` | `false` | Click to select nodes |
| `multiple` | `boolean` | `false` | Multi-select mode |
| `checkable` | `boolean` | `false` | Show checkboxes with cascade |
| `show-line` | `boolean` | `false` | Show vertical connector lines |
| `default-expand-all` | `boolean` | `false` | Expand all nodes on mount |
| `expanded-keys` | `string[]` | `[]` | Controlled expanded keys |
| `selected-keys` | `string[]` | `[]` | Controlled selected keys |
| `checked-keys` | `string[]` | `[]` | Controlled checked keys |
| `indent` | `number` | `20` | Indentation per level in px |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `node-select` | `{ key, node }` | Node selected |
| `node-check` | `{ checkedKeys }` | Checkbox state changed |
| `node-expand` | `{ key, expanded }` | Node expanded/collapsed |

---

## p-pick-list

Dual-list transfer control: move items between "available" and "selected" columns.

### Usage

```html
<p-pick-list id="pl" searchable label="Components"></p-pick-list>
<script>
  const pl = document.getElementById('pl');
  pl.available = [
    { id: 'btn',    label: 'p-button' },
    { id: 'input',  label: 'p-input'  },
    { id: 'modal',  label: 'p-modal'  },
    { id: 'table',  label: 'p-table'  },
  ];
  pl.selected = [
    { id: 'ai-thinking', label: 'ai-thinking' },
  ];
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `available` | `{id, label}[]` | `[]` | Left-column items (JS property) |
| `selected` | `{id, label}[]` | `[]` | Right-column items (JS property) |
| `searchable` | `boolean` | `false` | Search filter on each column |
| `label` | `string` | `''` | Component label above both columns |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `pick-change` | `{ available, selected }` | Items moved between columns |

---

## p-virtual-scroller

Renders only the visible rows of a large dataset using a fixed-height scroll container.

### Usage

```html
<p-virtual-scroller id="vs" item-height="40" height="400px"
  style="border:1px solid var(--paper-border);border-radius:8px">
</p-virtual-scroller>

<script>
  const vs = document.getElementById('vs');

  // Provide items array
  vs.items = Array.from({ length: 100000 }, (_, i) => ({
    id: i + 1,
    label: `Row #${i + 1}`,
  }));

  // Optional custom renderer — return an HTML string
  vs.renderItem = (item) =>
    `<div style="padding:8px 16px;border-bottom:1px solid var(--paper-border)">
       <strong>${item.label}</strong>
     </div>`;
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `object[]` | `[]` | Full item dataset (JS property) |
| `item-height` | `number` | `40` | Fixed row height in px |
| `height` | `string` | `'400px'` | Viewport height (CSS value) |
| `overscan` | `number` | `3` | Extra rows rendered above/below viewport |

### Methods

| Method | Description |
|--------|-------------|
| `scrollToIndex(index)` | Programmatically scroll to a row |

### `renderItem` callback

Assign a function to `vs.renderItem` that receives an item object and returns an HTML string.
If not provided, the component renders `item.label` in a default row style.

### Performance

- Handles **100k+ rows** without jank
- Only `Math.ceil(height / itemHeight) + overscan * 2` DOM nodes are created
- Set `overscan` higher (e.g. `10`) if fast scrolling causes blank flashes
