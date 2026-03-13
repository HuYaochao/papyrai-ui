# ai-model-badge

> Auto-colored model identifier badge | 自动配色的模型标识徽章

Displays the model name as a compact pill badge. Colors are automatically assigned per model family: Claude → purple, GPT → green, Gemini → blue, Qwen → orange, LLaMA → grey.

## Usage

```html
<ai-model-badge model="claude-3-opus"></ai-model-badge>
<ai-model-badge model="claude-sonnet-4-6"></ai-model-badge>
<ai-model-badge model="gpt-4-turbo"></ai-model-badge>
<ai-model-badge model="gpt-4o"></ai-model-badge>
<ai-model-badge model="gemini-pro"></ai-model-badge>
<ai-model-badge model="qwen-turbo"></ai-model-badge>
<ai-model-badge model="llama-3-70b"></ai-model-badge>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `string` | `''` | Model identifier string (e.g. `claude-sonnet-4-6`, `gpt-4o`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |

## Color mapping

| Model prefix | Color |
|-------------|-------|
| `claude-*` | Purple |
| `gpt-*` | Green |
| `gemini-*` | Blue |
| `qwen-*` | Orange |
| `llama-*` | Grey |
| *(unknown)* | Neutral ink |

The display label is auto-formatted: `claude-sonnet-4-6` → `Claude Sonnet 4.6`.

## Examples

### Inside ai-message

```html
<ai-message role="assistant" model="claude-sonnet-4-6" timestamp="10:32 AM">
  Here is my response...
</ai-message>
```

*(The badge is rendered automatically by `ai-message` when `model` is set.)*

### Standalone in a header

```html
<div style="display:flex;align-items:center;gap:8px">
  <span>Powered by</span>
  <ai-model-badge model="claude-sonnet-4-6"></ai-model-badge>
</div>
```

### Size variants

```html
<ai-model-badge model="gpt-4o" size="sm"></ai-model-badge>
<ai-model-badge model="gpt-4o" size="md"></ai-model-badge>
<ai-model-badge model="gpt-4o" size="lg"></ai-model-badge>
```

## Related

- [`ai-message`](./message) — Uses the badge to show which model replied
- [`ai-token-usage`](./token-usage) — Also shows the model badge
- [`ai-cost`](./cost) — Pair with cost display
