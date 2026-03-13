// Textarea - 纸张风格文本域
// 属性: value(String), label(String), placeholder(String), disabled(Boolean),
//       readonly(Boolean), error(String), size(String: 'sm'|'md'|'lg'),
//       rows(Number), maxrows(Number), autoresize(Boolean), maxlength(Number),
//       showcount(Boolean)
// 事件: input, change

import { PapyraiElement, html, css } from '../../core/base.js';

export class PTextarea extends PapyraiElement {
  static properties = {
    value: { type: String },
    label: { type: String },
    placeholder: { type: String },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true },
    error: { type: String },
    size: { type: String, reflect: true },
    rows: { type: Number },
    maxRows: { type: Number },
    autoResize: { type: Boolean },
    maxLength: { type: Number },
    showCount: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .textarea-wrapper {
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

    .textarea-container {
      display: flex;
      flex-direction: column;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      background: var(--paper-white, #fffef8);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      transition: all 0.2s ease;
      position: relative;
    }

    .textarea-container:focus-within {
      border-color: var(--accent-red, #c4453c);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    :host([disabled]) .textarea-container {
      opacity: 0.55;
      background: var(--paper-cream, #f8f1e5);
      pointer-events: none;
    }

    :host([error]) .textarea-container {
      border-color: var(--status-error, #dc2626);
    }

    :host([error]) .textarea-container:focus-within {
      box-shadow: 0 6px 14px rgba(220, 38, 38, 0.15);
    }

    /* Sizes */
    :host([size="sm"]) .textarea-container {
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      border-radius: var(--radius-sm, 6px);
    }

    :host([size="lg"]) .textarea-container {
      padding: var(--spacing-md, 12px) var(--spacing-lg, 16px);
      border-radius: var(--radius-lg, 14px);
    }

    textarea {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--font-mono, monospace);
      font-size: 0.95rem;
      color: var(--ink-black, #1f1a15);
      resize: none;
      min-height: 80px;
      line-height: 1.5;
    }

    textarea::placeholder {
      color: var(--ink-faint, #bbb);
    }

    /* Counter */
    .counter {
      display: flex;
      justify-content: flex-end;
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      color: var(--ink-faint, #999);
      margin-top: var(--spacing-xs, 4px);
    }

    .counter.warning {
      color: var(--status-warning, #d97706);
    }

    .counter.error {
      color: var(--status-error, #dc2626);
    }

    /* Error message */
    .error-message {
      font-family: var(--font-mono, monospace);
      font-size: 0.8rem;
      color: var(--status-error, #dc2626);
    }

    /* Focus visible */
    textarea:focus-visible {
      outline: none;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.label = '';
    this.placeholder = '';
    this.disabled = false;
    this.readonly = false;
    this.error = '';
    this.size = 'md';
    this.rows = 3;
    this.maxRows = 10;
    this.autoResize = true;
    this.maxLength = 0;
    this.showCount = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('input', this._handleInput);
    this.addEventListener('change', this._handleChange);
  }

  disconnectedCallback() {
    this.removeEventListener('input', this._handleInput);
    this.removeEventListener('change', this._handleChange);
    super.disconnectedCallback();
  }

  updated() {
    if (this.autoResize) {
      this._autoResize();
    }
  }

  _handleInput = (e) => {
    this.value = e.target.value;
    if (this.autoResize) {
      this._autoResize();
    }
    this.emit('input', { value: this.value });
  };

  _handleChange = (e) => {
    this.value = e.target.value;
    this.emit('change', { value: this.value });
  };

  _autoResize = () => {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (!textarea) return;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, this.maxRows * 24 + 32);
    textarea.style.height = newHeight + 'px';
  };

  _getCountClass() {
    if (!this.maxLength) return '';
    const ratio = this.value.length / this.maxLength;
    if (ratio >= 1) return 'error';
    if (ratio >= 0.9) return 'warning';
    return '';
  }

  render() {
    return html`
      <div class="textarea-wrapper">
        ${this.label ? html`<label class="label">${this.label}</label>` : ''}
        <div class="textarea-container">
          <textarea
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?readonly="${this.readonly}"
            aria-invalid="${!!this.error}"
            aria-label="${this.label || this.placeholder}"
            .rows="${this.rows}"
            maxlength="${this.maxLength || ''}"
          ></textarea>
        </div>
        ${this.showCount || this.maxLength ? html`
          <div class="counter ${this._getCountClass()}">
            ${this.value.length}${this.maxLength ? ` / ${this.maxLength}` : ''}
          </div>
        ` : ''}
        ${this.error ? html`<div class="error-message">${this.error}</div>` : ''}
      </div>
    `;
  }
}

customElements.define('p-textarea', PTextarea);
