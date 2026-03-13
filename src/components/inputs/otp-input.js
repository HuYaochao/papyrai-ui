// OTP Input - One-Time Password input component
// Props: length(number, default 6), value(String), disabled(Boolean), separator(String)
// Events: change, complete

import { PapyraiElement, html, css } from '../../core/base.js';

export class POtpInput extends PapyraiElement {
  static properties = {
    length: { type: Number },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    separator: { type: String },
    autofocus: { type: Boolean }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    .otp-container {
      display: flex;
      gap: var(--spacing-sm, 8px);
      align-items: center;
    }

    .otp-input {
      width: 48px;
      height: 56px;
      text-align: center;
      font-family: var(--font-mono, 'JetBrains Mono', monospace);
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--ink-black, #1f1a15);
      background: var(--paper-white, #fffef8);
      border: 2px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      transition: all 0.2s ease;
      outline: none;
      position: relative;
    }

    .otp-input::before {
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

    .otp-input:hover:not(:disabled) {
      border-color: var(--accent-red, #c4453c);
    }

    .otp-input:focus {
      border-color: var(--accent-red, #c4453c);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    .otp-input.filled {
      background: var(--paper-cream, #f8f1e5);
    }

    .otp-input.error {
      border-color: var(--status-error, #dc2626);
      animation: shake 0.3s ease;
    }

    :host([disabled]) .otp-input {
      opacity: 0.55;
      cursor: not-allowed;
      pointer-events: none;
    }

    .separator {
      font-family: var(--font-mono, monospace);
      font-size: 1.5rem;
      color: var(--ink-light, #8b8070);
      user-select: none;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      75% { transform: translateX(4px); }
    }

    /* Dark theme */
    :host-context([data-theme="dark"]) .otp-input {
      background: var(--paper-dark, #1a1815);
      border-color: var(--paper-border-dark, #3d3832);
      color: var(--ink-white, #f5f0e8);
    }

    :host-context([data-theme="dark"]) .otp-input.filled {
      background: var(--paper-dark-alt, #252220);
    }

    :host-context([data-theme="dark"]) .separator {
      color: var(--ink-dark, #6b6050);
    }
  `;

  constructor() {
    super();
    this.length = 6;
    this.value = '';
    this.disabled = false;
    this.separator = '-';
    this.autofocus = true;
    this._inputs = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this._createInputs();
  }

  updated(changedProperties) {
    if (changedProperties.has('length')) {
      this._createInputs();
    }
    if (changedProperties.has('value')) {
      this._syncInputs();
    }
  }

  _createInputs() {
    this._inputs = [];
    this.updateComplete.then(() => {
      this._syncInputs();
      if (this.autofocus) {
        this._focusFirstEmpty();
      }
    });
  }

  _syncInputs() {
    const inputEls = this.shadowRoot.querySelectorAll('.otp-input');
    inputEls.forEach((input, i) => {
      if (this.value[i]) {
        input.value = this.value[i];
        input.classList.add('filled');
      } else {
        input.value = '';
        input.classList.remove('filled');
      }
    });
  }

  _focusFirstEmpty() {
    const inputEls = this.shadowRoot.querySelectorAll('.otp-input');
    for (let i = 0; i < inputEls.length; i++) {
      if (!inputEls[i].value) {
        inputEls[i].focus();
        break;
      }
    }
  }

  _handleInput(e, index) {
    const input = e.target;
    const val = input.value.replace(/\D/g, '');
    
    if (val) {
      input.value = val.slice(-1);
      input.classList.add('filled');
      
      // Move to next input
      const nextInput = this.shadowRoot.querySelectorAll('.otp-input')[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
      
      this._updateValue();
    }
  }

  _handleKeydown(e, index) {
    const input = e.target;
    
    if (e.key === 'Backspace') {
      if (!input.value && index > 0) {
        // Move to previous input
        const prevInput = this.shadowRoot.querySelectorAll('.otp-input')[index - 1];
        if (prevInput) {
          prevInput.focus();
          prevInput.value = '';
          prevInput.classList.remove('filled');
        }
      } else {
        input.value = '';
        input.classList.remove('filled');
      }
      e.preventDefault();
      this._updateValue();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = this.shadowRoot.querySelectorAll('.otp-input')[index - 1];
      if (prevInput) prevInput.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && index < this.length - 1) {
      const nextInput = this.shadowRoot.querySelectorAll('.otp-input')[index + 1];
      if (nextInput) nextInput.focus();
      e.preventDefault();
    } else if (e.key === 'Paste') {
      e.preventDefault();
      this._handlePaste(e);
    }
  }

  _handlePaste(e) {
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, this.length);
    if (!pasteData) return;
    
    const inputEls = this.shadowRoot.querySelectorAll('.otp-input');
    pasteData.split('').forEach((char, i) => {
      if (inputEls[i]) {
        inputEls[i].value = char;
        inputEls[i].classList.add('filled');
      }
    });
    
    // Focus appropriate input
    const focusIndex = Math.min(pasteData.length, this.length - 1);
    inputEls[focusIndex]?.focus();
    
    this._updateValue();
  }

  _updateValue() {
    const inputEls = this.shadowRoot.querySelectorAll('.otp-input');
    const newValue = Array.from(inputEls).map(input => input.value).join('');
    
    if (newValue !== this.value) {
      this.value = newValue;
      this.emit('change', { value: this.value });
      
      if (newValue.length === this.length) {
        this.emit('complete', { value: this.value });
      }
    }
  }

  _renderSeparator(index) {
    if (index < this.length - 1 && (index + 1) % 3 === 0) {
      return html`<span class="separator">${this.separator}</span>`;
    }
    return '';
  }

  render() {
    return html`
      <div class="otp-container" role="group" aria-label="OTP Code input">
        ${Array.from({ length: this.length }, (_, i) => html`
          <input
            type="text"
            inputmode="numeric"
            maxlength="1"
            class="otp-input ${this.value[i] ? 'filled' : ''}"
            ?disabled="${this.disabled}"
            .value="${this.value[i] || ''}"
            @input="${(e) => this._handleInput(e, i)}"
            @keydown="${(e) => this._handleKeydown(e, i)}"
            aria-label="Digit ${i + 1}"
          />
          ${this._renderSeparator(i)}
        `)}
      </div>
    `;
  }
}

customElements.define('p-otp-input', POtpInput);
