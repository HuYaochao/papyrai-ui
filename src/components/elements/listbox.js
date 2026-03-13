// Listbox — scrollable option list with keyboard navigation
// Props: options(Array of {label,value}), value(string|Array), multiple, searchable, size(number)
// Events: listbox-change

import { PapyraiElement, html, css } from '../../core/base.js';

export class PListbox extends PapyraiElement {
  static properties = {
    options:    { type: Array },
    value:      { type: String },
    multiple:   { type: Boolean, reflect: true },
    searchable: { type: Boolean, reflect: true },
    size:       { type: Number },
    _query:     { type: String, state: true },
    _focusIdx:  { type: Number, state: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .listbox-wrap {
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      background: var(--paper-white, #fdfbf7);
      overflow: hidden;
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
    }

    .search {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      border-bottom: 1px solid var(--paper-border, #d9d0be);
    }

    .search input {
      flex: 1;
      border: none;
      background: none;
      font-family: inherit;
      font-size: 0.875rem;
      color: var(--ink-black, #1a1612);
      outline: none;
    }

    .search input::placeholder { color: var(--ink-light, #aaa5a0); }

    .list {
      overflow-y: auto;
      max-height: 240px;
      padding: var(--spacing-xs, 4px) 0;
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      cursor: pointer;
      font-size: 0.9rem;
      color: var(--ink-black, #1a1612);
      transition: background var(--transition-fast, 150ms) ease;
      outline: none;
    }

    .option:hover,
    .option.focused {
      background: var(--paper-aged, #ede6d6);
    }

    .option.selected {
      color: var(--accent-red, #c4453c);
      font-weight: 600;
    }

    .option.selected .check {
      opacity: 1;
    }

    .check {
      margin-left: auto;
      opacity: 0;
      color: var(--accent-red, #c4453c);
      flex-shrink: 0;
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
    this.options = [];
    this.value = '';
    this.multiple = false;
    this.searchable = false;
    this.size = 0;
    this._query = '';
    this._focusIdx = -1;
  }

  _selectedValues() {
    if (this.multiple) {
      try { return Array.isArray(this.value) ? this.value : JSON.parse(this.value || '[]'); }
      catch { return []; }
    }
    return [this.value];
  }

  _isSelected(val) {
    return this._selectedValues().includes(val);
  }

  _filteredOptions() {
    if (!this._query) return this.options;
    const q = this._query.toLowerCase();
    return this.options.filter(o => (o.label || o).toLowerCase().includes(q));
  }

  _selectOption(val) {
    if (this.multiple) {
      const current = this._selectedValues();
      const next = current.includes(val)
        ? current.filter(v => v !== val)
        : [...current, val];
      this.value = JSON.stringify(next);
      this.emit('listbox-change', { value: next });
    } else {
      this.value = val;
      this.emit('listbox-change', { value: val });
    }
  }

  _handleKeydown(e, filtered) {
    const len = filtered.length;
    if (!len) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._focusIdx = (this._focusIdx + 1) % len;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._focusIdx = (this._focusIdx - 1 + len) % len;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this._focusIdx >= 0 && filtered[this._focusIdx]) {
        this._selectOption(filtered[this._focusIdx].value ?? filtered[this._focusIdx]);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      this._focusIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      this._focusIdx = len - 1;
    }
  }

  render() {
    const filtered = this._filteredOptions();
    return html`
      <div class="listbox-wrap" part="listbox"
           role="listbox"
           aria-multiselectable=${this.multiple ? 'true' : 'false'}
           @keydown=${(e) => this._handleKeydown(e, filtered)}
           tabindex="0">
        ${this.searchable ? html`
          <div class="search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search..."
                   .value=${this._query}
                   @input=${(e) => { this._query = e.target.value; this._focusIdx = -1; }}
                   aria-label="Search options"/>
          </div>
        ` : ''}
        <div class="list">
          ${filtered.length === 0 ? html`<div class="empty">No options</div>` : ''}
          ${filtered.map((opt, i) => {
            const val = opt.value ?? opt;
            const label = opt.label ?? opt;
            const selected = this._isSelected(val);
            return html`
              <div class="option ${selected ? 'selected' : ''} ${i === this._focusIdx ? 'focused' : ''}"
                   role="option"
                   aria-selected=${selected ? 'true' : 'false'}
                   tabindex="-1"
                   @click=${() => this._selectOption(val)}
                   @mouseenter=${() => { this._focusIdx = i; }}>
                ${label}
                <svg class="check" width="14" height="14" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="2.5"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

customElements.define('p-listbox', PListbox);
