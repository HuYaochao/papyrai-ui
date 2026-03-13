# ai-hallucination

> Hallucination content marker | 幻觉内容标记

## Basic Usage

```html
<ai-hallucination>
  The capital of France is London (incorrect)
</ai-hallucination>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| confidence | `number` | `0.5` | Certainty level 0-1 |
| revealText | `string` | `''` | Correct information |

## Events

| Event | Description |
|-------|-------------|
| hallucination-reveal | Fired when user clicks to reveal |

## Related

- [ai-not-found](./not-found)
- [ai-fake-error](./fake-error)
