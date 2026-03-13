# ai-fake-error

> Fake error reveal | 伪错误揭示

## Basic Usage

```html
<ai-fake-error message="Connection timeout" reveal></ai-fake-error>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| message | `string` | `''` | Error message to display |
| reveal | `boolean` | `false` | Show the "error" |
| type | `'error' \| 'warning' \| 'info'` | `'error'` | Error type |

## Events

| Event | Description |
|-------|-------------|
| error-reveal | Fired when error is revealed |

## Related

- [ai-hallucination](./hallucination)
- [ai-not-found](./not-found)
