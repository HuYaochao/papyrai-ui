// SVG Icon - 50个类纸风格图标
// 属性: name(String), size(Number), color(String)
// 使用 svg 模板标签确保 SVG 元素在正确命名空间

import { PapyraiElement, svg, css } from '../core/base.js';

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
      color: var(--icon-color, var(--ink-black));
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
    this.color = '#1a1612'; // 默认使用 ink-black 颜色，确保可见
  }

  render() {
    const name = (this.name || '').trim();
    return this._getIcon(name) || svg`<svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none"></svg>`;
  }

  _getIcon(name) {
    const { size: s, color: c } = this;
    // 如果 color 为空，使用 stroke="currentColor"，否则使用指定颜色
    const strokeColor = c || 'currentColor';
    const attrs = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: strokeColor, 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    const a = (attrs2 = {}) => Object.entries({ ...attrs, ...attrs2 }).map(([k, v]) => `${k}="${v}"`).join(' ');

    const icons = {
      /* 基础图标 - 纯线稿、不糊成一块，缺失的用简单 path 保证必现 */
      pen: svg`<svg ${a()}><path d="M4 20L20 4"/><path d="M20 4l-2 2 2 2 2-2-2-2z" fill="none"/><path d="M4 20l4-4"/></svg>`,
      paper: svg`<svg ${a()}><path d="M6 2h10l4 4v14H4V2z" fill="none"/><path d="M6 2v18"/><line x1="9" y1="7" x2="17" y2="7"/><line x1="9" y1="11" x2="17" y2="11"/><line x1="9" y1="15" x2="14" y2="15"/></svg>`,
      scroll: svg`<svg ${a()}><path d="M5 8h14v8H5z" fill="none"/><circle cx="5" cy="12" r="2" fill="none"/><circle cx="19" cy="12" r="2" fill="none"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="14" x2="16" y2="14"/></svg>`,
      stamp: svg`<svg ${a()}><path d="M5 14h14v5H5z" fill="none"/><path d="M9 14V9h6v5" fill="none"/><path d="M12 9V5h2v4" fill="none"/><path d="M7 11h10v2H7z" fill="none"/></svg>`,
      ink: svg`<svg ${a()}><line x1="12" y1="2" x2="12" y2="10"/><circle cx="12" cy="15" r="3.5" fill="none"/></svg>`,
      quill: svg`<svg ${a()}><path d="M8 19L20 5" fill="none"/><path d="M20 5l-1 1 2 2 1-1-2-2z" fill="none"/><path d="M8 19l3-3"/><path d="M11 16l2-2"/></svg>`,
      bookmark: svg`<svg ${a()}><path d="M6 2h12v20l-6-4-6 4z" fill="none"/></svg>`,
      envelope: svg`<svg ${a()}><path d="M2 6h20v12H2z" fill="none"/><path d="M2 8l10 6 10-6" fill="none"/></svg>`,
      'wax-seal': svg`<svg ${a()}><circle cx="12" cy="12" r="9" fill="none"/><path d="M12 6v2M12 16v2M6 12h2M16 12h2" fill="none"/><circle cx="12" cy="12" r="4" fill="none"/></svg>`,
      paperclip: svg`<svg ${a()}><path d="M9 4v14a3 3 0 006 0V8" fill="none"/><path d="M13 8v10a3 3 0 006 0V4" fill="none"/></svg>`,
      pin: svg`<svg ${a()}><path d="M12 2v6l6 6v4h-4l-2-2H8l-2 2H2v-4l6-6V2a2 2 0 0 1 4 0z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
      scissors: svg`<svg ${a()}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
      ruler: svg`<svg ${a()}><path d="M21.21 15.89A1 1 0 0 0 22 15V6a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 17 1H8a1 1 0 0 0-.71.29l-4 4A1 1 0 0 0 3 6v9a1 1 0 0 0 .79.98L17 21l4.21-4.11zM7 4l3 3M11 4l3 3M15 4l3 3"/></svg>`,
      eraser: svg`<svg ${a()}><path d="M7 21h10l4-4-8-8-8 8 4 4z"/><path d="M11 17l-4-4"/><path d="M17 11l-4 4"/></svg>`,
      magnifier: svg`<svg ${a()}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      check: svg`<svg ${a()}><polyline points="20 6 9 17 4 12"/></svg>`,
      cross: svg`<svg ${a()}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      plus: svg`<svg ${a()}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
      minus: svg`<svg ${a()}><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
      'arrow-left': svg`<svg ${a()}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
      'arrow-right': svg`<svg ${a()}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
      'arrow-up': svg`<svg ${a()}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
      'arrow-down': svg`<svg ${a()}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`,
      'chevron-left': svg`<svg ${a()}><polyline points="15 18 9 12 15 6"/></svg>`,
      'chevron-right': svg`<svg ${a()}><polyline points="9 18 15 12 9 6"/></svg>`,
      'chevron-up': svg`<svg ${a()}><polyline points="18 15 12 9 6 15"/></svg>`,
      'chevron-down': svg`<svg ${a()}><polyline points="6 9 12 15 18 9"/></svg>`,
      search: svg`<svg ${a()}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      settings: svg`<svg ${a()}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      user: svg`<svg ${a()}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      heart: svg`<svg ${a()}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      star: svg`<svg ${a()}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      bell: svg`<svg ${a()}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
      calendar: svg`<svg ${a()}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      clock: svg`<svg ${a()}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      upload: svg`<svg ${a()}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
      download: svg`<svg ${a()}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
      copy: svg`<svg ${a()}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
      trash: svg`<svg ${a()}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
      edit: svg`<svg ${a()}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
      eye: svg`<svg ${a()}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
      'eye-off': svg`<svg ${a()}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
      lock: svg`<svg ${a()}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      unlock: svg`<svg ${a()}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
      link: svg`<svg ${a()}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
      external: svg`<svg ${a()}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
      info: svg`<svg ${a()}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
      warning: svg`<svg ${a()}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      error: svg`<svg ${a()}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      success: svg`<svg ${a()}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    };

    return icons[name] || null;
  }
}

customElements.define('svg-icon', SVGIcon);
