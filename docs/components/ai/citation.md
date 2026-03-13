# ai-citation

> Knowledge base citation | 知识库引用

## Basic Usage

```html
<ai-citation source="Doc-123" confidence="0.95" url="/docs/123">
  Cited content here
</ai-citation>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| source | `string` | `''` | Source identifier |
| page | `string` | `''` | Page number |
| confidence | `number` | `1` | Confidence score 0-1 |
| url | `string` | `''` | Link to source |
| title | `string` | `''` | Source title |

## Events

| Event | Description |
|-------|-------------|
| citation-click | Fired when citation is clicked |

## Related

- [ai-source-card](./source-card)
- [ai-confidence](./confidence)
