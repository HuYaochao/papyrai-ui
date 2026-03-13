# ai-thinking

> AI thinking indicator with ink animation | 带墨水动画的 AI 思考指示器

## Basic Usage | 基本用法

```html
<ai-thinking></ai-thinking>
<ai-thinking model="GPT-4" speed="fast"></ai-thinking>
```

## Props | 属性

| Name | Type | Default | Description |
|------|------|---------|-------------|
| model | `string` | `'AI'` | Model name to display |
| speed | `'normal' \| 'slow' \| 'fast'` | `'normal'` | Animation speed |

## Events | 事件

| Event | Description |
|-------|-------------|
| None | This component doesn't emit events |

## Examples | 示例

### Slow Animation | 慢速动画

```html
<ai-thinking model="Claude" speed="slow"></ai-thinking>
```

### Dark Theme | 暗色主题

```html
<html data-theme="dark">
  <ai-thinking model="Gemini"></ai-thinking>
</html>
```

## Related | 相关

- [ai-stream](./stream) - Streaming text component
- [ai-message](./message) - Chat message component
