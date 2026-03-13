# papyrai-ui

> Paper-style Web Components for AI applications
> 第一个为 AI 应用场景设计的类纸风格 Web Components 组件库

[![npm](https://img.shields.io/npm/v/papyrai-ui)](https://www.npmjs.com/package/papyrai-ui)
[![License](https://img.shields.io/npm/l/papyrai-ui)](LICENSE)

## 特性

- **框架无关**：支持 React、Vue、Angular 或原生 HTML
- **AI 专属组件**：9 个独特的 AI 应用组件
- **类纸视觉**：纹理、阴影、手写字体
- **SVG 优先**：参数化 Logo 和图标
- **主题支持**：亮色和暗色主题
- **本地优先**：可完全离线使用

## 安装

```bash
npm install papyrai-ui
```

## 开发

```bash
npm run dev    # 启动开发服务器
npm run preview # 预览构建结果
```

## 使用

### 全量引入

```javascript
import 'papyrai-ui';
```

```html
<ai-thinking></ai-thinking>
<p-button>点击我</p-button>
```

### 单独引入

```javascript
import 'papyrai-ui/components/ai-thinking';
```

### CDN

```html
<script src="https://unpkg.com/papyrai-ui"></script>
```

## 组件

### AI 组件

| 组件 | 描述 |
|------|------|
| `<ai-thinking>` | 带墨水动画的 AI 思考指示器 |
| `<ai-stream>` | 笔写效果的流式文本 |
| `<ai-hallucination>` | 幻觉内容标记 |
| `<ai-not-found>` | "AI 以为存在但不存在" |
| `<ai-fake-error>` | 伪错误揭示 |
| `<ai-confidence>` | 置信度可视化 |
| `<ai-diff>` | AI 红笔批改 |
| `<ai-cost>` | Token 消耗显示 |
| `<ai-model-badge>` | 自动配色的模型徽章 |

### 基础组件

- **Elements**: Button, Avatar, Badge, Alert, Accordion 等 (22个)
- **Inputs**: Input, Select, Checkbox, Range, DatePicker 等 (20个)
- **Navigation**: Tabs, Steps, Pagination, Breadcrumb 等 (10个)
- **Overlays**: Modal, Popover, Tooltip, Toast 等 (8个)
- **Layout**: Card, Container, Skeleton (3个)
- **Data**: Table, Calendar, Tree 等 (6个)

## 主题切换

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

## 许可证

MIT
