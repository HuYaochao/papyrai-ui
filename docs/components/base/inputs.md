# Inputs

> Input components for forms and data entry | 表单与数据输入组件

20 components: `p-input` · `p-textarea` · `p-select` · `p-checkbox` · `p-radio` · `p-toggle` · `p-range` · `p-rating` · `p-date-picker` · `p-color-picker` · `p-file-input` · `p-otp-input` · `p-input-chips` · `p-password-indicator` · `p-knob` · `p-swap` · `p-signature-pad` · `p-rich-text-editor` · `p-input-mask` · `p-auto-complete`.

**Common props** shared by most inputs: `disabled` · `readonly` · `error` (string) · `size` (`sm|md|lg`).

---

## p-input

Single-line text input with prefix/suffix slots, clear button, and error state.

```html
<p-input label="Username" placeholder="Enter username"></p-input>
<p-input label="Email" type="email" placeholder="user@example.com"></p-input>
<p-input label="With prefix" prefix="@" placeholder="handle"></p-input>
<p-input label="Clearable" value="Clear me" clearable></p-input>
<p-input label="Error" value="bad@email" error="Invalid email address"></p-input>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | HTML input type |
| `value` | `string` | `''` | Current value |
| `label` | `string` | `''` | Label above the input |
| `placeholder` | `string` | `''` | Placeholder text |
| `prefix` | `string` | `''` | Text/icon before the input |
| `suffix` | `string` | `''` | Text/icon after the input |
| `clearable` | `boolean` | `false` | Show × clear button |
| `error` | `string` | `''` | Error message (shown in red below) |

**Events:** `input-change` `{ value }`, `input-clear` `{}`

---

## p-textarea

Multiline input with optional auto-resize and character count.

```html
<p-textarea label="Message" placeholder="Write here..." rows="3"></p-textarea>
<p-textarea label="Auto-resize" auto-resize show-count max-length="500"></p-textarea>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Current value |
| `rows` | `number` | `3` | Visible row count |
| `max-rows` | `number` | `0` | Max rows when auto-resizing (0 = unlimited) |
| `auto-resize` | `boolean` | `false` | Grow with content |
| `max-length` | `number` | `0` | Character limit (0 = none) |
| `show-count` | `boolean` | `false` | Show `n / max` count below |

**Events:** `textarea-change` `{ value }`

---

## p-select

Dropdown select with optional multi-select and search filter.

```html
<p-select id="s1" label="Framework" placeholder="Choose one"></p-select>
<p-select id="s2" label="Tags" multiple searchable placeholder="Choose multiple"></p-select>
<script>
  document.getElementById('s1').options = ['React', 'Vue', 'Svelte', 'Lit'];
  document.getElementById('s2').options = [
    { label: 'React', value: 'react' },
    { label: 'Vue',   value: 'vue'   },
  ];
</script>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `string[] \| {label,value}[]` | `[]` | Option list (JS property) |
| `value` | `string \| string[]` | `''` | Selected value(s) |
| `multiple` | `boolean` | `false` | Allow multi-select |
| `searchable` | `boolean` | `false` | Filter options by typing |
| `placeholder` | `string` | `''` | Placeholder text |

**Events:** `select-change` `{ value }`

---

## p-checkbox · p-radio · p-toggle

```html
<!-- Checkbox -->
<p-checkbox label="Accept terms" checked></p-checkbox>
<p-checkbox label="Indeterminate" indeterminate></p-checkbox>

<!-- Radio group -->
<p-radio name="plan" value="free"       label="Free"       checked></p-radio>
<p-radio name="plan" value="pro"        label="Pro"></p-radio>
<p-radio name="plan" value="enterprise" label="Enterprise"></p-radio>

<!-- Toggle -->
<p-toggle label="Dark mode" checked></p-toggle>
<p-toggle label="Notifications" label-off="Off"></p-toggle>
```

**Checkbox props:** `checked`, `indeterminate`, `disabled`, `value`, `label`, `size`
**Radio props:** `checked`, `disabled`, `value`, `name`, `label`, `size`
**Toggle props:** `checked`, `disabled`, `label`, `label-off`, `size`

All emit `change` `{ checked: boolean }`.

---

## p-range

Range slider with min/max/step and optional value tooltip.

```html
<p-range label="Volume" value="60" min="0" max="100" show-value></p-range>
<p-range label="Opacity" value="0.5" min="0" max="1" step="0.05" show-value></p-range>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `show-value` | `boolean` | `false` | Show current value tooltip |

**Events:** `range-change` `{ value }`

---

## p-rating

Star rating with optional half-star support and readonly mode.

```html
<p-rating label="Rating" value="3" max="5"></p-rating>
<p-rating value="3.5" half max="5"></p-rating>
<p-rating value="4" readonly max="5"></p-rating>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current rating |
| `max` | `number` | `5` | Total star count |
| `half` | `boolean` | `false` | Allow half-star values |
| `readonly` | `boolean` | `false` | Display-only mode |

**Events:** `rating-change` `{ value }`

---

## p-date-picker

Calendar-based date picker with range mode and min/max constraints.

```html
<!-- Single date -->
<p-date-picker placeholder="Select date"></p-date-picker>

<!-- Date range -->
<p-date-picker mode="range" placeholder="Select range"></p-date-picker>

<!-- Restricted -->
<p-date-picker min="2024-01-01" max="2026-12-31"></p-date-picker>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Selected date (ISO format `YYYY-MM-DD`) |
| `mode` | `'single' \| 'range'` | `'single'` | Selection mode |
| `min` | `string` | `''` | Minimum selectable date |
| `max` | `string` | `''` | Maximum selectable date |
| `placeholder` | `string` | `''` | Input placeholder |
| `locale` | `string` | `'en-US'` | Locale for month/day labels |

**Events:** `date-change` `{ value: string | string[] }`

---

## p-color-picker

HSB color picker with hex/rgb/hsl input, alpha slider, and preset swatches.

```html
<p-color-picker id="cp" value="#4a7c9b" format="hex"></p-color-picker>
<script>
  document.getElementById('cp').presets = ['#c4453c','#4a7c9b','#5a8a5a'];
</script>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `'#000000'` | Current color value |
| `format` | `'hex' \| 'rgb' \| 'rgba' \| 'hsl'` | `'hex'` | Output format |
| `show-alpha` | `boolean` | `false` | Show alpha (opacity) slider |
| `presets` | `string[]` | `[]` | Preset swatch colors (JS property) |

**Events:** `color-change` `{ value: string }`

---

## p-file-input

Drag-and-drop file upload zone with type filter, size limit, and thumbnail preview.

```html
<p-file-input label="Upload PDF" accept=".pdf,.doc"></p-file-input>
<p-file-input label="Upload images" accept="image/*" multiple max-size="5242880"></p-file-input>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | `''` | Accepted file types (MIME or extension) |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `max-size` | `number` | `0` | Max file size in bytes (0 = unlimited) |
| `label` | `string` | `''` | Zone label text |

**Events:** `file-change` `{ files: File[] }`, `file-error` `{ error: string }`

---

## p-otp-input

N-digit OTP input with auto-focus-next, paste support, and backspace navigation.

```html
<p-otp-input length="6"></p-otp-input>
<p-otp-input length="4" separator="-"></p-otp-input>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Number of digit boxes |
| `separator` | `string` | `''` | Character shown between boxes |
| `autofocus` | `boolean` | `false` | Focus first box on mount |

**Events:** `otp-complete` `{ value: string }`, `otp-change` `{ value: string }`

---

## p-input-chips

Tag/chip list with add-on-enter and backspace-to-remove.

```html
<p-input-chips id="chips" placeholder="Add tag..."></p-input-chips>
<script>
  document.getElementById('chips').value = ['design', 'paper', 'ui'];
</script>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string[]` | `[]` | Current chips (JS property) |
| `placeholder` | `string` | `''` | Input placeholder |
| `max` | `number` | `0` | Max chip count (0 = unlimited) |

**Events:** `chips-change` `{ value: string[] }`

---

## p-password-indicator

Password input with strength meter and optional rules checklist.

```html
<p-password-indicator show-rules></p-password-indicator>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Password value |
| `show-rules` | `boolean` | `false` | Show rules checklist below |
| `rules` | `{label, test}[]` | built-in | Custom validation rules (JS property) |

Strength levels: `weak` · `fair` · `strong` · `very-strong` — shown as colored bar.

**Events:** `password-change` `{ value, strength }`

---

## p-knob

Rotary dial input with drag + scroll interaction and arc indicator.

```html
<p-knob label="Volume" value="65" min="0" max="100" show-value></p-knob>
<p-knob label="Bass"   value="80" size="lg" show-value></p-knob>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `show-value` | `boolean` | `false` | Show numeric value below knob |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Knob diameter |

**Events:** `knob-change` `{ value }`

---

## p-swap

Animated toggle between two visual states (rotate / flip / fade transition).

```html
<p-swap label-on="▶ Play"  label-off="⏸ Pause"  type="rotate"></p-swap>
<p-swap label-on="🔆 Light" label-off="🌙 Dark"  type="flip"></p-swap>
<p-swap label-on="★ Saved" label-off="☆ Save"   checked></p-swap>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Active state |
| `label-on` | `string` | `'ON'` | Content shown when checked |
| `label-off` | `string` | `'OFF'` | Content shown when unchecked |
| `type` | `'none' \| 'rotate' \| 'flip' \| 'fade'` | `'none'` | Transition animation |

**Events:** `swap-change` `{ checked }`

---

## p-signature-pad

Canvas-based freehand drawing pad with pen-pressure simulation.

```html
<p-signature-pad id="sig" width="400" height="150"></p-signature-pad>
<script>
  const sig = document.getElementById('sig');
  // Export as PNG data URL
  const png = sig.exportPNG();
  // Clear
  sig.clear();
</script>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `400` | Canvas width in px |
| `height` | `number` | `150` | Canvas height in px |
| `pen-color` | `string` | `'#1a1612'` | Stroke color |
| `pen-width` | `number` | `2` | Base stroke width |

**Methods:** `clear()`, `exportPNG(): string`, `exportSVG(): string`, `isEmpty(): boolean`

---

## p-rich-text-editor

Contenteditable-based WYSIWYG editor with a basic toolbar.

```html
<p-rich-text-editor placeholder="Start typing..."></p-rich-text-editor>
<p-rich-text-editor value="<p>Readonly content</p>" readonly></p-rich-text-editor>
```

Toolbar buttons: **B** · *I* · _U_ · ~~S~~ · ordered list · unordered list · link

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | HTML content |
| `placeholder` | `string` | `''` | Placeholder text |
| `readonly` | `boolean` | `false` | Display-only mode |

**Events:** `editor-change` `{ value: string }` (HTML output)

---

## p-input-mask

Formatted input for phone numbers, dates, credit card numbers, etc.

```html
<p-input-mask label="Phone"       mask="(999) 999-9999" placeholder="(___) ___-____"></p-input-mask>
<p-input-mask label="Date"        mask="99/99/9999"     placeholder="MM/DD/YYYY"></p-input-mask>
<p-input-mask label="Credit card" mask="9999 9999 9999 9999"></p-input-mask>
```

`9` in the mask accepts any digit; `a` accepts any letter; `*` accepts any character.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mask` | `string` | `''` | Mask pattern string |
| `value` | `string` | `''` | Current value (unmasked) |
| `placeholder` | `string` | `''` | Placeholder (uses `_` for mask positions) |

**Events:** `mask-change` `{ value, maskedValue }`

---

## p-auto-complete

Text input with dropdown suggestion list supporting async data and highlighted matches.

```html
<p-auto-complete id="ac" label="Country" placeholder="Type to search..."></p-auto-complete>
<script>
  document.getElementById('ac').options =
    ['Argentina','Australia','Brazil','Canada','China','France','Germany','Japan'];
</script>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `string[] \| {label,value}[]` | `[]` | Suggestion list (JS property) |
| `value` | `string` | `''` | Selected value |
| `placeholder` | `string` | `''` | Input placeholder |
| `min-chars` | `number` | `1` | Minimum chars before showing suggestions |
| `debounce` | `number` | `200` | Input debounce delay in ms |

**Events:** `ac-change` `{ value }`, `ac-select` `{ option }`
