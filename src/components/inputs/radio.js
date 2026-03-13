// Radio - 纸张风格单选按钮
// 属性: checked(Boolean), disabled(Boolean), value(String), name(String),
//       label(String), size(String: 'sm'|'md'|'lg')
// 事件: change({checked, value})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PRadio extends PapyraiElement {
  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    value: { type: String },
    name: { type: String },
    label: { type: String },
    size: { type: String, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    .radio-wrapper {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      cursor: pointer;
    }

    :host([disabled]) .radio-wrapper {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .radio {
      position: relative;
      width: 20px;
      height: 20px;
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: 50%;
      background: var(--paper-white, #fffef8);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .radio-wrapper:hover:not([disabled]) .radio {
      border-color: var(--accent-red, #c4453c);
    }

    :host([checked]) .radio {
      border-color: var(--accent-red, #c4453c);
    }

    .radio-inner {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-red, #c4453c);
      transform: scale(0);
      transition: transform 0.2s ease;
    }

    :host([checked]) .radio-inner {
      transform: scale(1);
    }

    /* Sizes */
    :host([size="sm"]) .radio {
      width: 16px;
      height: 16px;
    }

    :host([size="sm"]) .radio-inner {
      width: 8px;
      height: 8px;
    }

    :host([size="lg"]) .radio {
      width: 24px;
      height: 24px;
    }

    :host([size="lg"]) .radio-inner {
      width: 12px;
      height: 12px;
    }

    .label {
      font-family: var(--font-serif, serif);
      font-size: 0.95rem;
      color: var(--ink-black, #1f1a15);
      user-select: none;
    }

    :host([disabled]) .label {
      color: var(--ink-faint, #999);
    }

    /* Focus */
    .radio-wrapper:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: 2px;
    }
  `;

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.value = '';
    this.name = '';
    this.label = '';
    this.size = 'md';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radio');
    this.setAttribute('aria-checked', this.checked);
    this.addEventListener('click', this._select);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._select);
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', this.checked);
    }
  }

  _select = () => {
    if (this.disabled || this.checked) return;
    if (this.name) {
      document.querySelectorAll(`p-radio[name="${this.name}"]`).forEach(radio => {
        if (radio !== this) {
          radio.checked = false;
        }
      });
    }
    this.checked = true;
    this.emit('change', { checked: this.checked, value: this.value });
  };

  _handleKeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._select();
    }
  };

  render() {
    return html`
      <span class="radio-wrapper" tabindex="0">
        <span class="radio">
          <span class="radio-inner"></span>
        </span>
        ${this.label ? html`<span class="label">${this.label}</span>` : ''}
      </span>
    `;
  }
}

customElements.define('p-radio', PRadio);
