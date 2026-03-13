# papyrai-ui

> Paper-style Web Components for AI applications
> 第一个为 AI 应用场景设计的类纸风格 Web Components 组件库

[![npm](https://img.shields.io/npm/v/papyrai-ui)](https://www.npmjs.com/package/papyrai-ui)
[![License](https://img.shields.io/npm/l/papyrai-ui)](LICENSE)

## Features

- **Framework-agnostic**: Works with React, Vue, Angular, or plain HTML
- **AI-exclusive components**: 9 unique components for AI applications
- **Paper-style design**: Textures, shadows, handwritten fonts
- **SVG-first**: Parametric logos and icons
- **Theme support**: Light and dark themes

## Installation

```bash
npm install papyrai-ui
```

## Development

```bash
npm run dev    # Start dev server
npm run preview # Preview build
```

## Usage

### Full import

```javascript
import 'papyrai-ui';
```

```html
<ai-thinking></ai-thinking>
<p-button>Click me</p-button>
```

### Individual component

```javascript
import 'papyrai-ui/components/ai-thinking';
```

### CDN

```html
<script src="https://unpkg.com/papyrai-ui"></script>
```

## Components

### AI Components

| Component | Description |
|-----------|-------------|
| `<ai-thinking>` | AI thinking indicator with ink animation |
| `<ai-stream>` | Streaming text with pen-writing effect |
| `<ai-hallucination>` | Hallucination content marker |
| `<ai-not-found>` | "AI thinks it exists but doesn't" |
| `<ai-fake-error>` | Fake error reveal |
| `<ai-confidence>` | Confidence visualization |
| `<ai-diff>` | AI red-pen diff |
| `<ai-cost>` | Token cost display |
| `<ai-model-badge>` | Model badge with auto-coloring |

### Basic Components

- **Elements**: Button, Avatar, Badge, Alert, Accordion, etc. (22)
- **Inputs**: Input, Select, Checkbox, Range, DatePicker, etc. (20)
- **Navigation**: Tabs, Steps, Pagination, Breadcrumb, etc. (10)
- **Overlays**: Modal, Popover, Tooltip, Toast, etc. (8)
- **Layout**: Card, Container, Skeleton (3)
- **Data**: Table, Calendar, Tree, etc. (6)

## Theme

Switch between light and dark themes:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

## License

MIT
