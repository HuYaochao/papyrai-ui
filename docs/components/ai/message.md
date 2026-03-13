# ai-message

> Chat message bubble | 聊天消息气泡

## Basic Usage

```html
<ai-message role="user">Hello AI</ai-message>
<ai-message role="assistant" model="GPT-4">Hello! How can I help?</ai-message>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| role | `'user' \| 'assistant' \| 'system'` | `'assistant'` | Message role |
| model | `string` | `''` | Model name for assistant messages |
| timestamp | `string` | `''` | Message timestamp |
| avatar | `string` | `''` | Avatar image URL |
| loading | `boolean` | `false` | Show loading state |

## Events

| Event | Description |
|-------|-------------|
| message-action | Fired when user clicks copy/retry |

## Examples

### With Model Badge

```html
<ai-message role="assistant" model="Claude 3">Thinking...</ai-message>
```

## Related

- [ai-thinking](./thinking)
- [ai-stream](./stream)
