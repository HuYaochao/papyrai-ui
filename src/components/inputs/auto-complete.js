// AutoComplete — text input with dropdown suggestions
// Props: placeholder, options(Array of string|{label,value}), value, minChars(number,default 1), debounce(number)
// Events: ac-change, ac-select

import { PapyraiElement, html, css } from '../../core/base.js';

export class PAutoComplete extends PapyraiElement {
  static properties = {
    placeholder: { type: String },
    options:     { type: Array },
    value:       { type: String },
    minChars:    { type: Number, attribute: 'min-chars' },
    label:       { type: String },
    _open:       { type: Boolean, state: true },
    _highlighted: { type: Number, state: true }
  };

  static styles = css`
    :host {
      display: block;
      position: relative;
      font-family: var(--font-serif, serif);
    }

    .label {
      display: block;
      font-size: 0.8rem;
      color: var(--ink-mid, #6a6560);
      margin-bottom: var(--spacing-xs, 4px);
      font-family: var(--font-handwrite, cursive);
    }

    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    input {
      width: 100%;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      padding-right: 32px;
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      background: var(--paper-white, #fdfbf7);
      font-family: inherit;
      font-size: 0.9rem;
      color: var(--ink-black, #1a1612);
      outline: none;
      transition: border-color var(--transition-fast, 150ms) ease;
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
    }

    input:focus {
      border-color: var(--accent-red, #c4453c);
    }

    input::placeholder { color: var(--ink-light, #aaa5a0); }

    .search-icon {
      position: absolute;
      right: 10px;
      color: var(--ink-light, #aaa5a0);
      pointer-events: none;
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      z-index: var(--z-dropdown, 1000);
      background: var(--paper-white, #fdfbf7);
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      box-shadow: var(--elevation-2, 0 4px 6px rgba(0,0,0,.07));
      max-height: 220px;
      overflow-y: auto;
      padding: var(--spacing-xs, 4px) 0;
    }

    .option {
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      cursor: pointer;
      font-size: 0.9rem;
      color: var(--ink-black, #1a1612);
      transition: background var(--transition-fast, 150ms) ease;
    }

    .option:hover,
    .option.highlighted {
      background: var(--paper-aged, #ede6d6);
    }

    .option mark {
      background: color-mix(in srgb, var(--accent-amber, #c49a3c) 30%, transparent);
      color: inherit;
      border-radius: 2px;
    }

    .empty {
      padding: var(--spacing-md, 16px);
      text-align: center;
      color: var(--ink-light, #aaa5a0);
      font-size: 0.875rem;
    }
  `;

  constructor() {
    super();
    this.placeholder = 'Type to search...';
    this.options = [];
    this.value = '';
    this.minChars = 1;
    this.label = '';
    this._open = false;
    this._highlighted = -1;
    this._outsideClick = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._outsideClick, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._outsideClick, true);
    super.disconnectedCallback();
  }

  _handleOutsideClick(e) {
    if (!this.contains(e.target)) this._open = false;
  }

  _filtered() {
    if (!this.value || this.value.length < this.minChars) return [];
    const q = this.value.toLowerCase();
    return this.options.filter(o => {
      const label = o.label ?? o;
      return String(label).toLowerCase().includes(q);
    });
  }

  _highlight(text) {
    const q = this.value;
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return html`${text.slice(0, idx)}<mark>${text.slice(idx, idx + q.length)}</mark>${text.slice(idx + q.length)}`;
  }

  _onInput(e) {
    this.value = e.target.value;
    this._open = this.value.length >= this.minChars && this._filtered().length > 0;
    this._highlighted = -1;
    this.emit('ac-change', { value: this.value });
  }

  _selectOption(opt) {
    const label = opt.label ?? opt;
    const value = opt.value ?? opt;
    this.value = label;
    this._open = false;
    this.emit('ac-select', { value, label });
  }

  _handleKeydown(e, filtered) {
    if (!this._open) {
      if (e.key === 'ArrowDown') { this._open = true; this._highlighted = 0; }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._highlighted = (this._highlighted + 1) % filtered.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._highlighted = (this._highlighted - 1 + filtered.length) % filtered.length;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this._highlighted >= 0) this._selectOption(filtered[this._highlighted]);
    } else if (e.key === 'Escape') {
      this._open = false;
    }
  }

  render() {
    const filtered = this._filtered();
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : ''}
      <div class="input-wrap">
        <input
          type="text"
          placeholder=${this.placeholder}
          .value=${this.value}
          autocomplete="off"
          role="combobox"
          aria-expanded=${this._open ? 'true' : 'false'}
          aria-autocomplete="list"
          @input=${this._onInput}
          @keydown=${(e) => this._handleKeydown(e, filtered)}
          @focus=${() => { if (filtered.length && this.value.length >= this.minChars) this._open = true; }}
        />
        <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
      </div>
      ${this._open ? html`
        <div class="dropdown" role="listbox" part="dropdown">
          ${filtered.length === 0 ? html`<div class="empty">No matches</div>` : ''}
          ${filtered.map((opt, i) => {
            const label = opt.label ?? opt;
            return html`
              <div class="option ${i === this._highlighted ? 'highlighted' : ''}"
                   role="option"
                   @mousedown=${(e) => { e.preventDefault(); this._selectOption(opt); }}
                   @mouseenter=${() => { this._highlighted = i; }}>
                ${this._highlight(String(label))}
              </div>
            `;
          })}
        </div>
      ` : ''}
    `;
  }
}

customElements.define('p-auto-complete', PAutoComplete);
