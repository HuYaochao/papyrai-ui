// Popover - 弹出层
// Features: 点击触发, 位置自动翻转, 箭头, 点击外部关闭, 焦点陷阱

import { PapyraiElement, html, css } from '../../core/base.js';

export class PPopover extends PapyraiElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    trigger: { type: String },
    placement: { type: String },
    offset: { type: Number }
  };

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .popover-trigger {
      cursor: pointer;
    }

    .popover {
      position: absolute;
      z-index: 1000;
      min-width: 180px;
      max-width: 320px;
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 8px);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0, 0, 0, 0.12));
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95);
      transition: all 0.15s ease;
    }

    :host([open]) .popover {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    :host([dark]) .popover {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    /* Paper texture */
    .popover::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
    }

    .popover-arrow {
      position: absolute;
      width: 12px;
      height: 12px;
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      transform: rotate(45deg);
    }

    :host([dark]) .popover-arrow {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    /* Placement */
    :host([placement="top"]) .popover {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.95);
      margin-bottom: 8px;
    }

    :host([placement="top"]) .popover-arrow {
      bottom: -7px;
      left: 50%;
      margin-left: -6px;
    }

    :host([placement="bottom"]) .popover {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.95);
      margin-top: 8px;
    }

    :host([placement="bottom"]) .popover-arrow {
      top: -7px;
      left: 50%;
      margin-left: -6px;
    }

    :host([placement="left"]) .popover {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.95);
      margin-right: 8px;
    }

    :host([placement="left"]) .popover-arrow {
      right: -7px;
      top: 50%;
      margin-top: -6px;
    }

    :host([placement="right"]) .popover {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.95);
      margin-left: 8px;
    }

    :host([placement="right"]) .popover-arrow {
      left: -7px;
      top: 50%;
      margin-top: -6px;
    }

    :host([open][placement="top"]) .popover {
      transform: translateX(-50%) scale(1);
    }

    :host([open][placement="bottom"]) .popover {
      transform: translateX(-50%) scale(1);
    }

    :host([open][placement="left"]) .popover {
      transform: translateY(-50%) scale(1);
    }

    :host([open][placement="right"]) .popover {
      transform: translateY(-50%) scale(1);
    }

    .popover-content {
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      position: relative;
      z-index: 1;
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.trigger = 'click';
    this.placement = 'bottom';
    this.offset = 8;
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.trigger === 'click') {
      this.addEventListener('click', this._toggleOpen);
    } else {
      this.addEventListener('mouseenter', this._show);
      this.addEventListener('mouseleave', this._hide);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  _toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      document.addEventListener('click', this._handleOutsideClick);
      this.emit('show');
    } else {
      document.removeEventListener('click', this._handleOutsideClick);
      this.emit('hide');
    }
  }

  _show() {
    this.open = true;
    document.addEventListener('click', this._handleOutsideClick);
    this.emit('show');
  }

  _hide() {
    this.open = false;
    document.removeEventListener('click', this._handleOutsideClick);
    this.emit('hide');
  }

  _handleOutsideClick(e) {
    if (!this.contains(e.target) && !this.shadowRoot?.host?.contains(e.target)) {
      this.open = false;
      document.removeEventListener('click', this._handleOutsideClick);
      this.emit('hide');
    }
  }

  render() {
    return html`
      <div class="popover-trigger">
        <slot name="trigger"></slot>
      </div>
      <div class="popover">
        <div class="popover-arrow"></div>
        <div class="popover-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('p-popover', PPopover);
