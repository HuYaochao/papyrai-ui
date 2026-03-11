# papyrai-ui 开发步骤条

> 本文档是开发执行清单。配合 01-项目要点整理.md 阅读。
> 每完成一步，在 preview/ 对应HTML中确认效果后再进入下一步。


## 约束规范（给AI/Cursor的硬规则）

### 命名规范

- 所有基础组件标签名以 `p-` 为前缀（papyrai的缩写）
- 所有AI组件标签名以 `ai-` 为前缀
- 所有SVG组件标签名以 `svg-` 为前缀
- 文件名用 kebab-case：`ai-thinking.js`、`date-picker.js`
- CSS变量用 `--paper-` 或 `--ai-` 前缀

### 组件规范

- 所有组件继承 `PapyraiElement`（Lit基类）
- 所有组件必须支持亮色/暗色主题（读CSS变量，不硬编码颜色）
- 所有组件的样式写在 `static styles` 里，不用外部CSS文件
- 所有组件必须声明 `static properties`，标注类型和默认值
- 所有交互组件必须支持键盘操作
- 所有组件必须有slot支持自定义内容（如适用）

### 视觉规范

- 颜色只用CSS变量，禁止硬编码色值
- 圆角统一用 `--radius-sm/md/lg`
- 间距统一用 `--spacing-xs/sm/md/lg/xl`
- 阴影统一用 `--elevation-1/2/3`
- 字体统一用 `--font-handwrite/serif/mono`
- 所有纸张效果（纹理、折角、阴影）保持一致

### SVG规范

- 所有SVG图标 viewBox 统一 `0 0 24 24`
- stroke-width 统一 `1.5`（手绘感但不过粗）
- 使用 `currentColor` 继承颜色
- 线条末端用 `stroke-linecap="round"` + `stroke-linejoin="round"`

### 文件大小约束

- 单个组件JS < 10KB（gzipped）
- 全量包 < 100KB（gzipped，不含字体）
- 英文字体内嵌 < 200KB
- 中文字体单独包

---

## 总计

| 类别 | 数量 |
|------|------|
| AI专属组件 | 9 |
| SVG logo模板 | 8 |
| SVG图标 | 50 |
| Elements | 22 |
| Inputs | 20 |
| Navigation | 10 |
| Overlays | 8 |
| Layout | 3 |
| Data | 6 |
| **合计** | **136** |
---

## Step 0：项目初始化

### 0.1 创建目录结构

```
papyrai-ui/
├── 01-papyrai-ui-项目要点整理.md
├── 02-papyrai-ui-开发步骤条.md
├── package.json
├── README.md
├── LICENSE
├── FONT_LICENSE
├── CHANGELOG.md
├── rollup.config.js
├── src/
│   ├── core/
│   ├── ai/
│   ├── svg/
│   ├── components/
│   │   ├── elements/
│   │   ├── inputs/
│   │   ├── navigation/
│   │   ├── overlays/
│   │   ├── layout/
│   │   └── data/
│   ├── fonts/
│   └── index.js
├── dist/
├── preview/
│   ├── index.html
│   ├── ai.html
│   ├── svg.html
│   ├── elements.html
│   ├── inputs.html
│   ├── navigation.html
│   ├── overlays.html
│   ├── layout.html
│   ├── data.html
│   └── theme.html
├── docs/
│   ├── .vitepress/
│   ├── zh/
│   └── en/
└── examples/
```

### 0.2 package.json

```json
{
  "name": "papyrai-ui",
  "version": "0.0.1",
  "description": "Paper-style Web Components for AI applications",
  "license": "MIT",
  "type": "module",
  "main": "dist/papyrai-ui.js",
  "module": "dist/papyrai-ui.esm.js",
  "unpkg": "dist/papyrai-ui.min.js",
  "exports": {
    ".": {
      "import": "./dist/papyrai-ui.esm.js",
      "require": "./dist/papyrai-ui.js"
    },
    "./components/*": "./dist/components/*.js",
    "./ai/*": "./dist/components/ai-*.js"
  },
  "files": ["dist/", "README.md", "LICENSE", "FONT_LICENSE"],
  "scripts": {
    "dev": "rollup -c -w",
    "build": "rollup -c",
    "preview": "live-server preview/"
  },
  "keywords": ["web-components", "ui", "paper", "ai", "svg", "lit", "design-system"],
  "devDependencies": {
    "lit": "^3.0.0",
    "rollup": "^4.0.0",
    "@rollup/plugin-node-resolve": "^15.0.0",
    "rollup-plugin-terser": "^7.0.0"
  }
}
```

### 0.3 Rollup 配置

- 输入：`src/index.js`
- 输出：`dist/papyrai-ui.js`（UMD）、`dist/papyrai-ui.esm.js`（ESM）、`dist/papyrai-ui.min.js`（压缩UMD）
- 插件：node-resolve（解析lit）、terser（压缩）

### 0.4 preview/index.html 骨架

- 引用 `../src/index.js`（type="module"）
- 页面列出所有分类链接，点击跳转到各分类HTML
- 顶部放logo SVG
- 包含亮色/暗色切换按钮

### 0.5 LICENSE / FONT_LICENSE / README.md

- LICENSE：MIT协议全文
- FONT_LICENSE：Caveat (OFL) + JetBrains Mono (OFL) + Noto Serif SC (OFL) + 仓耳渔阳体（站酷声明）
- README.md：项目简介、安装、用法，中英双语

**确认点**：`npm run preview` 能打开总览页，所有链接可点击（目标页暂时空白）。

---

## Step 1：Core 样式系统

### 1.1 src/core/tokens.js

导出所有设计token为CSS变量：

**亮色变量**：
- `--paper-white`, `--paper-cream`, `--paper-aged`, `--paper-shadow`, `--paper-border`
- `--ink-black`, `--ink-dark`, `--ink-mid`, `--ink-light`, `--ink-faint`
- `--accent-red`, `--accent-blue`, `--accent-green`, `--accent-amber`
- `--ai-thinking`, `--ai-stream`, `--ai-hallucination`, `--ai-error`
- `--ai-confidence-high`, `--ai-confidence-mid`, `--ai-confidence-low`
- `--font-handwrite`, `--font-serif`, `--font-mono`
- `--elevation-1`, `--elevation-2`, `--elevation-3`
- `--paper-texture`（SVG noise背景）
- `--radius-sm`, `--radius-md`, `--radius-lg`
- `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`

**暗色变量**（`[data-theme="dark"]`）：
- 纸张色 → 深棕/炭黑（`#1a1814`, `#2a2520`, `#3a3530`）
- 墨色 → 反转为浅色（`#e8e0d0`, `#c8c0b0`, `#a89e8c`）
- accent保持但提亮（`#c4453c` → `#e87068`）
- AI色保持但提亮
- 阴影变暗加深
- 纸张纹理调暗

### 1.2 src/core/styles.css

- 全局reset（可选引入）
- @font-face 声明（内嵌字体）
- 纸张纹理背景
- 基础排版样式

### 1.3 src/core/base.js

- Lit基类 `PapyraiElement extends LitElement`
- 所有组件继承这个基类
- 内含共享样式（纸张纹理、阴影、圆角等）

**确认点**：preview/theme.html 展示亮色/暗色切换效果，所有变量正确。

---

## Step 2：AI 专属组件（最高优先级）

> 每做完一个组件，在 preview/ai.html 里加一个演示区块，确认效果后再做下一个。

### 2.1 src/ai/ai-thinking.js

`<ai-thinking>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| model | String | 'AI' | 显示的模型名 |
| speed | String | 'normal' | 动画速度：slow / normal / fast |

- 墨水晕开式骨架屏动画
- 左侧紫色边框标识
- 顶部显示模型名 + 旋转spinner
- 3条渐变色骨架线，脉冲动画
- 墨滴扩散装饰动画

### 2.2 src/ai/ai-stream.js

`<ai-stream>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | String | '' | 要流式展示的文本 |
| speed | Number | 60 | 每字符间隔(ms) |
| cursor | Boolean | true | 是否显示光标 |

- 钢笔书写效果，逐字显示
- 闪烁光标
- 左上角 "streaming" 标签
- 文字完成后光标停留

### 2.3 src/ai/ai-hallucination.js

`<ai-hallucination>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | String | '可能为幻觉内容' | 顶部警告文案 |

- 虚线边框（黄色）
- 右上角大号半透明 "?" 装饰
- 居中斜置 "UNVERIFIED" 水印
- 顶部警告标签（⚠图标）
- slot 接收内容，显示为灰色斜体

### 2.4 src/ai/ai-not-found.js

`<ai-not-found>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| what | String | '' | AI以为存在的资源名（URL、论文、API等） |

- 居中排列
- 资源名用删除线 + 波浪线装饰
- 右上角 "虚构" 印章（带stamp动画）
- 底部说明文案

### 2.5 src/ai/ai-fake-error.js

`<ai-fake-error>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| message | String | 'TypeError: Cannot read properties of undefined' | 假错误信息 |
| delay | Number | 1500 | 揭示真相的延迟(ms) |

- 深色终端背景
- 红色错误信息（带 ✕ 前缀）
- delay后：错误信息上划删除线 + 绿色揭示文案渐入
- 右上角 "ai-fake-error" 标签

### 2.6 src/ai/ai-confidence.js

`<ai-confidence>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | Number | 0 | 0-1之间的置信度 |
| label | String | '' | 标签文案 |

- 横向进度条
- 颜色自动变化：≥0.7绿、≥0.4黄、<0.4红
- 填充动画（从0到目标值）
- 右侧百分比数字

### 2.7 src/ai/ai-diff.js

`<ai-diff>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| before | String | '' | 修改前文本 |
| after | String | '' | 修改后文本 |

- 标题栏：钢笔图标 + "AI 红笔批改"
- before行：红色删除线
- after行：绿色 + 笔标记前缀 + 底部红色下划线装饰

### 2.8 src/ai/ai-cost.js

`<ai-cost>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| tokens | Number | 0 | 当前token数 |
| rate | Number | 0.003 | 每1000 token的费用($) |
| animate | Boolean | false | 是否模拟实时增长 |

- 内联展示：tokens数 · 费用
- animate=true时模拟token实时增长
- 等宽字体

### 2.9 src/ai/ai-model-badge.js

`<ai-model-badge>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| model | String | '' | 模型名称 |

- 根据模型名自动配色：
  - claude → 暖棕
  - gpt → 绿
  - qwen → 蓝
  - gemini → 粉
  - llama → 紫
  - 其他 → 灰
- 内联pill样式，左侧圆点

**确认点**：preview/ai.html 展示全部9个AI组件，亮色+暗色都正常。

---

## Step 3：SVG 体系

> 每做完一个模板，在 preview/svg.html 里加演示，确认效果后做下一个。

### 3.1 src/svg/svg-logo.js

`<svg-logo>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| template | String | 'stamp' | 模板名 |
| text | String | 'AI' | 显示文字 |
| color | String | '#c4453c' | 主色 |
| size | Number | 80 | 尺寸(px) |

模板清单（每个单独调效果）：

| # | 模板名 | 风格 |
|---|--------|------|
| 1 | stamp | 方形双框印章 |
| 2 | seal | 圆形蜡封 |
| 3 | badge | 盾牌徽章 |
| 4 | minimal | 纯文字+下划线 |
| 5 | scroll | 卷轴纸 |
| 6 | ribbon | 缎带横幅 |
| 7 | wax | 滴蜡效果 |
| 8 | corner | 折角书签 |

### 3.2 src/svg/svg-icon.js

`<svg-icon>`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | String | '' | 图标名 |
| size | Number | 24 | 尺寸(px) |
| color | String | 'currentColor' | 颜色 |

图标清单（类纸手绘风格，每个是纯SVG path）：

| # | 图标名 | 用途 |
|---|--------|------|
| 1 | pen | 钢笔/书写 |
| 2 | paper | 纸张 |
| 3 | scroll | 卷轴 |
| 4 | stamp | 印章 |
| 5 | ink | 墨水瓶 |
| 6 | quill | 羽毛笔 |
| 7 | bookmark | 书签 |
| 8 | envelope | 信封 |
| 9 | wax-seal | 蜡封 |
| 10 | paperclip | 回形针 |
| 11 | pin | 图钉 |
| 12 | scissors | 剪刀 |
| 13 | ruler | 尺子 |
| 14 | eraser | 橡皮擦 |
| 15 | magnifier | 放大镜 |
| 16 | check | 勾选 |
| 17 | cross | 叉 |
| 18 | plus | 加 |
| 19 | minus | 减 |
| 20 | arrow-left | 左箭头 |
| 21 | arrow-right | 右箭头 |
| 22 | arrow-up | 上箭头 |
| 23 | arrow-down | 下箭头 |
| 24 | chevron-left | 左折角 |
| 25 | chevron-right | 右折角 |
| 26 | chevron-up | 上折角 |
| 27 | chevron-down | 下折角 |
| 28 | search | 搜索 |
| 29 | settings | 设置齿轮 |
| 30 | user | 用户 |
| 31 | heart | 心 |
| 32 | star | 星 |
| 33 | bell | 铃铛 |
| 34 | calendar | 日历 |
| 35 | clock | 时钟 |
| 36 | upload | 上传 |
| 37 | download | 下载 |
| 38 | copy | 复制 |
| 39 | trash | 删除 |
| 40 | edit | 编辑 |
| 41 | eye | 可见 |
| 42 | eye-off | 不可见 |
| 43 | lock | 锁 |
| 44 | unlock | 解锁 |
| 45 | link | 链接 |
| 46 | external | 外链 |
| 47 | info | 信息 |
| 48 | warning | 警告 |
| 49 | error | 错误 |
| 50 | success | 成功 |

**确认点**：preview/svg.html 展示全部logo模板 × 不同参数 + 全部图标网格。

---

## Step 4：基础组件 — Elements

> 每个组件对应一个文件：`src/components/elements/组件名.js`
> 每做完一个在 preview/elements.html 里加演示。

| # | 文件名 | 标签名 | 说明 |
|---|--------|--------|------|
| 1 | accordion.js | `<p-accordion>` | 折叠面板 |
| 2 | alert.js | `<p-alert>` | 警告提示 |
| 3 | avatar.js | `<p-avatar>` | 头像 |
| 4 | badge.js | `<p-badge>` | 徽标 |
| 5 | button.js | `<p-button>` | 按钮 |
| 6 | select-button.js | `<p-select-button>` | 选择按钮组 |
| 7 | toggle-button.js | `<p-toggle-button>` | 切换按钮 |
| 8 | breadcrumb.js | `<p-breadcrumb>` | 面包屑 |
| 9 | carousel.js | `<p-carousel>` | 轮播 |
| 10 | chat-bubble.js | `<p-chat-bubble>` | 聊天气泡 |
| 11 | divider.js | `<p-divider>` | 分割线 |
| 12 | dropdown.js | `<p-dropdown>` | 下拉菜单 |
| 13 | listbox.js | `<p-listbox>` | 列表框 |
| 14 | indicator.js | `<p-indicator>` | 指示器 |
| 15 | mockup.js | `<p-mockup>` | 设备模型 |
| 16 | panel-splitter.js | `<p-panel-splitter>` | 面板分割 |
| 17 | qr-code.js | `<p-qr-code>` | 二维码 |
| 18 | keyboard-key.js | `<p-keyboard-key>` | 键盘按键 |
| 19 | scroll-bar.js | `<p-scroll-bar>` | 滚动条 |
| 20 | speed-dial.js | `<p-speed-dial>` | 快速拨号 |
| 21 | stack.js | `<p-stack>` | 堆叠布局 |
| 22 | timeline.js | `<p-timeline>` | 时间线 |

---

## Step 5：基础组件 — Inputs

> `src/components/inputs/组件名.js`
> preview/inputs.html

| # | 文件名 | 标签名 | 说明 |
|---|--------|--------|------|
| 1 | auto-complete.js | `<p-auto-complete>` | 自动补全 |
| 2 | color-picker.js | `<p-color-picker>` | 颜色选择器 |
| 3 | input-chips.js | `<p-input-chips>` | 标签输入 |
| 4 | otp-input.js | `<p-otp-input>` | 验证码输入 |
| 5 | date-picker.js | `<p-date-picker>` | 日期选择器 |
| 6 | rich-text-editor.js | `<p-rich-text-editor>` | 富文本编辑器 |
| 7 | input.js | `<p-input>` | 输入框 |
| 8 | input-mask.js | `<p-input-mask>` | 格式化输入 |
| 9 | knob.js | `<p-knob>` | 旋钮 |
| 10 | password-indicator.js | `<p-password-indicator>` | 密码强度 |
| 11 | textarea.js | `<p-textarea>` | 多行输入 |
| 12 | select.js | `<p-select>` | 下拉选择 |
| 13 | swap.js | `<p-swap>` | 切换 |
| 14 | signature-pad.js | `<p-signature-pad>` | 签名板 |
| 15 | checkbox.js | `<p-checkbox>` | 复选框 |
| 16 | radio.js | `<p-radio>` | 单选框 |
| 17 | toggle.js | `<p-toggle>` | 开关 |
| 18 | range.js | `<p-range>` | 范围滑块 |
| 19 | rating.js | `<p-rating>` | 评分 |
| 20 | file-input.js | `<p-file-input>` | 文件上传 |

---

## Step 6：基础组件 — Navigation

> `src/components/navigation/组件名.js`
> preview/navigation.html

| # | 文件名 | 标签名 | 说明 |
|---|--------|--------|------|
| 1 | bottom-tabs.js | `<p-bottom-tabs>` | 底部标签栏 |
| 2 | command-palette.js | `<p-command-palette>` | 命令面板 |
| 3 | dock.js | `<p-dock>` | Dock栏 |
| 4 | pagination.js | `<p-pagination>` | 分页 |
| 5 | progress.js | `<p-progress>` | 进度条 |
| 6 | scroll-spy.js | `<p-scroll-spy>` | 滚动监听 |
| 7 | scroll-top.js | `<p-scroll-top>` | 回到顶部 |
| 8 | steps.js | `<p-steps>` | 步骤条 |
| 9 | tabs.js | `<p-tabs>` | 标签页 |
| 10 | vertical-navigation.js | `<p-vertical-nav>` | 垂直导航 |

---

## Step 7：基础组件 — Overlays

> `src/components/overlays/组件名.js`
> preview/overlays.html

| # | 文件名 | 标签名 | 说明 |
|---|--------|--------|------|
| 1 | modal.js | `<p-modal>` | 模态框 |
| 2 | slideover.js | `<p-slideover>` | 侧滑面板 |
| 3 | popover.js | `<p-popover>` | 弹出框 |
| 4 | tooltip.js | `<p-tooltip>` | 工具提示 |
| 5 | context-menu.js | `<p-context-menu>` | 右键菜单 |
| 6 | toast.js | `<p-toast>` | 消息提示 |
| 7 | tour.js | `<p-tour>` | 引导tour |
| 8 | watermark.js | `<p-watermark>` | 水印 |

---

## Step 8：基础组件 — Layout

> `src/components/layout/组件名.js`
> preview/layout.html

| # | 文件名 | 标签名 | 说明 |
|---|--------|--------|------|
| 1 | card.js | `<p-card>` | 卡片 |
| 2 | container.js | `<p-container>` | 容器 |
| 3 | skeleton.js | `<p-skeleton>` | 骨架屏 |

---

## Step 9：基础组件 — Data

> `src/components/data/组件名.js`
> preview/data.html

| # | 文件名 | 标签名 | 说明 |
|---|--------|--------|------|
| 1 | table.js | `<p-table>` | 表格 |
| 2 | calendar.js | `<p-calendar>` | 日历 |
| 3 | order-list.js | `<p-order-list>` | 排序列表 |
| 4 | tree.js | `<p-tree>` | 树形控件 |
| 5 | pick-list.js | `<p-pick-list>` | 穿梭框 |
| 6 | virtual-scroller.js | `<p-virtual-scroller>` | 虚拟滚动 |

---

## Step 10：构建与发布

### 10.1 Rollup构建

- `npm run build` → 生成 dist/ 下三个文件
- 验证：新建一个空HTML，用 `<script src="dist/papyrai-ui.min.js">` 引入，确认所有组件可用

### 10.2 按需引入构建

- dist/components/ 下每个组件单独一个文件
- 验证：`import 'papyrai-ui/components/ai-thinking'` 只引入单个组件

### 10.3 npm发布

- `npm publish`
- 验证：`npm install papyrai-ui` + `<script src="https://unpkg.com/papyrai-ui">` 能用

### 10.4 VitePress文档站

- docs/ 下搭建VitePress
- 中英双语
- 每个组件一个文档页（说明 + API表 + 在线演示）
- GitHub Pages部署

---

