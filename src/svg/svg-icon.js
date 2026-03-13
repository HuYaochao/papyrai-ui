// SVG Icon - 50个类纸风格图标
// 属性: name(String), size(Number), color(String)
// 修复: 使用 unsafeSVG 替代破损的 ${a()} ElementPart 注入

import { PapyraiElement, svg, css } from '../core/base.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

export class SVGIcon extends PapyraiElement {
  static properties = {
    name: { type: String, reflect: true },
    size: { type: Number, reflect: true },
    color: { type: String, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      contain: layout style;
      min-width: 1em;
      min-height: 1em;
      color: var(--icon-color, currentColor);
    }

    svg {
      display: block;
      flex-shrink: 0;
      overflow: visible;
    }
  `;

  constructor() {
    super();
    this.name = '';
    this.size = 24;
    this.color = ''; // 默认空字符串 → 使用 currentColor 继承 CSS color
  }

  render() {
    const strokeColor = this.color || 'currentColor';
    const inner = this._getIconPaths((this.name || '').trim());
    return svg`<svg
      width="${this.size}"
      height="${this.size}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="${strokeColor}"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >${unsafeSVG(inner)}</svg>`;
  }

  _getIconPaths(name) {
    const paths = {
      /* ── 纸张 & 书写工具 ── */
      pen: `<path d="M4 20L20 4"/><path d="M20 4l-2 2 2 2 2-2-2-2z"/><path d="M4 20l4-4"/>`,
      paper: `<path d="M6 2h10l4 4v14H4V2z"/><path d="M6 2v18"/><line x1="9" y1="7" x2="17" y2="7"/><line x1="9" y1="11" x2="17" y2="11"/><line x1="9" y1="15" x2="14" y2="15"/>`,
      scroll: `<path d="M5 8h14v8H5z"/><circle cx="5" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="14" x2="16" y2="14"/>`,
      stamp: `<path d="M5 14h14v5H5z"/><path d="M9 14V9h6v5"/><path d="M12 9V5h2v4"/><path d="M7 11h10v2H7z"/>`,
      ink: `<line x1="12" y1="2" x2="12" y2="10"/><circle cx="12" cy="15" r="3.5"/>`,
      quill: `<path d="M8 19L20 5"/><path d="M20 5l-1 1 2 2 1-1-2-2z"/><path d="M8 19l3-3"/><path d="M11 16l2-2"/>`,
      bookmark: `<path d="M6 2h12v20l-6-4-6 4z"/>`,
      envelope: `<path d="M2 6h20v12H2z"/><path d="M2 8l10 6 10-6"/>`,
      'wax-seal': `<circle cx="12" cy="12" r="9"/><path d="M12 6v2M12 16v2M6 12h2M16 12h2"/><circle cx="12" cy="12" r="4"/>`,
      paperclip: `<path d="M9 4v14a3 3 0 006 0V8"/><path d="M13 8v10a3 3 0 006 0V4"/>`,
      pin: `<path d="M12 2v6l6 6v4h-4l-2-2H8l-2 2H2v-4l6-6V2a2 2 0 0 1 4 0z"/><circle cx="12" cy="10" r="2.5"/>`,
      scissors: `<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>`,
      ruler: `<path d="M21.21 15.89A1 1 0 0 0 22 15V6a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 17 1H8a1 1 0 0 0-.71.29l-4 4A1 1 0 0 0 3 6v9a1 1 0 0 0 .79.98L17 21l4.21-4.11zM7 4l3 3M11 4l3 3M15 4l3 3"/>`,
      eraser: `<path d="M7 21h10l4-4-8-8-8 8 4 4z"/><path d="M11 17l-4-4"/><path d="M17 11l-4 4"/>`,

      /* ── 基础操作 ── */
      magnifier: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
      check: `<polyline points="20 6 9 17 4 12"/>`,
      cross: `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
      plus: `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
      minus: `<line x1="5" y1="12" x2="19" y2="12"/>`,
      'arrow-left': `<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>`,
      'arrow-right': `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,
      'arrow-up': `<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>`,
      'arrow-down': `<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>`,
      'chevron-left': `<polyline points="15 18 9 12 15 6"/>`,
      'chevron-right': `<polyline points="9 18 15 12 9 6"/>`,
      'chevron-up': `<polyline points="18 15 12 9 6 15"/>`,
      'chevron-down': `<polyline points="6 9 12 15 18 9"/>`,
      search: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
      settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
      user: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,

      /* ── 内容 & 文件 ── */
      heart: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`,
      star: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
      bell: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`,
      calendar: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
      clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
      upload: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>`,
      download: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
      copy: `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`,
      trash: `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>`,
      edit: `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
      eye: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
      'eye-off': `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`,
      lock: `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
      unlock: `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>`,
      link: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
      external: `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>`,

      /* ── 状态 & 通知 ── */
      info: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>`,
      warning: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
      error: `<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>`,
      success: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,

      /* ── 布局 & 导航 ── */
      home: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
      menu: `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`,
      grid: `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>`,
      stack: `<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>`,
      file: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`,
      folder: `<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>`,
      tag: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>`,
      'more-horizontal': `<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>`,
      'more-vertical': `<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>`,
    };

    return paths[name] || '';
  }
}

customElements.define('svg-icon', SVGIcon);
