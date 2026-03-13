# ai-diff

> AI red-pen diff | AI 红笔批改

## Basic Usage

```html
<ai-diff oldText="The cat sat on the mat" newText="The dog sat on the rug"></ai-diff>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| oldText | `string` | `''` | Original text |
| newText | `string` | `''` | Modified text |
| mode | `'inline' \| 'side-by-side'` | `'inline'` | Display mode |
| language | `string` | `''` | Syntax highlighting language |

## Events

| Event | Description |
|-------|-------------|
| diff-computed | Fired with stats after computing |

## Related

- [ai-cost](./cost)
- [ai-confidence](./confidence)
