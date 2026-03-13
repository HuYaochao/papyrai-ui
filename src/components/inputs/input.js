// Input - 纸张风格输入框
// 属性: type(String: 'text'|'email'|'number'|'password'|'search'|'tel'|'url'), 
//       value(String), label(String), placeholder(String), disabled(Boolean),
//       readonly(Boolean), error(String), size(String: 'sm'|'md'|'lg'),
//       clearable(Boolean), prefix(String), suffix(String)
// 事件: input, change, clear

import { PapyraiElement, html, css } from '../../core/base.js';

export class PInput extends PapyraiElement {
  static properties = {
    type: { type: String },
    value: { type: String },
    label: { type: String },
    placeholder: { type: String },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true },
    error: { type: String },
    size: { type: String, reflect: true },
    clearable: { type: Boolean },
    prefix: { type: String },
    suffix: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs, 4px);
    }

    .label {
      font-family: var(--font-serif, serif);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
      font-weight: 500;
    }

    :host([disabled]) .label {
      color: var(--ink-faint, #999);
    }

    .input-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 6px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      background: var(--paper-white, #fffef8);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      transition: all 0.2s ease;
      position: relative;
    }

    .input-container:focus-within {
      border-color: var(--accent-red, #c4453c);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    :host([disabled]) .input-container {
      opacity: 0.55;
      background: var(--paper-cream, #f8f1e5);
      pointer-events: none;
    }

    :host([error]) .input-container {
      border-color: var(--status-error, #dc2626);
    }

    :host([error]) .input-container:focus-within {
      box-shadow: 0 6px 14px rgba(220, 38, 38, 0.15);
    }

    /* Sizes */
    :host([size="sm"]) .input-container {
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      border-radius: var(--radius-sm, 6px);
    }

    :host([size="lg"]) .input-container {
      padding: var(--spacing-md, 12px) var(--spacing-lg, 16px);
      border-radius: var(--radius-lg, 14px);
    }

    /* Prefix/Suffix */
    .prefix, .suffix {
      display: flex;
      align-items: center;
      color: var(--ink-faint, #999);
      font-size: 0.9rem;
      white-space: nowrap;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--font-mono, monospace);
      font-size: 0.95rem;
      color: var(--ink-black, #1f1a15);
      min-width: 0;
    }

    input::placeholder {
      color: var(--ink-faint, #bbb);
    }

    /* Clear button */
    .clear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: none;
      background: var(--ink-faint, #ccc);
      border-radius: 50%;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
      padding: 0;
    }

    .clear-btn:hover {
      opacity: 1;
    }

    .clear-btn svg {
      width: 12px;
      height: 12px;
      stroke: #fff;
      stroke-width: 2;
      fill: none;
    }

    /* Error message */
    .error-message {
      font-family: var(--font-mono, monospace);
      font-size: 0.8rem;
      color: var(--status-error, #dc2626);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
    }

    /* Focus visible */
    input:focus-visible {
      outline: none;
    }
  `;

  constructor() {
    super();
    this.type = 'text';
    this.value = '';
    this.label = '';
    this.placeholder = '';
    this.disabled = false;
    this.readonly = false;
    this.error = '';
    this.size = 'md';
    this.clearable = false;
    this.prefix = '';
    this.suffix = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('input', this._handleInput);
    this.addEventListener('change', this._handleChange);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('input', this._handleInput);
    this.removeEventListener('change', this._handleChange);
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _handleInput = (e) => {
    this.value = e.target.value;
    this.emit('input', { value: this.value });
  };

  _handleChange = (e) => {
    this.value = e.target.value;
    this.emit('change', { value: this.value });
  };

  _handleKeydown = (e) => {
    if (e.key === 'Enter') {
      this.emit('change', { value: this.value });
    }
  };

  _handleClear = () => {
    this.value = '';
    this.emit('clear', { value: this.value });
    this.emit('input', { value: '' });
    this.emit('change', { value: '' });
    this.focus();
  };

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label class="label">${this.label}</label>` : ''}
        <div class="input-container">
          ${this.prefix ? html`<span class="prefix">${this.prefix}</span>` : ''}
          <input
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?readonly="${this.readonly}"
            aria-invalid="${!!this.error}"
            aria-label="${this.label || this.placeholder}"
          />
          ${this.clearable && this.value ? html`
            <button 
              class="clear-btn" 
              @click="${this._handleClear}"
              type="button"
              aria-label="Clear"
            >
              <svg viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          ` : ''}
          ${this.suffix ? html`<span class="suffix">${this.suffix}</span>` : ''}
        </div>
        ${this.error ? html`<div class="error-message">${this.error}</div>` : ''}
      </div>
    `;
  }
}

customElements.define('p-input', PInput);
