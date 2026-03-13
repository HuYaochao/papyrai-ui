# ai-confidence

> Visualizes AI confidence as a color-coded bar | 置信度颜色条可视化

Displays a 0–1 confidence score as a horizontal progress bar. Color shifts from red (low) → amber (medium) → green (high).

## Usage

```html
<ai-confidence value="0.85" label="Accuracy"></ai-confidence>
<ai-confidence value="0.50" label="Relevance"></ai-confidence>
<ai-confidence value="0.20" label="Reliability"></ai-confidence>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Confidence score in the range 0–1 |
| `label` | `string` | `''` | Descriptive label shown above the bar |

## Color thresholds

| Range | Color | Meaning |
|-------|-------|---------|
| 0.0 – 0.4 | Red (`--accent-red`) | Low confidence |
| 0.4 – 0.7 | Amber (`--accent-amber`) | Medium confidence |
| 0.7 – 1.0 | Green (`--accent-green`) | High confidence |

## Examples

### Inside an ai-citation

```html
<ai-citation
  title="Attention Is All You Need"
  source="arxiv.org"
  confidence="0.95"
  url="https://arxiv.org/abs/1706.03762"
>
  Transformer architecture citation.
</ai-citation>
```

### Side-by-side comparison

```html
<div style="display:flex;gap:24px">
  <ai-confidence value="0.92" label="Factual accuracy"></ai-confidence>
  <ai-confidence value="0.61" label="Source quality"></ai-confidence>
  <ai-confidence value="0.34" label="Recency"></ai-confidence>
</div>
```

## Related

- [`ai-citation`](./citation) — Uses confidence internally
- [`ai-source-card`](./source-card) — Relevance score bar
