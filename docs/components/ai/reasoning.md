# ai-reasoning

> Chain-of-thought / thinking process display | 思维链 / 推理过程展示

Renders the model's reasoning steps in a collapsible timeline. Collapsed by default to keep the chat clean; users click to expand and read the full reasoning.

## Usage

```html
<ai-reasoning id="r1" label="Thinking..." collapsed></ai-reasoning>
<script>
  document.getElementById('r1').steps = [
    { title: 'Understand the question', content: 'Parse the user query and identify intent.' },
    { title: 'Retrieve relevant knowledge', content: 'Search for facts related to Transformers.' },
    { title: 'Organize the answer', content: 'Structure the response: definition → formula → example.' },
    { title: 'Generate response', content: 'Combine retrieved knowledge into a clear explanation.' },
  ];
</script>

<!-- Start expanded -->
<ai-reasoning id="r2"></ai-reasoning>
<script>
  document.getElementById('r2').steps = [...];
  document.getElementById('r2').collapsed = false;
</script>
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `{title: string, content: string}[]` | `[]` | Reasoning steps (JS property) |
| `collapsed` | `boolean` | `true` | Whether the steps are hidden initially |
| `label` | `string` | `'Thinking...'` | Header text shown in collapsed state |

## Behavior

- **Collapsed**: shows the `label` with animated ellipsis dots (`Thinking...`)
- **Expanded**: numbered timeline with connecting ink line, each step showing title + content
- Click the header or toggle button to expand/collapse

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `reasoning-toggle` | `{ collapsed: boolean }` | Expand/collapse state changed |

## Examples

### After an ai-message

```html
<ai-reasoning id="steps" label="Chain of thought" collapsed></ai-reasoning>
<ai-message role="assistant" model="claude-sonnet-4-6">
  Here is the final answer...
</ai-message>
<script>
  document.getElementById('steps').steps = [
    { title: 'Read context', content: '...' },
    { title: 'Draft answer',  content: '...' },
  ];
</script>
```

## Related

- [`ai-thinking`](./thinking) — Simpler animated "thinking" indicator
- [`ai-tool-call`](./tool-call) — Show tool calls within reasoning
- [`ai-message`](./message) — Container for the final response
