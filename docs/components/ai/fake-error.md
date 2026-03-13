# ai-fake-error

> Simulated error reveal — shows a fake error then unveils the real content | 先显示假错误再揭示真内容

A playful component that renders a mock error screen for `delay` milliseconds, then smoothly transitions to reveal the slotted real content. Useful for humorous AI "glitch" effects or demos.

## Usage

```html
<ai-fake-error
  message="TypeError: Cannot read properties of undefined (reading 'answer')"
  delay="1500"
>
  Just kidding — here is the real answer!
</ai-fake-error>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `'Error: Something went wrong'` | The fake error message to display |
| `delay` | `number` | `1500` | Milliseconds to show the error before revealing the slot content |

## Behavior

1. On mount: renders a red terminal-style error block with `message`
2. After `delay` ms: fades out the error and reveals the default slot content
3. The transition uses a paper-peel or fade effect

## Events

| Event | Description |
|-------|-------------|
| `error-reveal` | Fired when the fake error disappears and real content is shown |

## Examples

### Fake network error

```html
<ai-fake-error
  message="NetworkError: Failed to fetch — retrying..."
  delay="2000"
>
  Connection restored. Here is your result.
</ai-fake-error>
```

### Very quick flash (500ms)

```html
<ai-fake-error message="Segmentation fault (core dumped)" delay="500">
  Completely fine, actually.
</ai-fake-error>
```

### Listen for reveal

```html
<ai-fake-error id="fe" message="Out of memory" delay="1200">
  Memory cleared. Continuing...
</ai-fake-error>
<script>
  document.getElementById('fe').addEventListener('error-reveal', () => {
    console.log('Error animation complete');
  });
</script>
```

## Related

- [`ai-hallucination`](./hallucination) — For genuine uncertain content warnings
- [`ai-not-found`](./not-found) — For fabricated references
- [`ai-guardrail`](./guardrail) — For real content filtering
