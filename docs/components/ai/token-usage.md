# ai-token-usage

> Detailed token usage dashboard | Token 消耗仪表盘

## Basic Usage

```html
<ai-token-usage inputTokens="1000" outputTokens="500" model="gpt-4"></ai-token-usage>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| inputTokens | `number` | `0` | Input token count |
| outputTokens | `number` | `0` | Output token count |
| inputRate | `number` | `0.03` | Input rate per 1K tokens |
| outputRate | `number` | `0.06` | Output rate per 1K tokens |
| model | `string` | `''` | Model name |

## Events

| Event | Description |
|-------|-------------|
| usage-click | Fired when clicked |

## Related

- [ai-cost](./cost)
- [ai-model-badge](./model-badge)
