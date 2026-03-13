# ai-reasoning

> Chain-of-thought display | 思维链展示

## Basic Usage

```html
<ai-reasoning steps='[{"title":"Analyzing","content":"..."},{"title":"Computing","content":"..."}]'></ai-reasoning>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| steps | `array` | `[]` | Array of {title, content} |
| collapsed | `boolean` | `true` | Start collapsed |
| label | `string` | `'Thinking...'` | Loading label |

## Events

| Event | Description |
|-------|-------------|
| reasoning-toggle | Fired on expand/collapse |

## Related

- [ai-thinking](./thinking)
- [ai-tool-call](./tool-call)
