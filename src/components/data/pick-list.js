// Pick List - 双列选择列表
// Features: 双列转移(可用->已选), 搜索过滤, 移动全部/选中按钮

import { PapyraiElement, html, css } from '../../core/base.js';

export class PPickList extends PapyraiElement {
  static properties = {
    available: { type: Array },
    selected: { type: Array },
    searchable: { type: Boolean },
    label: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .pick-list {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: var(--spacing-md, 16px);
      align-items: start;
    }

    .list-column {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 8px);
    }

    .column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      background: var(--ink-faint, #e8e5e0);
      border-radius: var(--radius-sm, 6px) var(--radius-sm, 6px) 0 0;
    }

    :host([dark]) .column-header {
      background: var(--ink-dark, #4a4540);
    }

    .column-title {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--ink-black, #1f1a15);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    :host([dark]) .column-title {
      color: var(--paper-white, #f5f0e8);
    }

    .column-count {
      font-size: 0.75rem;
      font-family: var(--font-mono, monospace);
      color: var(--ink-faint, #9a9590);
    }

    .search-input {
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: 0;
      background: var(--paper-white, #ffffff);
      font-family: var(--font-serif, serif);
      font-size: 0.85rem;
      color: var(--ink-black, #1f1a15);
      outline: none;
      transition: border-color 0.15s ease;
    }

    .search-input:focus {
      border-color: var(--accent-red, #c4453c);
    }

    :host([dark]) .search-input {
      background: var(--ink-dark, #4a4540);
      border-color: var(--ink-faint, #5a5550);
      color: var(--paper-white, #f5f0e8);
    }

    .list-box {
      border: 1px solid var(--paper-border, #d9ccb8);
      border-top: none;
      border-radius: 0 0 var(--radius-md, 8px) var(--radius-md, 8px);
      background: var(--paper-cream, #f8f1e5);
      max-height: 300px;
      overflow-y: auto;
    }

    :host([dark]) .list-box {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .list-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      cursor: pointer;
      transition: background 0.1s ease;
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    .list-item:last-child {
      border-bottom: none;
    }

    .list-item:hover {
      background: var(--ink-faint, #e8e5e0);
    }

    .list-item.selected {
      background: rgba(196, 69, 60, 0.1);
    }

    :host([dark]) .list-item:hover {
      background: var(--ink-dark, #4a4540);
    }

    .list-item-checkbox {
      width: 16px;
      height: 16px;
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 4px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .list-item.selected .list-item-checkbox {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
    }

    :host([dark]) .list-item-checkbox {
      border-color: var(--ink-faint, #5a5550);
    }

    .item-label {
      flex: 1;
      font-size: 0.875rem;
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .item-label {
      color: var(--paper-white, #f5f0e8);
    }

    .actions {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--spacing-xs, 4px);
      padding-top: 28px;
    }

    .action-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--paper-border, #d9ccb8);
      background: var(--paper-cream, #f8f1e5);
      border-radius: var(--radius-sm, 6px);
      cursor: pointer;
      color: var(--ink-faint, #9a9590);
      transition: all 0.15s ease;
    }

    .action-btn:hover:not(:disabled) {
      background: var(--ink-faint, #e8e5e0);
      color: var(--ink-black, #1f1a15);
      border-color: var(--accent-red, #c4453c);
    }

    .action-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    :host([dark]) .action-btn {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
      color: var(--ink-faint, #9a9590);
    }

    :host([dark]) .action-btn:hover:not(:disabled) {
      background: var(--ink-dark, #4a4540);
      color: var(--paper-white, #f5f0e8);
    }

    .empty-state {
      padding: var(--spacing-lg, 24px);
      text-align: center;
      color: var(--ink-faint, #9a9590);
      font-size: 0.85rem;
    }
  `;

  constructor() {
    super();
    this.available = [];
    this.selected = [];
    this.searchable = true;
    this.label = 'Pick List';
    this._availableSearch = '';
    this._selectedSearch = '';
    this._availableSelected = new Set();
    this._selectedSelected = new Set();
  }

  _getFilteredItems(items, search) {
    if (!search) return items;
    const query = search.toLowerCase();
    return items.filter(item => 
      item.label?.toLowerCase().includes(query) || 
      item.value?.toLowerCase().includes(query)
    );
  }

  _toggleAvailable(item) {
    if (this._availableSelected.has(item.value)) {
      this._availableSelected.delete(item.value);
    } else {
      this._availableSelected.add(item.value);
    }
    this.requestUpdate();
  }

  _toggleSelected(item) {
    if (this._selectedSelected.has(item.value)) {
      this._selectedSelected.delete(item.value);
    } else {
      this._selectedSelected.add(item.value);
    }
    this.requestUpdate();
  }

  _moveToSelected() {
    const itemsToMove = this.available.filter(item => this._availableSelected.has(item.value));
    const newSelected = [...this.selected, ...itemsToMove];
    const newAvailable = this.available.filter(item => !this._availableSelected.has(item.value));
    
    this.available = newAvailable;
    this.selected = newSelected;
    this._availableSelected.clear();
    
    this.emit('change', { available: newAvailable, selected: newSelected });
  }

  _moveToAvailable() {
    const itemsToMove = this.selected.filter(item => this._selectedSelected.has(item.value));
    const newAvailable = [...this.available, ...itemsToMove];
    const newSelected = this.selected.filter(item => !this._selectedSelected.has(item.value));
    
    this.available = newAvailable;
    this.selected = newSelected;
    this._selectedSelected.clear();
    
    this.emit('change', { available: newAvailable, selected: newSelected });
  }

  _moveAllToSelected() {
    const newSelected = [...this.selected, ...this.available];
    this.available = [];
    this.selected = newSelected;
    
    this.emit('change', { available: [], selected: newSelected });
  }

  _moveAllToAvailable() {
    const newAvailable = [...this.available, ...this.selected];
    this.available = newAvailable;
    this.selected = [];
    
    this.emit('change', { available: newAvailable, selected: [] });
  }

  render() {
    const filteredAvailable = this._getFilteredItems(this.available, this._availableSearch);
    const filteredSelected = this._getFilteredItems(this.selected, this._selectedSearch);

    return html`
      <div class="pick-list">
        <div class="list-column">
          <div class="column-header">
            <span class="column-title">Available</span>
            <span class="column-count">${this.available.length}</span>
          </div>
          ${this.searchable ? html`
            <input 
              class="search-input" 
              type="text" 
              placeholder="Search..."
              .value=${this._availableSearch}
              @input=${(e) => this._availableSearch = e.target.value}
            >
          ` : ''}
          <div class="list-box">
            ${filteredAvailable.length === 0 ? html`
              <div class="empty-state">No items</div>
            ` : filteredAvailable.map(item => html`
              <div 
                class="list-item ${this._availableSelected.has(item.value) ? 'selected' : ''}"
                @click=${() => this._toggleAvailable(item)}
              >
                <div class="list-item-checkbox">
                  ${this._availableSelected.has(item.value) ? html`
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" width="12" height="12">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ` : ''}
                </div>
                <span class="item-label">${item.label || item.value}</span>
              </div>
            `)}
          </div>
        </div>

        <div class="actions">
          <button 
            class="action-btn" 
            @click=${this._moveToSelected}
            ?disabled=${this._availableSelected.size === 0}
            title="Move to selected"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <button 
            class="action-btn" 
            @click=${this._moveAllToSelected}
            ?disabled=${this.available.length === 0}
            title="Move all to selected"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <polyline points="9 18 15 12 9 6"></polyline>
              <line x1="4" y1="4" x2="20" y2="4"></line>
            </svg>
          </button>
          <button 
            class="action-btn" 
            @click=${this._moveToAvailable}
            ?disabled=${this._selectedSelected.size === 0}
            title="Move to available"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button 
            class="action-btn" 
            @click=${this._moveAllToAvailable}
            ?disabled=${this.selected.length === 0}
            title="Move all to available"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <polyline points="15 18 9 12 15 6"></polyline>
              <line x1="4" y1="4" x2="20" y2="4"></line>
            </svg>
          </button>
        </div>

        <div class="list-column">
          <div class="column-header">
            <span class="column-title">Selected</span>
            <span class="column-count">${this.selected.length}</span>
          </div>
          ${this.searchable ? html`
            <input 
              class="search-input" 
              type="text" 
              placeholder="Search..."
              .value=${this._selectedSearch}
              @input=${(e) => this._selectedSearch = e.target.value}
            >
          ` : ''}
          <div class="list-box">
            ${filteredSelected.length === 0 ? html`
              <div class="empty-state">No items selected</div>
            ` : filteredSelected.map(item => html`
              <div 
                class="list-item ${this._selectedSelected.has(item.value) ? 'selected' : ''}"
                @click=${() => this._toggleSelected(item)}
              >
                <div class="list-item-checkbox">
                  ${this._selectedSelected.has(item.value) ? html`
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" width="12" height="12">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ` : ''}
                </div>
                <span class="item-label">${item.label || item.value}</span>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('p-pick-list', PPickList);
