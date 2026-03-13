# papyrai-ui

## 文档版本

- [English README](docs/md/README-en.md)
- [中文文档](docs/md/README-zh.md)

> Paper-style Web Components for AI applications

![首页](docs/md/screenshots/首页.png)

## 是什么

一个类纸风格的 Web Components 组件库，专为 AI 应用场景设计。

灵感来源：既然有免费 AI，能不能做个完全免费、通用、原始的 AI UI？

**目前就是写着玩的阶段，Bug 多，勿喷。（且没太多时间和精力）**

---



## 预览

![AI组件](docs/md/screenshots/AI组件.png)

![SVG图标](docs/md/screenshots/svg.png)

## 快速开始

```bash
npm install papyrai-ui
npm run dev
```

## 项目

**papyrai-ui** (papyrus + ai + ui) 是一个类纸风格的 Web Components 组件库，专为 AI 应用场景设计。

### 特性

- **18 个 AI 专属组件** - 思考指示器、流式文本、消息气泡、提示输入、工具调用、推理过程、反馈、引用、源卡片、令牌使用、安全过滤、幻觉提示、未找到、假装错误、置信度、差异对比、成本显示、模型徽章
- **SVG 图标系统** - 8 种 logo 模板 + 50 个手绘风格图标
- **69 个基础组件** - 覆盖 Elements、Inputs、Navigation、Overlays、Layout、Data 六大类
- **类纸视觉风格** - 纸张纹理、阴影效果、手写字体
- **完整主题支持** - 亮色/暗色主题，CSS 变量驱动
- **框架无关** - 基于 Web Components，兼容 React/Vue/Angular/原生 HTML

### 技术栈

| 技术 | 说明 |
|------|------|
| Lit | Web Components 基础类 (~6KB) |
| Rollup | 打包工具 |
| VitePress | 文档站点 |

### 组件命名

| 类型 | 前缀 | 示例 |
|------|------|------|
| AI 组件 | `ai-` | `<ai-thinking>`, `<ai-stream>` |
| SVG 组件 | `svg-` | `<svg-logo>`, `<svg-icon>` |
| 基础组件 | `p-` | `<p-button>`, `<p-modal>` |

---

## 使用

```javascript
// 引入全部组件
import 'papyrai-ui';

// 或按需引入
import 'papyrai-ui/components/ai-thinking';
```

```html
<!-- AI 组件 -->
<ai-thinking></ai-thinking>
<ai-stream></ai-stream>
<ai-message role="assistant">你好！</ai-message>
<ai-prompt placeholder="请输入提示词..."></ai-prompt>

<!-- 基础组件 -->
<p-button variant="primary">点击我</p-button>
<p-card>
  <div slot="header">标题</div>
  内容区域
</p-card>
<p-input label="用户名" placeholder="请输入"></p-input>
```

### 主题切换

```javascript
// 切换到暗色主题
document.documentElement.setAttribute('data-theme', 'dark');

// 切换到亮色主题（默认）
document.documentElement.removeAttribute('data-theme');
```

### 版本

**当前版本：1.0.0**

---

## License

MIT


npm run build

npm pack

npm login

npm publish
