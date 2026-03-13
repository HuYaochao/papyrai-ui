# ai-feedback

> Response feedback (thumbs up/down) | 响应反馈

## Basic Usage

```html
<ai-feedback></ai-feedback>
<ai-feedback showCopy showRetry></ai-feedback>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | `'up' \| 'down' \| null` | `null` | Selected value |
| showCopy | `boolean` | `false` | Show copy button |
| showRetry | `boolean` | `false` | Show retry button |

## Events

| Event | Description |
|-------|-------------|
| feedback-change | Fired on thumbs up/down |
| feedback-copy | Fired on copy click |
| feedback-retry | Fired on retry click |

## Related

- [ai-message](./message)
- [ai-stream](./stream)
