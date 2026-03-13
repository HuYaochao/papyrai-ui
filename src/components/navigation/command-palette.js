// Command Palette - Cmd+K 风格命令面板
// Features: 模糊搜索, 键盘导航, 分组结果, 最近使用

import { PapyraiElement, html, css } from '../../core/base.js';

export class PCommandPalette extends PapyraiElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    placeholder: { type: String },
    groups: { type: Array },
    recent: { type: Array }
  };

  static styles = css`
    :host {
      display: contents;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 15vh;
      z-index: 2000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.15s ease, visibility 0.15s ease;
    }

    :host([open]) .backdrop {
      opacity: 1;
      visibility: visible;
    }

    .palette {
      width: 600px;
      max-width: 90vw;
      max-height: 70vh;
      display: flex;
      flex-direction: column;
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-lg, 12px);
      box-shadow: var(--elevation-3, 0 12px 32px rgba(0, 0, 0, 0.2));
      transform: scale(0.95) translateY(-10px);
      transition: transform 0.15s ease;
      overflow: hidden;
    }

    :host([open]) .palette {
      transform: scale(1) translateY(0);
    }

    :host([dark]) .palette {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    /* Paper texture */
    .palette::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
    }

    .search-container {
      display: flex;
      align-items: center;
      padding: var(--spacing-md, 16px);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
      gap: var(--spacing-sm, 8px);
    }

    .search-icon {
      width: 20px;
      height: 20px;
      color: var(--ink-faint, #9a9590);
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      font-family: var(--font-serif, serif);
      font-size: 1rem;
      color: var(--ink-black, #1f1a15);
      outline: none;
    }

    .search-input::placeholder {
      color: var(--ink-faint, #9a9590);
    }

    :host([dark]) .search-input {
      color: var(--paper-white, #f5f0e8);
    }

    .shortcut {
      display: flex;
      align-items: center;
      gap: 2px;
      font-size: 0.75rem;
      color: var(--ink-faint, #9a9590);
      font-family: var(--font-mono, monospace);
      padding: 2px 6px;
      background: var(--ink-faint, #e8e5e0);
      border-radius: var(--radius-sm, 4px);
    }

    :host([dark]) .shortcut {
      background: var(--ink-dark, #4a4540);
    }

    .results {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-sm, 8px);
    }

    .group {
      margin-bottom: var(--spacing-md, 16px);
    }

    .group:last-child {
      margin-bottom: 0;
    }

    .group-title {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ink-faint, #9a9590);
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      font-family: var(--font-mono, monospace);
    }

    .item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      border-radius: var(--radius-md, 8px);
      cursor: pointer;
      transition: background 0.1s ease;
    }

    .item:hover, .item[aria-selected="true"] {
      background: var(--ink-faint, #e8e5e0);
    }

    :host([dark]) .item:hover,
    :host([dark]) .item[aria-selected="true"] {
      background: var(--ink-dark, #4a4540);
    }

    .item-icon {
      width: 20px;
      height: 20px;
      color: var(--ink-faint, #9a9590);
      flex-shrink: 0;
    }

    .item-label {
      flex: 1;
      font-family: var(--font-serif, serif);
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .item-label {
      color: var(--paper-white, #f5f0e8);
    }

    .item-shortcut {
      font-size: 0.75rem;
      color: var(--ink-faint, #9a9590);
      font-family: var(--font-mono, monospace);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl, 32px);
      color: var(--ink-faint, #9a9590);
    }

    .empty-icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--spacing-md, 16px);
      opacity: 0.5;
    }

    .no-results {
      text-align: center;
      padding: var(--spacing-lg, 24px);
      color: var(--ink-faint, #9a9590);
      font-family: var(--font-handwrite, cursive);
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.placeholder = 'Type a command...';
    this.groups = [];
    this.recent = [];
    this._query = '';
    this._selectedIndex = 0;
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleBackdropClick = this._handleBackdropClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._globalKeyHandler);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._globalKeyHandler);
    super.disconnectedCallback();
  }

  _globalKeyHandler = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.toggle();
    }
  };

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._query = '';
        this._selectedIndex = 0;
        requestAnimationFrame(() => {
          const input = this.shadowRoot?.querySelector('.search-input');
          if (input) input.focus();
        });
      }
    }
  }

  _handleKeydown(e) {
    const items = this._getFilteredItems();
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._selectedIndex = Math.min(this._selectedIndex + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[this._selectedIndex]) {
        this._selectItem(items[this._selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }
  }

  _handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  _handleInput(e) {
    this._query = e.target.value;
    this._selectedIndex = 0;
  }

  _getFilteredItems() {
    if (!this._query) {
      return this.recent.length > 0 ? this.recent : this._flattenGroups(this.groups);
    }
    
    const query = this._query.toLowerCase();
    const allItems = this._flattenGroups(this.groups);
    return allItems.filter(item => 
      item.label.toLowerCase().includes(query) ||
      item.keywords?.some(k => k.toLowerCase().includes(query))
    );
  }

  _flattenGroups(groups) {
    return groups.flatMap(group => group.items || []);
  }

  _selectItem(item) {
    this.emit('select', { item });
    this.close();
  }

  toggle() {
    this.open = !this.open;
    if (this.open) {
      this.emit('open');
    } else {
      this.emit('close');
    }
  }

  show() {
    this.open = true;
    this.emit('open');
  }

  close() {
    this.open = false;
    this.emit('close');
  }

  render() {
    const items = this._getFilteredItems();
    const showRecent = !this._query && this.recent.length > 0;
    
    return html`
      <div class="backdrop" @click=${this._handleBackdropClick}>
        <div class="palette" @keydown=${this._handleKeydown}>
          <div class="search-container">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              class="search-input" 
              type="text" 
              placeholder=${this.placeholder}
              .value=${this._query}
              @input=${this._handleInput}
            >
            <span class="shortcut">ESC</span>
          </div>
          
          <div class="results">
            ${items.length === 0 ? html`
              <div class="no-results">No results found</div>
            ` : showRecent ? html`
              <div class="group">
                <div class="group-title">Recent</div>
                ${this.recent.map((item, i) => html`
                  <div 
                    class="item" 
                    aria-selected=${i === this._selectedIndex}
                    @click=${() => this._selectItem(item)}
                  >
                    ${item.icon ? html`<span class="item-icon">${item.icon}</span>` : ''}
                    <span class="item-label">${item.label}</span>
                    ${item.shortcut ? html`<span class="item-shortcut">${item.shortcut}</span>` : ''}
                  </div>
                `)}
              </div>
            ` : this._renderGroups(items)}
          </div>
        </div>
      </div>
    `;
  }

  _renderGroups(items) {
    if (this._query) {
      return items.map((item, i) => html`
        <div 
          class="item" 
          aria-selected=${i === this._selectedIndex}
          @click=${() => this._selectItem(item)}
        >
          ${item.icon ? html`<span class="item-icon">${item.icon}</span>` : ''}
          <span class="item-label">${item.label}</span>
          ${item.shortcut ? html`<span class="item-shortcut">${item.shortcut}</span>` : ''}
        </div>
      `);
    }

    return this.groups.map(group => html`
      <div class="group">
        <div class="group-title">${group.name}</div>
        ${group.items.map((item, i) => {
          const globalIndex = this._flattenGroups(this.groups.slice(0, this.groups.indexOf(group))).length + i;
          return html`
            <div 
              class="item" 
              aria-selected=${globalIndex === this._selectedIndex}
              @click=${() => this._selectItem(item)}
            >
              ${item.icon ? html`<span class="item-icon">${item.icon}</span>` : ''}
              <span class="item-label">${item.label}</span>
              ${item.shortcut ? html`<span class="item-shortcut">${item.shortcut}</span>` : ''}
            </div>
          `;
        })}
      </div>
    `);
  }
}

customElements.define('p-command-palette', PCommandPalette);
