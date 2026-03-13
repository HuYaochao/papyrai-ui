# ai-prompt

> AI prompt input box | AI 提示词输入框

## Basic Usage

```html
<ai-prompt placeholder="Ask something..."></ai-prompt>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| placeholder | `string` | `'Ask AI...'` | Placeholder text |
| maxTokens | `number` | `4000` | Maximum tokens |
| value | `string` | `''` | Input value |
| disabled | `boolean` | `false` | Disabled state |
| showTokenCount | `boolean` | `true` | Show token count |

## Events

| Event | Description |
|-------|-------------|
| prompt-submit | Fired when user submits |
| prompt-change | Fired on input change |

## Examples

### With Custom Actions

```html
<ai-prompt>
  <button slot="actions">Templates</button>
</ai-prompt>
```

## Related

- [ai-message](./message)
- [ai-thinking](./thinking)
