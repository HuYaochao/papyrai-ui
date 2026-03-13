# ai-not-found

> Marks AI-fabricated references that don't actually exist | 标记 AI 捏造的不存在的引用

Use this component to wrap content where the AI cited a source, URL, or fact that cannot be verified or confirmed to exist.

## Usage

```html
<!-- Wrap the AI-generated reference -->
<ai-not-found what="https://arxiv.org/abs/2301.00000">
  AI cited this paper
</ai-not-found>

<!-- With a human-readable label -->
<ai-not-found what="The Great AI Synthesis (2023)">
  This book was recommended by the model
</ai-not-found>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `what` | `string` | `''` | The cited item (URL, title, or identifier) that doesn't exist |

## Behavior

- Renders the slot content with a strikethrough decoration and a warning indicator
- Shows the `what` value as a tooltip or footnote
- Does not emit events (display only)

## Examples

### Fabricated URL

```html
<p>
  According to
  <ai-not-found what="https://ai-facts.example.com/study-2024">
    this study
  </ai-not-found>,
  the results were significant.
</p>
```

### Fabricated book title

```html
<ai-not-found what="Deep Learning Mastery Vol. 3 (2025)">
  The model recommended reading
</ai-not-found>
```

## Related

- [`ai-hallucination`](./hallucination) — For uncertain/unverifiable claims
- [`ai-citation`](./citation) — For verified citations with confidence score
- [`ai-guardrail`](./guardrail) — For blocked or filtered content
