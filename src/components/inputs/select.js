// Select - 纸张风格下拉选择框
// 属性: value(String), label(String), placeholder(String), disabled(Boolean),
//       error(String), size(String: 'sm'|'md'|'lg'), multiple(Boolean), searchable(Boolean),
//       options(Array) - [{value, label, disabled, group}]
// 事件: change, input

import { PapyraiElement, html, css } from '../../core/base.js';

export class PSelect extends PapyraiElement {
  static properties = {
    value: { type: String },
    label: { type: String },
    placeholder: { type: String },
    disabled: { type: Boolean, reflect: true },
    error: { type: String },
    size: { type: String, reflect: true },
    multiple: { type: Boolean, reflect: true },
    searchable: { type: Boolean },
    options: { type: Array },
    opened: { type: Boolean, state: true },
    filteredOptions: { type: Array, state: true },
    searchValue: { type: String, state: true },
    highlightedIndex: { type: Number, state: true }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .select-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs, 4px);
      position: relative;
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

    .select-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-xs, 6px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      background: var(--paper-white, #fffef8);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;
    }

    .select-trigger:hover:not(:disabled) {
      border-color: var(--accent-red, #c4453c);
    }

    .select-trigger:focus {
      outline: none;
    }

    .select-trigger:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: 2px;
    }

    :host([disabled]) .select-trigger {
      opacity: 0.55;
      background: var(--paper-cream, #f8f1e5);
      pointer-events: none;
    }

    :host([error]) .select-trigger {
      border-color: var(--status-error, #dc2626);
    }

    /* Sizes */
    :host([size="sm"]) .select-trigger {
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      border-radius: var(--radius-sm, 6px);
    }

    :host([size="lg"]) .select-trigger {
      padding: var(--spacing-md, 12px) var(--spacing-lg, 16px);
      border-radius: var(--radius-lg, 14px);
    }

    .selected-text {
      flex: 1;
      font-family: var(--font-mono, monospace);
      font-size: 0.95rem;
      color: var(--ink-black, #1f1a15);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .selected-text.placeholder {
      color: var(--ink-faint, #bbb);
    }

    .arrow {
      display: flex;
      align-items: center;
      transition: transform 0.2s ease;
    }

    .arrow svg {
      width: 16px;
      height: 16px;
      stroke: var(--ink-faint, #999);
      stroke-width: 2;
      fill: none;
    }

    :host([opened]) .arrow {
      transform: rotate(180deg);
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: var(--spacing-xs, 4px);
      background: var(--paper-white, #fffef8);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      box-shadow: var(--elevation-3, 0 10px 24px rgba(0,0,0,.15));
      z-index: 1000;
      max-height: 240px;
      overflow-y: auto;
      display: none;
    }

    :host([opened]) .dropdown {
      display: block;
    }

    /* Search */
    .search-input {
      width: 100%;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      border: none;
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
      font-family: var(--font-mono, monospace);
      font-size: 0.9rem;
      outline: none;
      background: transparent;
    }

    /* Options */
    .options-list {
      padding: var(--spacing-xs, 4px);
    }

    .option-group {
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      font-family: var(--font-serif, serif);
      font-size: 0.75rem;
      color: var(--ink-faint, #999);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 6px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      border-radius: var(--radius-sm, 6px);
      font-family: var(--font-mono, monospace);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .option:hover, .option.highlighted {
      background: var(--paper-highlight, rgba(196,69,60,0.08));
    }

    .option.selected {
      background: var(--accent-red, rgba(196,69,60,0.12));
      color: var(--accent-red, #c4453c);
    }

    .option.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .option-checkbox {
      width: 16px;
      height: 16px;
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .option.selected .option-checkbox {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
    }

    .option-checkbox svg {
      width: 12px;
      height: 12px;
      stroke: #fff;
      stroke-width: 2;
      fill: none;
      opacity: 0;
    }

    .option.selected .option-checkbox svg {
      opacity: 1;
    }

    /* Error */
    .error-message {
      font-family: var(--font-mono, monospace);
      font-size: 0.8rem;
      color: var(--status-error, #dc2626);
    }

    /* Empty */
    .no-results {
      padding: var(--spacing-md, 12px);
      text-align: center;
      color: var(--ink-faint, #999);
      font-size: 0.9rem;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.label = '';
    this.placeholder = 'Select...';
    this.disabled = false;
    this.error = '';
    this.size = 'md';
    this.multiple = false;
    this.searchable = false;
    this.options = [];
    this.opened = false;
    this.filteredOptions = [];
    this.searchValue = '';
    this.highlightedIndex = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
    document.removeEventListener('click', this._handleOutsideClick);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('options') || changedProperties.has('searchValue')) {
      this._filterOptions();
    }
    if (changedProperties.has('opened')) {
      if (this.opened) {
        this.highlightedIndex = 0;
      } else {
        this.searchValue = '';
      }
    }
  }

  _filterOptions() {
    const search = this.searchValue.toLowerCase();
    this.filteredOptions = this.options.filter(opt => {
      if (opt.group) return false;
      if (!search) return true;
      return opt.label.toLowerCase().includes(search);
    });
  }

  _handleClick = (e) => {
    if (this.disabled) return;
    this.opened = !this.opened;
    if (this.opened && this.searchable) {
      setTimeout(() => this.shadowRoot.querySelector('.search-input')?.focus(), 0);
    }
  };

  _handleOutsideClick = (e) => {
    if (!this.contains(e.target)) {
      this.opened = false;
    }
  };

  _handleKeydown = (e) => {
    if (this.disabled) return;
    if (e.key === 'Escape') {
      this.opened = false;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this.opened) {
        this.opened = true;
      } else {
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.filteredOptions.length - 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.opened && this.filteredOptions[this.highlightedIndex]) {
        this._selectOption(this.filteredOptions[this.highlightedIndex]);
      } else {
        this.opened = !this.opened;
      }
    } else if (e.key === ' ' && !this.searchable) {
      e.preventDefault();
      this.opened = !this.opened;
    }
  };

  _handleSearch = (e) => {
    this.searchValue = e.target.value;
    this.highlightedIndex = 0;
  };

  _selectOption = (option) => {
    if (option.disabled) return;
    if (this.multiple) {
      const values = this.value ? this.value.split(',') : [];
      const idx = values.indexOf(option.value);
      if (idx >= 0) {
        values.splice(idx, 1);
      } else {
        values.push(option.value);
      }
      this.value = values.join(',');
    } else {
      this.value = option.value;
      this.opened = false;
    }
    this.emit('change', { value: this.value });
  };

  _getSelectedLabel() {
    if (!this.value) return '';
    if (this.multiple) {
      const selected = this.options.filter(o => this.value.split(',').includes(o.value));
      return selected.map(o => o.label).join(', ');
    }
    const option = this.options.find(o => o.value === this.value);
    return option ? option.label : '';
  }

  render() {
    return html`
      <div class="select-wrapper">
        ${this.label ? html`<label class="label">${this.label}</label>` : ''}
        <div class="select-trigger" tabindex="0" role="combobox" aria-haspopup="listbox" aria-expanded="${this.opened}">
          <span class="selected-text ${!this.value ? 'placeholder' : ''}">
            ${this._getSelectedLabel() || this.placeholder}
          </span>
          <span class="arrow">
            <svg viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </span>
        </div>
        <div class="dropdown" role="listbox">
          ${this.searchable ? html`
            <input 
              class="search-input" 
              type="text"
              placeholder="Search..."
              .value="${this.searchValue}"
              @input="${this._handleSearch}"
            />
          ` : ''}
          <div class="options-list">
            ${this.filteredOptions.length === 0 ? html`
              <div class="no-results">No results found</div>
            ` : this.filteredOptions.map((option, index) => html`
              <div 
                class="option ${this._isSelected(option) ? 'selected' : ''} ${option.disabled ? 'disabled' : ''} ${index === this.highlightedIndex ? 'highlighted' : ''}"
                @click="${() => this._selectOption(option)}"
                role="option"
                aria-selected="${this._isSelected(option)}"
              >
                ${this.multiple ? html`
                  <span class="option-checkbox">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </span>
                ` : ''}
                ${option.label}
              </div>
            `)}
          </div>
        </div>
        ${this.error ? html`<div class="error-message">${this.error}</div>` : ''}
      </div>
    `;
  }

  _isSelected(option) {
    if (this.multiple) {
      return this.value.split(',').includes(option.value);
    }
    return this.value === option.value;
  }
}

customElements.define('p-select', PSelect);
