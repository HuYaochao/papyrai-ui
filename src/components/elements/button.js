// Button - 纸张风格按钮组件
// 属性: variant(String: 'default'|'primary'|'danger'|'ghost'), size(String: 'sm'|'md'|'lg'), 
//       loading(Boolean), disabled(Boolean), type(String: 'button'|'submit'|'reset')
// 插槽: icon(图标), default(内容)

import { PapyraiElement, html, css } from '../../core/base.js';

export class PButton extends PapyraiElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    loading: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    type: { type: String },
    block: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    :host([block]) {
      width: 100%;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs, 6px);
      width: 100%;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      background: var(--paper-cream, #f8f1e5);
      color: var(--ink-black, #1f1a15);
      font-family: var(--font-serif, serif);
      font-size: 0.95rem;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      position: relative;
      overflow: hidden;
    }

    .button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
      pointer-events: none;
    }

    .button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    .button:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
    }

    /* Sizes */
    :host([size="sm"]) .button {
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 10px);
      font-size: 0.85rem;
      border-radius: var(--radius-sm, 6px);
    }

    :host([size="lg"]) .button {
      padding: var(--spacing-md, 12px) var(--spacing-lg, 24px);
      font-size: 1.05rem;
      border-radius: var(--radius-lg, 14px);
    }

    /* Variants */
    :host([variant="primary"]) .button {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
      color: #fff;
    }

    :host([variant="danger"]) .button {
      background: var(--status-error, #dc2626);
      border-color: var(--status-error, #dc2626);
      color: #fff;
    }

    :host([variant="ghost"]) .button {
      background: transparent;
      border-color: transparent;
      box-shadow: none;
    }

    :host([variant="ghost"]) .button:hover:not(:disabled) {
      background: var(--paper-cream, rgba(248,241,229,0.5));
      box-shadow: none;
    }

    /* Disabled */
    .button:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Loading */
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    :host([size="sm"]) .spinner {
      width: 12px;
      height: 12px;
    }

    :host([size="lg"]) .spinner {
      width: 20px;
      height: 20px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Icon slot */
    ::slotted(svg) {
      width: 18px;
      height: 18px;
      stroke: currentColor;
      stroke-width: 1.5;
      fill: none;
    }

    :host([size="sm"]) ::slotted(svg) {
      width: 14px;
      height: 14px;
    }

    :host([size="lg"]) ::slotted(svg) {
      width: 22px;
      height: 22px;
    }

    /* Focus */
    .button:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: 2px;
    }
  `;

  constructor() {
    super();
    this.variant = 'default';
    this.size = 'md';
    this.loading = false;
    this.disabled = false;
    this.type = 'button';
    this.block = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _handleKeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.loading && !this.disabled) {
        this.click();
      }
    }
  };

  render() {
    return html`
      <button 
        class="button"
        type="${this.type}"
        ?disabled="${this.disabled || this.loading}"
        aria-busy="${this.loading}"
      >
        ${this.loading 
          ? html`<span class="spinner"></span>` 
          : html`<slot name="icon"></slot>`
        }
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('p-button', PButton);
