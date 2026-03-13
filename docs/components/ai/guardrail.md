# ai-guardrail

> Content safety/filter notice | 内容安全提示

## Basic Usage

```html
<ai-guardrail level="warning" reason="Potentially harmful content">
  Filtered content here
</ai-guardrail>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| level | `'info' \| 'warning' \| 'blocked'` | `'info'` | Safety level |
| reason | `string` | `''` | Reason for filtering |
| policy | `string` | `''` | Policy name |

## Events

| Event | Description |
|-------|-------------|
| guardrail-action | Fired when user requests to see blocked content |

## Related

- [ai-hallucination](./hallucination)
- [ai-not-found](./not-found)
