// IconUndo - 撤销
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUndo extends PapyraiIcon {
  render() { return html`<path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>`; }
}
customElements.define('icon-undo', IconUndo);

// IconRedo - 重做
import { PapyraiIcon } from './papyrai-icon.js';
export class IconRedo extends PapyraiIcon {
  render() { return html`<path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>`; }
}
customElements.define('icon-redo', IconRedo);

// IconRotateCcw - 逆时针旋转
import { PapyraiIcon } from './papyrai-icon.js';
export class IconRotateCcw extends PapyraiIcon {
  render() { return html`<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>`; }
}
customElements.define('icon-rotate-ccw', IconRotateCcw);

// IconRotateCw - 顺时针旋转
import { PapyraiIcon } from './papyrai-icon.js';
export class IconRotateCw extends PapyraiIcon {
  render() { return html`<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>`; }
}
customElements.define('icon-rotate-cw', IconRotateCw);

// IconCornerUpLeft - 左上角
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCornerUpLeft extends PapyraiIcon {
  render() { return html`<polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>`; }
}
customElements.define('icon-corner-up-left', IconCornerUpLeft);

// IconCornerUpRight - 右上角
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCornerUpRight extends PapyraiIcon {
  render() { return html`<polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>`; }
}
customElements.define('icon-corner-up-right', IconCornerUpRight);

// IconCornerDownLeft - 左下角
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCornerDownLeft extends PapyraiIcon {
  render() { return html`<polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path>`; }
}
customElements.define('icon-corner-down-left', IconCornerDownLeft);

// IconCornerDownRight - 右下角
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCornerDownRight extends PapyraiIcon {
  render() { return html`<polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>`; }
}
customElements.define('icon-corner-down-right', IconCornerDownRight);

// IconMove - 移动
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMove extends PapyraiIcon {
  render() { return html`<polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="15 19 12 22 9 19"></polyline><polyline points="19 9 22 12 19 15"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line>`; }
}
customElements.define('icon-move', IconMove);

// IconMaximize - 最大化
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMaximize extends PapyraiIcon {
  render() { return html`<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>`; }
}
customElements.define('icon-maximize', IconMaximize);

// IconMinimize - 最小化
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMinimize extends PapyraiIcon {
  render() { return html`<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>`; }
}
customElements.define('icon-minimize', IconMinimize);

// IconCopy - 复制
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCopy extends PapyraiIcon {
  render() { return html`<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>`; }
}
customElements.define('icon-copy', IconCopy);

// IconClipboard - 剪贴板
import { PapyraiIcon } from './papyrai-icon.js';
export class IconClipboard extends PapyraiIcon {
  render() { return html`<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>`; }
}
customElements.define('icon-clipboard', IconClipboard);

// IconScissorsDashed - 虚线剪刀
import { PapyraiIcon } from './papyrai-icon.js';
export class IconScissorsDashed extends PapyraiIcon {
  render() { return html`<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88" stroke-dasharray="2 2"></line><line x1="14.47" y1="14.48" x2="20" y2="20" stroke-dasharray="2 2"></line><line x1="8.12" y1="8.12" x2="12" y2="12" stroke-dasharray="2 2"></line>`; }
}
customElements.define('icon-scissors-dashed', IconScissorsDashed);

// IconFold - 折叠
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFold extends PapyraiIcon {
  render() { return html`<polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line>`; }
}
customElements.define('icon-fold', IconFold);

// IconUnfold - 展开
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUnfold extends PapyraiIcon {
  render() { return html`<polyline points="4 10 4 4 10 4"></polyline><polyline points="20 14 20 20 14 20"></polyline><line x1="14" y1="4" x2="3" y2="15"></line><line x1="10" y1="20" x2="21" y2="9"></line>`; }
}
customElements.define('icon-unfold', IconUnfold);

// IconFocus - 焦点
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFocus extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="12" r="3"></circle><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>`; }
}
customElements.define('icon-focus', IconFocus);

// IconLayers - 图层
import { PapyraiIcon } from './papyrai-icon.js';
export class IconLayers extends PapyraiIcon {
  render() { return html`<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>`; }
}
customElements.define('icon-layers', IconLayers);

// IconGrid - 网格
import { PapyraiIcon } from './papyrai-icon.js';
export class IconGrid extends PapyraiIcon {
  render() { return html`<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>`; }
}
customElements.define('icon-grid', IconGrid);

// IconList - 列表
import { PapyraiIcon } from './papyrai-icon.js';
export class IconList extends PapyraiIcon {
  render() { return html`<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>`; }
}
customElements.define('icon-list', IconList);

// IconAlignLeft - 左对齐
import { PapyraiIcon } from './papyrai-icon.js';
export class IconAlignLeft extends PapyraiIcon {
  render() { return html`<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>`; }
}
customElements.define('icon-align-left', IconAlignLeft);

// IconAlignCenter - 居中
import { PapyraiIcon } from './papyrai-icon.js';
export class IconAlignCenter extends PapyraiIcon {
  render() { return html`<line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line>`; }
}
customElements.define('icon-align-center', IconAlignCenter);

// IconAlignRight - 右对齐
import { PapyraiIcon } from './papyrai-icon.js';
export class IconAlignRight extends PapyraiIcon {
  render() { return html`<line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line>`; }
}
customElements.define('icon-align-right', IconAlignRight);

// IconAlignJustify - 两端对齐
import { PapyraiIcon } from './papyrai-icon.js';
export class IconAlignJustify extends PapyraiIcon {
  render() { return html`<line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>`; }
}
customElements.define('icon-align-justify', IconAlignJustify);

// IconBold - 粗体
import { PapyraiIcon } from './papyrai-icon.js';
export class IconBold extends PapyraiIcon {
  render() { return html`<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>`; }
}
customElements.define('icon-bold', IconBold);

// IconItalic - 斜体
import { PapyraiIcon } from './papyrai-icon.js';
export class IconItalic extends PapyraiIcon {
  render() { return html`<line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line>`; }
}
customElements.define('icon-italic', IconItalic);

// IconUnderline - 下划线
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUnderline extends PapyraiIcon {
  render() { return html`<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line>`; }
}
customElements.define('icon-underline', IconUnderline);

// IconStrikethrough - 删除线
import { PapyraiIcon } from './papyrai-icon.js';
export class IconStrikethrough extends PapyraiIcon {
  render() { return html`<path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 3.6 3.9h.2"></path><path d="M4 12h16"></path><path d="M7.5 16.1c.7.7 1.7 1 2.5 1 2.5 0 4.5-2.1 4.5-4.5 0-.6-.1-1.1-.3-1.6"></path>`; }
}
customElements.define('icon-strikethrough', IconStrikethrough);

// IconType - 文本
import { PapyraiIcon } from './papyrai-icon.js';
export class IconType extends PapyraiIcon {
  render() { return html`<polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line>`; }
}
customElements.define('icon-type', IconType);

// IconHighlighter - 高亮
import { PapyraiIcon } from './papyrai-icon.js';
export class IconHighlighter extends PapyraiIcon {
  render() { return html`<path d="M9 11l-6 6v3h9l3-3"></path><path d="M22 12l-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"></path>`; }
}
customElements.define('icon-highlighter', IconHighlighter);

// IconPenTool - 钢笔工具
import { PapyraiIcon } from './papyrai-icon.js';
export class IconPenTool extends PapyraiIcon {
  render() { return html`<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>`; }
}
customElements.define('icon-pen-tool', IconPenTool);

// IconEraserTool - 橡皮工具
import { PapyraiIcon } from './papyrai-icon.js';
export class IconEraserTool extends PapyraiIcon {
  render() { return html`<path d="M20 20H7L3 16a1 1 0 0 1 0-1.4l9.9-9.9a1 1 0 0 1 1.4 0l5.3 5.3a1 1 0 0 1 0 1.4L16 15"></path>`; }
}
customElements.define('icon-eraser-tool', IconEraserTool);

// IconHand - 手型
import { PapyraiIcon } from './papyrai-icon.js';
export class IconHand extends PapyraiIcon {
  render() { return html`<path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>`; }
}
customElements.define('icon-hand', IconHand);

// IconGrab - 抓取
import { PapyraiIcon } from './papyrai-icon.js';
export class IconGrab extends PapyraiIcon {
  render() { return html`<path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>`; }
}
customElements.define('icon-grab', IconGrab);

// IconZoomIn - 放大
import { PapyraiIcon } from './papyrai-icon.js';
export class IconZoomIn extends PapyraiIcon {
  render() { return html`<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>`; }
}
customElements.define('icon-zoom-in', IconZoomIn);

// IconZoomOut - 缩小
import { PapyraiIcon } from './papyrai-icon.js';
export class IconZoomOut extends PapyraiIcon {
  render() { return html`<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line>`; }
}
customElements.define('icon-zoom-out', IconZoomOut);

// IconMouse - 鼠标
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMouse extends PapyraiIcon {
  render() { return html`<rect x="6" y="2" width="12" height="20" rx="6"></rect><line x1="12" y1="18" x2="12" y2="18"></line>`; }
}
customElements.define('icon-mouse', IconMouse);
