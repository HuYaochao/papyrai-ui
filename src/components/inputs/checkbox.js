// Checkbox - 纸张风格复选框
// 属性: checked(Boolean), indeterminate(Boolean), disabled(Boolean), value(String),
//       label(String), size(String: 'sm'|'md'|'lg')
// 事件: change({checked, value})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PCheckbox extends PapyraiElement {
  static properties = {
    checked: { type: Boolean, reflect: true },
    indeterminate: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    value: { type: String },
    label: { type: String },
    size: { type: String, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    .checkbox-wrapper {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      cursor: pointer;
    }

    :host([disabled]) .checkbox-wrapper {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .checkbox {
      position: relative;
      width: 20px;
      height: 20px;
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 4px);
      background: var(--paper-white, #fffef8);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .checkbox-wrapper:hover:not([disabled]) .checkbox {
      border-color: var(--accent-red, #c4453c);
    }

    :host([checked]) .checkbox {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
    }

    :host([indeterminate]) .checkbox {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
    }

    /* Sizes */
    :host([size="sm"]) .checkbox {
      width: 16px;
      height: 16px;
    }

    :host([size="lg"]) .checkbox {
      width: 24px;
      height: 24px;
    }

    .checkmark {
      stroke: #fff;
      stroke-width: 2.5;
      fill: none;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.2s ease;
    }

    :host([checked]) .checkmark {
      opacity: 1;
      transform: scale(1);
    }

    .indeterminate-mark {
      width: 10px;
      height: 2px;
      background: #fff;
      border-radius: 1px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    :host([indeterminate]) .indeterminate-mark {
      opacity: 1;
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
    .checkbox-wrapper:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: 2px;
    }
  `;

  constructor() {
    super();
    this.checked = false;
    this.indeterminate = false;
    this.disabled = false;
    this.value = '';
    this.label = '';
    this.size = 'md';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'checkbox');
    this.setAttribute('aria-checked', this.checked);
    this.addEventListener('click', this._toggle);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._toggle);
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', this.checked);
    }
    if (changedProperties.has('indeterminate')) {
      this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : this.checked);
    }
  }

  _toggle = () => {
    if (this.disabled) return;
    if (this.indeterminate) {
      this.checked = false;
      this.indeterminate = false;
    } else {
      this.checked = !this.checked;
    }
    this.emit('change', { checked: this.checked, value: this.value });
  };

  _handleKeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggle();
    }
  };

  render() {
    return html`
      <span class="checkbox-wrapper" tabindex="0">
        <span class="checkbox">
          <svg class="checkmark" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          <span class="indeterminate-mark"></span>
        </span>
        ${this.label ? html`<span class="label">${this.label}</span>` : ''}
      </span>
    `;
  }
}

customElements.define('p-checkbox', PCheckbox);
