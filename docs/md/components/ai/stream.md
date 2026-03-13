# ai-stream

> Streaming text with pen-writing effect | 笔写效果的流式文本

## Basic Usage

```html
<ai-stream text="Hello, this is streaming text..."></ai-stream>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| text | `string` | `''` | Text content to display |
| speed | `number` | `50` | Typing speed in ms per character |
| cursor | `boolean` | `true` | Show blinking cursor |

## Events

| Event | Description |
|-------|-------------|
| complete | Fired when typing animation completes |

## Examples

### Fast Typing

```html
<ai-stream text="Quick typing effect" :speed="20"></ai-stream>
```

## Related

- [ai-thinking](./thinking)
- [ai-message](./message)
