// Select Button - 纸张风格按钮组（单选组）
// 属性: value(String), disabled(Boolean), size(String: 'sm'|'md'|'lg')
// 插槽: default(按钮项，需要多个p-select-button元素)
// 事件: change({value})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PSelectButton extends PapyraiElement {
  static properties = {
    value: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    size: { type: String, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    :host([size="sm"]) {
      --btn-padding: var(--spacing-xs, 4px) var(--spacing-sm, 10px);
      --btn-font-size: 0.85rem;
    }

    :host([size="md"]) {
      --btn-padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      --btn-font-size: 0.95rem;
    }

    :host([size="lg"]) {
      --btn-padding: var(--spacing-md, 12px) var(--spacing-lg, 24px);
      --btn-font-size: 1.05rem;
    }

    .button-group {
      display: inline-flex;
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      overflow: hidden;
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      background: var(--paper-cream, #f8f1e5);
    }

    :host([disabled]) .button-group {
      opacity: 0.55;
      pointer-events: none;
    }

    /* Individual buttons */
    ::slotted(p-select-button) {
      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      margin: 0 !important;
    }

    ::slotted(p-select-button:not(:first-child)) {
      border-left: 1.5px solid var(--paper-border, #d9ccb8) !important;
    }

    ::slotted(p-select-button:hover:not([disabled])) {
      background: var(--paper-highlight, rgba(196,69,60,0.08)) !important;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.disabled = false;
    this.size = 'md';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
    this.addEventListener('change', this._handleChildChange);
  }

  disconnectedCallback() {
    this.removeEventListener('change', this._handleChildChange);
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._syncSelected();
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this._syncSelected();
    }
  }

  _syncSelected() {
    const buttons = this._getButtons();
    buttons.forEach(btn => {
      btn.active = btn.value === this.value;
    });
  }

  _getButtons() {
    return Array.from(this.querySelectorAll('p-select-button'));
  }

  _handleChildChange = (e) => {
    if (this.disabled) return;
    const target = e.composedPath()[0];
    if (target && target.value !== undefined) {
      this.value = target.value;
      this._syncSelected();
      this.emit('change', { value: this.value });
    }
  };

  render() {
    return html`<div class="button-group"><slot></slot></div>`;
  }
}

customElements.define('p-select-button', PSelectButton);
