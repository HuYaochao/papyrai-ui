# papyrai-ui 项目要点整理

---

## 一、项目定位

**一句话**：第一个为AI应用场景设计的、框架无关的、类纸风格开源UI组件库。

**名称**：papyrai-ui（papyrus + ai + ui，纸莎草纸 × AI）

**三个差异化卖点（按优先级）**：
1. **AI场景专属组件** — 目前所有UI库都没有
2. **SVG优先** — 参数化logo/图标/装饰元素
3. **类纸视觉风格** — 纸张纹理、阴影、手写体

**协议**：MIT

---

## 二、Logo

方案B：印章/蜡封风格。红色圆形印章，辨识度高，缩小后清晰，适合做favicon。

```svg
<svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
  <!-- 外圈 -->
  <circle cx="55" cy="55" r="48" fill="none" stroke="#c4453c" stroke-width="3" opacity="0.8"/>
  <circle cx="55" cy="55" r="42" fill="none" stroke="#c4453c" stroke-width="1.5" opacity="0.4"/>
  <!-- 装饰点 -->
  <circle cx="55" cy="9" r="2.5" fill="#c4453c" opacity="0.6"/>
  <circle cx="55" cy="101" r="2.5" fill="#c4453c" opacity="0.6"/>
  <circle cx="9" cy="55" r="2.5" fill="#c4453c" opacity="0.6"/>
  <circle cx="101" cy="55" r="2.5" fill="#c4453c" opacity="0.6"/>
  <!-- 文字 -->
  <text x="55" y="50" text-anchor="middle" font-family="'Caveat',cursive" font-size="22" font-weight="700" fill="#c4453c">papyr</text>
  <text x="55" y="70" text-anchor="middle" font-family="'Caveat',cursive" font-size="22" font-weight="700" fill="#c4453c">ai</text>
  <!-- 底部小字 -->
  <text x="55" y="86" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="6.5" fill="#c4453c" opacity="0.5">UI COMPONENTS</text>
</svg>
```

暗色版本：将 `#c4453c` 替换为 `#e87068`。

---

## 三、技术选型

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 组件技术 | Web Components | 框架无关，React/Vue/纯HTML都能用 |
| 开发基类 | Lit（6KB） | 省样板代码，产物还是标准WC |
| 构建工具 | Rollup | 专为库设计，产物干净 |
| 文档站 | VitePress | EP同款方案，GitHub Pages部署 |
| 国际化 | 中文 + 英文 | 文档、组件文案双语 |
| 主题 | 亮色 + 暗色 | CSS变量驱动，两套变量值 |

---

## 四、组件清单

**不分版本，全部做完。** AI生成为主，一次性覆盖。

### 4.1 AI专属组件（最高优先级）

| 组件 | 功能 |
|------|------|
| `<ai-thinking>` | AI思考中状态，墨水晕开动画 |
| `<ai-stream>` | 流式输出，钢笔书写效果 |
| `<ai-hallucination>` | 幻觉内容标记（虚线框 + 水印） |
| `<ai-not-found>` | "AI以为有，实际没有" |
| `<ai-fake-error>` | "开发者以为报错了，其实没报错" |
| `<ai-confidence>` | 置信度可视化条 |
| `<ai-diff>` | AI修改前后对比，红笔批改风格 |
| `<ai-cost>` | Token消耗/费用实时显示 |
| `<ai-model-badge>` | 模型标识徽章（自动配色） |

### 4.2 SVG体系

- 参数化logo模板（stamp / seal / badge / minimal等8种，支持中文/emoji）
- 类纸风格图标集（50个）
- AI Prompt → SVG 工作流（提供prompt模板）

### 4.3 基础组件（全部覆盖，不分版本）

**Elements（22个）**
Accordion · Alert · Avatar · Badge · Button · Select Button · Toggle Button · Breadcrumb · Carousel · Chat Bubble · Divider · Dropdown · Listbox · Indicator · Mockup · Panel Splitter · QR Code · Keyboard Key · Scroll Bar · Speed Dial · Stack · Timeline

**Inputs（20个）**
Auto Complete · Color Picker · Input Chips · OTP Input · Date Picker · Rich Text Editor · Input · Input Mask · Knob · Password Indicator · Textarea · Select · Swap · Signature Pad · Checkbox · Radio · Toggle · Range · Rating · File Input

**Navigation（10个）**
Bottom Tabs · Command Palette · Dock · Pagination · Progress · Scroll Spy · Scroll Top · Steps · Tabs · Vertical Navigation

**Overlays（8个）**
Modal · Slideover · Popover · Tooltip · Context Menu · Toast · Tour · Watermark

**Layout（3个）**
Card · Container · Skeleton

**Data（6个）**
Table · Calendar · Order List · Tree · Pick List · Virtual Scroller

**总计：136个**（9 AI + 8 logo模板 + 50 图标 + 69 基础组件）

---

## 五、视觉风格

### 亮色主题（默认）
- 核心隐喻：白纸/信笺
- 纸张纹理背景（SVG noise）
- 纸片悬浮阴影（elevation分级）
- 纸角折叠效果
- 手写体 + 衬线体 + 等宽体

### 暗色主题
- 核心隐喻：黑卡纸/深色牛皮纸
- CSS变量切换，同一套组件自动适配
- `<html data-theme="dark">` 触发

### 主题系统
- 全部用CSS变量驱动
- 用户可覆盖任何变量值自定义主题

---

## 六、字体方案

| 用途 | 默认字体 | 协议 | 商用 |
|------|----------|------|------|
| 英文手写/标题 | Caveat | OFL | ✅ |
| 英文等宽/代码 | JetBrains Mono | OFL | ✅ |
| 中文正文（默认） | Noto Serif SC | OFL | ✅ |
| 中文正文（可选） | 仓耳渔阳体 W01-W05 | 站酷免费商用声明 | ✅ |

**打包策略**：
- 英文字体内嵌核心包（~200KB）
- 中文字体独立可选包（需子集化）
- CSS变量可覆盖，用户可换任意字体
- 附 FONT_LICENSE 文件

**仓耳渔阳体限制**：不能改名、不能单独卖字体。

---

## 七、包结构与分发

```
papyrai-ui/
├── 01-papyrai-ui-项目要点整理.md    ← 本文档
├── 02-papyrai-ui-开发步骤条.md      ← 开发执行清单
├── package.json
├── README.md
├── LICENSE（MIT）
├── FONT_LICENSE
├── CHANGELOG.md
├── rollup.config.js
│
├── src/                              ← 源码
│   ├── core/                         ← CSS变量、纸张纹理、基础样式、暗色主题
│   ├── ai/                           ← AI专属组件（最高优先级）
│   ├── svg/                          ← SVG logo模板 + 图标
│   ├── components/                   ← 基础UI组件
│   │   ├── elements/
│   │   ├── inputs/
│   │   ├── navigation/
│   │   ├── overlays/
│   │   ├── layout/
│   │   └── data/
│   ├── fonts/                        ← 内嵌字体文件
│   └── index.js                      ← 全量导出
│
├── dist/                             ← 构建产物
│   ├── papyrai-ui.js
│   ├── papyrai-ui.min.js
│   └── components/                   ← 按需引入
│
├── preview/                          ← 开发时实时预览
│   ├── index.html                    ← 总览页，链接到各分类
│   ├── ai.html                       ← AI专属组件演示
│   ├── svg.html                      ← SVG logo/图标演示
│   ├── elements.html                 ← Elements类组件演示
│   ├── inputs.html                   ← Inputs类组件演示
│   ├── navigation.html               ← Navigation类组件演示
│   ├── overlays.html                 ← Overlays类组件演示
│   ├── layout.html                   ← Layout类组件演示
│   ├── data.html                     ← Data类组件演示
│   └── theme.html                    ← 亮色/暗色主题切换演示
│
├── docs/                             ← VitePress文档站（GitHub Pages部署）
│   ├── .vitepress/
│   ├── zh/
│   └── en/
│
└── examples/                         ← 用户使用示例
```

**preview/ 说明**：
- 开发时用 `npm run preview`（即 `live-server preview/`）打开
- 每个HTML直接引用 `../src/` 源码，不需要构建
- 写一个组件就在对应HTML里加演示，实时看效果
- 不发布到npm，仅开发用

**三种用法（用户侧）**：
```bash
npm install papyrai-ui
```
```js
import 'papyrai-ui'                          // 全量
import 'papyrai-ui/components/ai-thinking'   // 按需
```
```html
<script src="https://unpkg.com/papyrai-ui"></script>  <!-- CDN -->
```
