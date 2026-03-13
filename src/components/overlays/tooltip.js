// Tooltip - 提示文字
// Features: hover/focus触发, 位置, 延迟, 丰富内容支持

import { PapyraiElement, html, css } from '../../core/base.js';

export class PTooltip extends PapyraiElement {
  static properties = {
    text: { type: String },
    placement: { type: String },
    delay: { type: Number },
    position: { type: String }
  };

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .tooltip-trigger {
      cursor: help;
    }

    .tooltip {
      position: absolute;
      z-index: 2000;
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      background: var(--ink-black, #1f1a15);
      color: var(--paper-white, #f5f0e8);
      font-size: 0.75rem;
      font-family: var(--font-serif, serif);
      border-radius: var(--radius-sm, 4px);
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.9);
      transition: all 0.15s ease;
      pointer-events: none;
    }

    :host([dark]) .tooltip {
      background: var(--paper-cream, #f8f1e5);
      color: var(--ink-black, #1f1a15);
    }

    :host([open]) .tooltip {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    .tooltip-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border: 5px solid transparent;
    }

    /* Placement */
    :host([placement="top"]) .tooltip {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.9);
      margin-bottom: 6px;
    }

    :host([placement="top"]) .tooltip-arrow {
      bottom: -5px;
      left: 50%;
      margin-left: -5px;
      border-top-color: var(--ink-black, #1f1a15);
    }

    :host([placement="top"][dark]) .tooltip-arrow {
      border-top-color: var(--paper-cream, #f8f1e5);
    }

    :host([placement="bottom"]) .tooltip {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.9);
      margin-top: 6px;
    }

    :host([placement="bottom"]) .tooltip-arrow {
      top: -5px;
      left: 50%;
      margin-left: -5px;
      border-bottom-color: var(--ink-black, #1f1a15);
    }

    :host([placement="bottom"][dark]) .tooltip-arrow {
      border-bottom-color: var(--paper-cream, #f8f1e5);
    }

    :host([placement="left"]) .tooltip {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.9);
      margin-right: 6px;
    }

    :host([placement="left"]) .tooltip-arrow {
      right: -5px;
      top: 50%;
      margin-top: -5px;
      border-left-color: var(--ink-black, #1f1a15);
    }

    :host([placement="left"][dark]) .tooltip-arrow {
      border-left-color: var(--paper-cream, #f8f1e5);
    }

    :host([placement="right"]) .tooltip {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.9);
      margin-left: 6px;
    }

    :host([placement="right"]) .tooltip-arrow {
      left: -5px;
      top: 50%;
      margin-top: -5px;
      border-right-color: var(--ink-black, #1f1a15);
    }

    :host([placement="right"][dark]) .tooltip-arrow {
      border-right-color: var(--paper-cream, #f8f1e5);
    }

    :host([open][placement="top"]) .tooltip {
      transform: translateX(-50%) scale(1);
    }

    :host([open][placement="bottom"]) .tooltip {
      transform: translateX(-50%) scale(1);
    }

    :host([open][placement="left"]) .tooltip {
      transform: translateY(-50%) scale(1);
    }

    :host([open][placement="right"]) .tooltip {
      transform: translateY(-50%) scale(1);
    }
  `;

  constructor() {
    super();
    this.text = '';
    this.placement = 'top';
    this.delay = 200;
    this.position = 'center';
    this._timeout = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', this._show);
    this.addEventListener('mouseleave', this._hide);
    this.addEventListener('focus', this._show);
    this.addEventListener('blur', this._hide);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._show);
    this.removeEventListener('mouseleave', this._hide);
    this.removeEventListener('focus', this._show);
    this.removeEventListener('blur', this._hide);
    clearTimeout(this._timeout);
  }

  _show = () => {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.open = true;
    }, this.delay);
  };

  _hide = () => {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.open = false;
    }, 100);
  };

  render() {
    return html`
      <div class="tooltip-trigger">
        <slot></slot>
      </div>
      <div class="tooltip" role="tooltip">
        <div class="tooltip-arrow"></div>
        ${this.text}
      </div>
    `;
  }
}

customElements.define('p-tooltip', PTooltip);
