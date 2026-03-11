// PapyraiIcon - 单个图标基础组件
// 用于创建独立图标，通过 svg 属性传入 SVG 内容

import { PapyraiElement, html, css } from '../core/base.js';

export class PapyraiIcon extends PapyraiElement {
  static properties = {
    size: { type: Number, reflect: true },
    color: { type: String, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      contain: layout style;
    }

    svg {
      display: block;
      width: var(--icon-size, 24px);
      height: var(--icon-size, 24px);
      stroke: var(--icon-color, var(--ink-black, #1a1612));
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      flex-shrink: 0;
    }

    :host([size]) {
      --icon-size: var(--size);
    }
  `;

  constructor() {
    super();
    this.size = 24;
    this.color = '';
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.color) {
      this.style.setProperty('--icon-color', this.color);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('color') && this.color) {
      this.style.setProperty('--icon-color', this.color);
    }
  }

  render() {
    return html`<svg viewBox="0 0 24 24"><slot></slot></svg>`;
  }
}

customElements.define('papyrai-icon', PapyraiIcon);
