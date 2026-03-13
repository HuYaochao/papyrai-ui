// Input Mask - Input with format masking
// Props: mask(String), placeholder(String), value(String), disabled(Boolean), type(String)
// Events: change, blur, focus
// Built-in masks: phone, date, credit-card, custom

import { PapyraiElement, html, css } from '../../core/base.js';

const PRESET_MASKS = {
  phone: '(###) ###-####',
  date: '##/##/####',
  'date-us': '##/##/####',
  'date-eu': '##.##.####',
  'time': '##:##',
  'credit-card': '#### #### #### ####',
  cpf: '###.###.###-##',
  cnpj: '##.###.###/####-##',
  zip: '#####-###',
  plate: 'AAA-####'
};

export class PInputMask extends PapyraiElement {
  static properties = {
    mask: { type: String },
    placeholder: { type: String },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    type: { type: String },
    label: { type: String },
    error: { type: String }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
    }

    .input-wrapper {
      position: relative;
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

    :host-context([data-theme="dark"]) .label {
      color: var(--ink-white, #f5f0e8);
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input {
      width: 100%;
      padding: var(--spacing-sm, 10px) var(--spacing-md, 14px);
      background: var(--paper-white, #fffef8);
      border: 2px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      font-family: var(--font-mono, 'JetBrains Mono', monospace);
      font-size: 1rem;
      color: var(--ink-black, #1f1a15);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      transition: all 0.2s ease;
      outline: none;
    }

    .input::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%);
      pointer-events: none;
      border-radius: var(--radius-md, 10px);
    }

    .input:hover:not(:disabled) {
      border-color: var(--accent-red, #c4453c);
    }

    .input:focus {
      border-color: var(--accent-red, #c4453c);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    .input::placeholder {
      color: var(--ink-light, #8b8070);
      opacity: 0.7;
    }

    :host([disabled]) .input {
      opacity: 0.55;
      cursor: not-allowed;
      pointer-events: none;
    }

    :host-context([data-theme="dark"]) .input {
      background: var(--paper-dark, #1a1815);
      border-color: var(--paper-border-dark, #3d3832);
      color: var(--ink-white, #f5f0e8);
    }

    .error-message {
      font-family: var(--font-serif, serif);
      font-size: 0.8rem;
      color: var(--status-error, #dc2626);
      padding-left: var(--spacing-xs, 4px);
    }

    :host-context([data-theme="dark"]) .error-message {
      color: var(--status-error-light, #f87171);
    }

    .error .input {
      border-color: var(--status-error, #dc2626);
    }

    .input-icon {
      position: absolute;
      right: var(--spacing-sm, 10px);
      color: var(--ink-light, #8b8070);
      pointer-events: none;
    }

    .input-icon svg {
      width: 18px;
      height: 18px;
      stroke: currentColor;
      stroke-width: 1.5;
    }
  `;

  constructor() {
    super();
    this.mask = '';
    this.placeholder = '';
    this.value = '';
    this.disabled = false;
    this.type = 'text';
    this.label = '';
    this.error = '';
    this._currentMask = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._resolveMask();
  }

  updated(changedProperties) {
    if (changedProperties.has('mask')) {
      this._resolveMask();
    }
  }

  _resolveMask() {
    if (PRESET_MASKS[this.mask]) {
      this._currentMask = PRESET_MASKS[this.mask];
    } else {
      this._currentMask = this.mask;
    }
    
    // Set placeholder from mask if not provided
    if (!this.placeholder && this._currentMask) {
      this.placeholder = this._currentMask.replace(/#/g, '_');
    }
  }

  _applyMask(value) {
    if (!this._currentMask) return value;
    
    const maskChars = this._currentMask.split('');
    const valueChars = value.replace(/\D/g, '').split('');
    let result = '';
    let valueIndex = 0;
    
    for (let i = 0; i < maskChars.length && valueIndex < valueChars.length; i++) {
      if (maskChars[i] === '#') {
        result += valueChars[valueIndex++];
      } else {
        result += maskChars[i];
        // If the mask char is not #, we might need to include it even if no value
        if (valueIndex === 0 && maskChars[i] !== '#') {
          // Don't add literal yet
        }
      }
    }
    
    return result;
  }

  _handleInput(e) {
    const rawValue = e.target.value;
    const maskedValue = this._applyMask(rawValue);
    this.value = maskedValue;
    this.emit('change', { value: this.value, rawValue });
  }

  _handleKeydown(e) {
    // Allow control keys
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Escape'].includes(e.key)) {
      return;
    }
    
    // For backspace handling
    if (e.key === 'Backspace') {
      return;
    }
  }

  render() {
    return html`
      <div class="input-wrapper ${this.error ? 'error' : ''}">
        ${this.label ? html`<label class="label">${this.label}</label>` : ''}
        <div class="input-container">
          <input
            type="${this.type}"
            class="input"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            @input="${this._handleInput}"
            @keydown="${this._handleKeydown}"
            aria-label="${this.label || 'Input masked'}"
            ${this.error ? html`aria-invalid="true"` : ''}
          />
        </div>
        ${this.error ? html`<span class="error-message">${this.error}</span>` : ''}
      </div>
    `;
  }
}

customElements.define('p-input-mask', PInputMask);
