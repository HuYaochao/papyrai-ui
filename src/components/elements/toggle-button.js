// Toggle Button - 纸张风格切换按钮
// 属性: pressed(Boolean), disabled(Boolean), size(String: 'sm'|'md'|'lg')
// 插槽: off-icon(未按下图标), on-icon(按下图标), default(内容)
// 事件: change({pressed, value})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PToggleButton extends PapyraiElement {
  static properties = {
    pressed: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    value: { type: String }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    .toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs, 6px);
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
    }

    .toggle::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
      pointer-events: none;
    }

    .toggle:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    .toggle:active:not(:disabled) {
      transform: translateY(0);
    }

    /* Sizes */
    :host([size="sm"]) .toggle {
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 10px);
      font-size: 0.85rem;
      border-radius: var(--radius-sm, 6px);
    }

    :host([size="lg"]) .toggle {
      padding: var(--spacing-md, 12px) var(--spacing-lg, 24px);
      font-size: 1.05rem;
      border-radius: var(--radius-lg, 14px);
    }

    /* Pressed state */
    :host([pressed]) .toggle {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
      color: #fff;
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    /* Disabled */
    .toggle:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Icons */
    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    :host([size="sm"]) .icon {
      width: 14px;
      height: 14px;
    }

    :host([size="lg"]) .icon {
      width: 22px;
      height: 22px;
    }

    .icon svg {
      width: 100%;
      height: 100%;
      stroke: currentColor;
      stroke-width: 1.5;
      fill: none;
    }

    .icon.hidden {
      display: none;
    }

    /* Focus */
    .toggle:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: 2px;
    }
  `;

  constructor() {
    super();
    this.pressed = false;
    this.disabled = false;
    this.size = 'md';
    this.value = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'switch');
    this.setAttribute('aria-checked', this.pressed);
    this.addEventListener('click', this._toggle);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._toggle);
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('pressed')) {
      this.setAttribute('aria-checked', this.pressed);
    }
  }

  _toggle = () => {
    if (this.disabled) return;
    this.pressed = !this.pressed;
    this.emit('change', { pressed: this.pressed, value: this.value });
  };

  _handleKeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._toggle();
    }
  };

  render() {
    return html`
      <span class="toggle">
        <span class="icon ${this.pressed ? 'hidden' : ''}">
          <slot name="off-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </slot>
        </span>
        <span class="icon ${this.pressed ? '' : 'hidden'}">
          <slot name="on-icon">
            <svg viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </slot>
        </span>
        <slot></slot>
      </span>
    `;
  }
}

customElements.define('p-toggle-button', PToggleButton);
