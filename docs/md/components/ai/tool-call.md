# ai-tool-call

> Function/tool call display | 函数调用显示

## Basic Usage

```html
<ai-tool-call name="getWeather" status="running" input='{"city":"Beijing"}'></ai-tool-call>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | `''` | Tool function name |
| status | `'pending' \| 'running' \| 'success' \| 'error'` | `'pending'` | Call status |
| input | `string \| object` | `{}` | Input parameters |
| output | `string \| object` | `{}` | Output result |

## Events

| Event | Description |
|-------|-------------|
| tool-expand | Fired when expanded |
| tool-collapse | Fired when collapsed |

## Related

- [ai-message](./message)
- [ai-reasoning](./reasoning)
