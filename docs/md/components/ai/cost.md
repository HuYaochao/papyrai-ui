# ai-cost

> Inline token consumption and cost display | 行内 Token 消耗与费用显示

Compact component that shows token count and estimated USD cost for a single request.
For a full input/output breakdown, see [`ai-token-usage`](./token-usage).

## Usage

```html
<!-- tokens used + rate per 1K tokens -->
<ai-cost tokens="1234" rate="0.003"></ai-cost>

<!-- Animated count-up on mount -->
<ai-cost tokens="2500" rate="0.003" animate></ai-cost>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tokens` | `number` | `0` | Total token count |
| `rate` | `number` | `0` | Cost per 1 000 tokens in USD |
| `animate` | `boolean` | `false` | Count-up animation on mount |

## Cost formula

```
cost = (tokens / 1000) × rate
```

Displayed as `$0.0037` with 4 decimal places.

## Examples

### Inline after a response

```html
<ai-message role="assistant" model="claude-sonnet-4-6">
  Here is the answer to your question...
</ai-message>
<ai-cost tokens="847" rate="0.003" style="margin-top:4px"></ai-cost>
```

### With different model rates

```html
<!-- GPT-4o: $0.005 / 1K input tokens -->
<ai-cost tokens="2048" rate="0.005"></ai-cost>

<!-- Claude Haiku: $0.00025 / 1K tokens -->
<ai-cost tokens="4096" rate="0.00025"></ai-cost>
```

## Related

- [`ai-token-usage`](./token-usage) — Full input/output breakdown dashboard
- [`ai-model-badge`](./model-badge) — Display the model name alongside cost
