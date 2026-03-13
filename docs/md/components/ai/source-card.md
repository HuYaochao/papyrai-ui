# ai-source-card

> RAG retrieval result card | RAG 检索结果卡片

## Basic Usage

```html
<ai-source-card title="Document Title" source="PDF" score="0.95" snippet="Relevant content..."></ai-source-card>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | `''` | Card title |
| source | `string` | `''` | Source name |
| score | `number` | `0` | Relevance score 0-1 |
| snippet | `string` | `''` | Content snippet |
| url | `string` | `''` | Link URL |
| type | `'document' \| 'webpage' \| 'code' \| 'database'` | `'document'` | Source type |

## Events

| Event | Description |
|-------|-------------|
| source-click | Fired when card is clicked |

## Related

- [ai-citation](./citation)
- [ai-confidence](./confidence)
