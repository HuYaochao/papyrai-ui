// Input Chips - Tag/Chip list with add/remove functionality
// Props: value(Array), placeholder(String), max(Number), disabled(Boolean), readonly(Boolean)
// Events: change, add, remove

import { PapyraiElement, html, css } from '../../core/base.js';

export class PInputChips extends PapyraiElement {
  static properties = {
    value: { type: Array },
    placeholder: { type: String },
    max: { type: Number },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
    }

    .chips-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs, 6px);
      padding: var(--spacing-sm, 8px);
      min-height: 44px;
      background: var(--paper-white, #fffef8);
      border: 2px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      transition: all 0.2s ease;
      cursor: text;
    }

    .chips-container:hover:not(:focus-within):not([disabled]) {
      border-color: var(--accent-red, #c4453c);
    }

    .chips-container:focus-within {
      border-color: var(--accent-red, #c4453c);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    :host([disabled]) .chips-container {
      opacity: 0.55;
      cursor: not-allowed;
      pointer-events: none;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 6px);
      font-family: var(--font-serif, serif);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
      animation: chip-enter 0.2s ease;
    }

    .chip::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
      border-radius: var(--radius-sm, 6px);
      pointer-events: none;
    }

    :host-context([data-theme="dark"]) .chip {
      background: var(--paper-dark-alt, #252220);
      border-color: var(--paper-border-dark, #3d3832);
      color: var(--ink-white, #f5f0e8);
    }

    .chip-text {
      position: relative;
      z-index: 1;
    }

    .chip-remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      padding: 0;
      margin-left: 2px;
      background: transparent;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--ink-light, #8b8070);
      transition: all 0.15s ease;
      position: relative;
      z-index: 1;
    }

    .chip-remove:hover {
      background: var(--status-error, #dc2626);
      color: white;
    }

    .chip-remove svg {
      width: 12px;
      height: 12px;
      stroke: currentColor;
      stroke-width: 2;
    }

    .input-wrapper {
      flex: 1;
      min-width: 100px;
      position: relative;
    }

    .chip-input {
      width: 100%;
      padding: var(--spacing-xs, 4px);
      background: transparent;
      border: none;
      outline: none;
      font-family: var(--font-serif, serif);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
    }

    .chip-input::placeholder {
      color: var(--ink-light, #8b8070);
    }

    :host-context([data-theme="dark"]) .chip-input {
      color: var(--ink-white, #f5f0e8);
    }

    :host-context([data-theme="dark"]) .chip-input::placeholder {
      color: var(--ink-dark, #6b6050);
    }

    .max-indicator {
      display: flex;
      align-items: center;
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      font-size: 0.8rem;
      color: var(--ink-light, #8b8070);
    }

    @keyframes chip-enter {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;

  constructor() {
    super();
    this.value = [];
    this.placeholder = 'Add chip...';
    this.max = null;
    this.disabled = false;
    this.readonly = false;
    this._inputValue = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._handleContainerClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleContainerClick);
    super.disconnectedCallback();
  }

  _handleContainerClick() {
    if (!this.disabled && !this.readonly) {
      const input = this.shadowRoot.querySelector('.chip-input');
      input?.focus();
    }
  }

  _handleInput(e) {
    this._inputValue = e.target.value;
  }

  _handleKeydown(e) {
    if (e.key === 'Enter' && this._inputValue.trim()) {
      e.preventDefault();
      this._addChip(this._inputValue.trim());
    } else if (e.key === 'Backspace' && !this._inputValue && this.value.length > 0) {
      this._removeChip(this.value.length - 1);
    }
  }

  _addChip(text) {
    if (this.max && this.value.length >= this.max) return;
    if (this.value.includes(text)) return;
    
    this.value = [...this.value, text];
    this._inputValue = '';
    this.emit('add', { value: text, index: this.value.length - 1 });
    this.emit('change', { value: this.value });
    
    this.updateComplete.then(() => {
      const input = this.shadowRoot.querySelector('.chip-input');
      input?.focus();
    });
  }

  _removeChip(index) {
    const removed = this.value[index];
    this.value = this.value.filter((_, i) => i !== index);
    this.emit('remove', { value: removed, index });
    this.emit('change', { value: this.value });
  }

  _renderChip(chip, index) {
    return html`
      <span class="chip">
        <span class="chip-text">${chip}</span>
        ${!this.readonly ? html`
          <button 
            class="chip-remove" 
            @click="${() => this._removeChip(index)}"
            aria-label="Remove ${chip}"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        ` : ''}
      </span>
    `;
  }

  render() {
    const isFull = this.max && this.value.length >= this.max;
    
    return html`
      <div 
        class="chips-container" 
        ?disabled="${this.disabled}"
        role="group"
        aria-label="Chip input"
      >
        ${this.value.map((chip, i) => this._renderChip(chip, i))}
        
        ${!this.readonly ? html`
          <div class="input-wrapper">
            <input
              type="text"
              class="chip-input"
              .value="${this._inputValue}"
              placeholder="${isFull ? '' : this.placeholder}"
              ?disabled="${this.disabled || isFull}"
              @input="${this._handleInput}"
              @keydown="${this._handleKeydown}"
              aria-label="Add chip"
            />
          </div>
        ` : ''}
        
        ${this.max ? html`
          <span class="max-indicator">${this.value.length}/${this.max}</span>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('p-input-chips', PInputChips);
