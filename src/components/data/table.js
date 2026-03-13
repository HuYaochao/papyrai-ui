// Table - 纸张风格数据表格组件
// 属性: columns(Array), data(Array), striped(Boolean), bordered(Boolean),
//       hoverable(Boolean), sortable(Boolean), filterable(Boolean),
//       selectable(Boolean), selectionMode(String: single/multiple),
//       pagination(Boolean), pageSize(Number), currentPage(Number)
// 事件: sort-change({column, direction}), filter-change({column, value}),
//       selection-change({selectedRows}), row-click({row}), cell-edit({row, column, value})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PTable extends PapyraiElement {
  static properties = {
    columns: { type: Array },
    data: { type: Array },
    striped: { type: Boolean },
    bordered: { type: Boolean },
    hoverable: { type: Boolean },
    sortable: { type: Boolean },
    filterable: { type: Boolean },
    selectable: { type: Boolean },
    selectionMode: { type: String },
    pagination: { type: Boolean },
    pageSize: { type: Number },
    currentPage: { type: Number },
    _sortColumn: { state: true },
    _sortDirection: { state: true },
    _filters: { state: true },
    _selectedRows: { state: true },
    _editingCell: { state: true },
    _allSelected: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: var(--font-serif, serif);
    }

    .table-container {
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      background: var(--paper-white, #fffef8);
      overflow: hidden;
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
    }

    .table-scroll {
      overflow-x: auto;
      max-height: 400px;
      overflow-y: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }

    thead {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--paper-cream, #f8f1e5);
    }

    th {
      padding: var(--spacing-sm, 12px) var(--spacing-md, 16px);
      text-align: left;
      font-weight: 600;
      color: var(--ink-black, #1f1a15);
      border-bottom: 2px solid var(--paper-border, #d9ccb8);
      white-space: nowrap;
      user-select: none;
    }

    th.sortable {
      cursor: pointer;
      transition: background 0.2s;
    }

    th.sortable:hover {
      background: var(--paper-border, #d9ccb8);
    }

    th .sort-icon {
      display: inline-block;
      margin-left: var(--spacing-xs, 4px);
      opacity: 0.4;
      transition: all 0.2s;
    }

    th.sorted .sort-icon {
      opacity: 1;
      color: var(--accent-red, #c4453c);
    }

    th.sorted.desc .sort-icon {
      transform: rotate(180deg);
    }

    td {
      padding: var(--spacing-sm, 12px) var(--spacing-md, 16px);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
      color: var(--ink-black, #1f1a15);
    }

    tr.striped:nth-child(even) {
      background: var(--paper-cream, #f8f1e5);
    }

    tr.hoverable:hover {
      background: var(--paper-border, #d9ccb8);
    }

    tr.selected {
      background: rgba(196, 69, 60, 0.1);
    }

    .cell-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
    }

    .editable-cell {
      cursor: text;
      padding: var(--spacing-xs, 4px);
      border-radius: var(--radius-sm, 4px);
      transition: background 0.2s;
    }

    .editable-cell:hover {
      background: rgba(196, 69, 60, 0.1);
    }

    .cell-input {
      width: 100%;
      padding: var(--spacing-xs, 4px);
      border: 1.5px solid var(--accent-red, #c4453c);
      border-radius: var(--radius-sm, 4px);
      background: var(--paper-white, #fffef8);
      font-family: inherit;
      font-size: inherit;
      outline: none;
    }

    th.checkbox-cell,
    td.checkbox-cell {
      width: 40px;
      text-align: center;
    }

    .checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: var(--accent-red, #c4453c);
    }

    .filter-row th {
      padding: var(--spacing-xs, 8px) var(--spacing-md, 16px);
      background: var(--paper-cream, #f8f1e5);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    .filter-input {
      width: 100%;
      padding: var(--spacing-xs, 6px);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 4px);
      background: var(--paper-white, #fffef8);
      font-size: 0.85rem;
      outline: none;
      transition: border-color 0.2s;
    }

    .filter-input:focus {
      border-color: var(--accent-red, #c4453c);
    }

    .pagination-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm, 12px) var(--spacing-md, 16px);
      border-top: 1.5px solid var(--paper-border, #d9ccb8);
      background: var(--paper-cream, #f8f1e5);
    }

    .pagination-info {
      font-size: 0.85rem;
      color: var(--ink-faint, #999);
    }

    .pagination {
      display: flex;
      gap: var(--spacing-xs, 4px);
    }

    .pagination-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      padding: 0 var(--spacing-sm, 8px);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 6px);
      background: var(--paper-white, #fffef8);
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .pagination-btn:hover:not(:disabled) {
      border-color: var(--accent-red, #c4453c);
      color: var(--accent-red, #c4453c);
    }

    .pagination-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .pagination-btn.active {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
      color: #fff;
    }

    .expand-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      cursor: pointer;
      transition: transform 0.2s;
      color: var(--ink-faint, #999);
    }

    .expand-icon.expanded {
      transform: rotate(90deg);
    }

    .row-expand {
      padding: var(--spacing-sm, 12px) var(--spacing-md, 16px);
      background: var(--paper-cream, #f8f1e5);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    :host([bordered]) .table-container {
      border-width: 2px;
    }

    :host([bordered]) th,
    :host([bordered]) td {
      border: 1px solid var(--paper-border, #d9ccb8);
    }

    .empty-state {
      padding: var(--spacing-xl, 48px);
      text-align: center;
      color: var(--ink-faint, #999);
      font-style: italic;
    }
  `;

  constructor() {
    super();
    this.columns = [];
    this.data = [];
    this.striped = false;
    this.bordered = false;
    this.hoverable = true;
    this.sortable = false;
    this.filterable = false;
    this.selectable = false;
    this.selectionMode = 'multiple';
    this.pagination = false;
    this.pageSize = 10;
    this.currentPage = 1;
    this._sortColumn = null;
    this._sortDirection = 'asc';
    this._filters = {};
    this._selectedRows = new Set();
    this._editingCell = null;
    this._allSelected = false;
    this._expandedRows = new Set();
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _getFilteredData() {
    let filtered = [...this.data];

    if (Object.keys(this._filters).length > 0) {
      filtered = filtered.filter(row => {
        return Object.entries(this._filters).every(([key, value]) => {
          if (!value) return true;
          const cellValue = String(row[key] || '').toLowerCase();
          return cellValue.includes(value.toLowerCase());
        });
      });
    }

    return filtered;
  }

  _getSortedData(filteredData) {
    if (!this._sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[this._sortColumn];
      const bVal = b[this._sortColumn];

      if (aVal === bVal) return 0;

      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal || '').localeCompare(String(bVal || ''));
      }

      return this._sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  _getPaginatedData(sortedData) {
    if (!this.pagination) return sortedData;

    const start = (this.currentPage - 1) * this.pageSize;
    return sortedData.slice(start, start + this.pageSize);
  }

  _getTotalPages(sortedData) {
    return Math.ceil(sortedData.length / this.pageSize);
  }

  _handleSort(column) {
    if (!this.sortable || !column.sortable) return;

    if (this._sortColumn === column.key) {
      this._sortDirection = this._sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortColumn = column.key;
      this._sortDirection = 'asc';
    }

    this.emit('sort-change', { column: this._sortColumn, direction: this._sortDirection });
  }

  _handleFilter(key, value) {
    this._filters = { ...this._filters, [key]: value };
    this.currentPage = 1;
    this.emit('filter-change', { column: key, value });
  }

  _handleSelectAll = (e) => {
    this._allSelected = e.target.checked;
    const paginatedData = this._getPaginatedData(this._getSortedData(this._getFilteredData()));

    if (this._allSelected) {
      paginatedData.forEach(row => this._selectedRows.add(row));
    } else {
      paginatedData.forEach(row => this._selectedRows.delete(row));
    }

    this._selectedRows = new Set(this._selectedRows);
    this.emit('selection-change', { selectedRows: Array.from(this._selectedRows) });
  };

  _handleSelectRow(row) {
    if (this.selectionMode === 'single') {
      this._selectedRows.clear();
    }

    if (this._selectedRows.has(row)) {
      this._selectedRows.delete(row);
    } else {
      this._selectedRows.add(row);
    }

    this._selectedRows = new Set(this._selectedRows);
    this._allSelected = this._selectedRows.size === this.data.length;
    this.emit('selection-change', { selectedRows: Array.from(this._selectedRows) });
  }

  _handleRowClick(row) {
    this.emit('row-click', { row });
  }

  _handleCellClick(row, column, e) {
    if (!column.editable) return;
    this._editingCell = `${row}-${column.key}`;
    this.updateComplete.then(() => {
      const input = this.shadowRoot.querySelector('.cell-input');
      if (input) input.focus();
    });
  }

  _handleCellBlur(row, column, e) {
    const newValue = e.target.value;
    if (newValue !== row[column.key]) {
      this.emit('cell-edit', { row, column: column.key, value: newValue });
    }
    this._editingCell = null;
  }

  _handleCellKeydown(e, row, column) {
    if (e.key === 'Enter') {
      this._handleCellBlur(e, row, column);
    } else if (e.key === 'Escape') {
      this._editingCell = null;
    }
  }

  _handleKeydown(e) {
    const paginatedData = this._getPaginatedData(this._getSortedData(this._getFilteredData()));
    const currentIndex = paginatedData.findIndex(row =>
      this._selectedRows.has(row) || this._expandedRows.has(row)
    );

    if (e.key === 'ArrowDown' && currentIndex < paginatedData.length - 1) {
      e.preventDefault();
      this._selectedRows.clear();
      this._selectedRows.add(paginatedData[currentIndex + 1]);
      this._selectedRows = new Set(this._selectedRows);
      this.emit('selection-change', { selectedRows: Array.from(this._selectedRows) });
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      e.preventDefault();
      this._selectedRows.clear();
      this._selectedRows.add(paginatedData[currentIndex - 1]);
      this._selectedRows = new Set(this._selectedRows);
      this.emit('selection-change', { selectedRows: Array.from(this._selectedRows) });
    }
  }

  _handlePageChange(page) {
    if (page >= 1 && page <= this._getTotalPages(this._getSortedData(this._getFilteredData()))) {
      this.currentPage = page;
    }
  }

  _toggleRowExpand(row) {
    if (this._expandedRows.has(row)) {
      this._expandedRows.delete(row);
    } else {
      this._expandedRows.add(row);
    }
    this._expandedRows = new Set(this._expandedRows);
  }

  _renderSortIcon(column) {
    if (!this.sortable || !column.sortable) return '';

    const isSorted = this._sortColumn === column.key;
    return html`
      <span class="sort-icon ${isSorted ? 'sorted' : ''} ${isSorted && this._sortDirection === 'desc' ? 'desc' : ''}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7-7 7 7"/>
        </svg>
      </span>
    `;
  }

  _renderFilterHeader(column) {
    if (!this.filterable || !column.filterable) return null;

    return html`
      <input
        class="filter-input"
        type="text"
        placeholder="筛选..."
        .value="${this._filters[column.key] || ''}"
        @input="${e => this._handleFilter(column.key, e.target.value)}"
      />
    `;
  }

  _renderSelectAllCheckbox() {
    if (!this.selectable) return null;

    const paginatedData = this._getPaginatedData(this._getSortedData(this._getFilteredData()));
    const allSelected = paginatedData.length > 0 && paginatedData.every(row => this._selectedRows.has(row));

    return html`
      <input
        type="checkbox"
        class="checkbox"
        ?checked="${allSelected}"
        @change="${this._handleSelectAll}"
      />
    `;
  }

  render() {
    const filteredData = this._getFilteredData();
    const sortedData = this._getSortedData(filteredData);
    const paginatedData = this._getPaginatedData(sortedData);
    const totalPages = this._getTotalPages(sortedData);

    return html`
      <div class="table-container">
        <div class="table-scroll">
          <table role="grid">
            <thead>
              <tr>
                ${this.selectable ? html`<th class="checkbox-cell">${this._renderSelectAllCheckbox()}</th>` : ''}
                ${this.columns.map(column => html`
                  <th
                    class="${this.sortable && column.sortable ? 'sortable' : ''} ${this._sortColumn === column.key ? 'sorted' : ''}"
                    @click="${() => this._handleSort(column)}"
                    style="${column.width ? `width: ${column.width}` : ''}"
                  >
                    ${column.title}
                    ${this._renderSortIcon(column)}
                  </th>
                `)}
              </tr>
              ${this.filterable ? html`
                <tr class="filter-row">
                  ${this.selectable ? html`<th></th>` : ''}
                  ${this.columns.map(column => html`<th>${this._renderFilterHeader(column)}</th>`)}
                </tr>
              ` : ''}
            </thead>
            <tbody>
              ${paginatedData.length === 0 ? html`
                <tr>
                  <td colspan="${this.columns.length + (this.selectable ? 1 : 0)}">
                    <div class="empty-state">暂无数据</div>
                  </td>
                </tr>
              ` : paginatedData.map(row => html`
                <tr
                  class="${this.striped ? 'striped' : ''} ${this.hoverable ? 'hoverable' : ''} ${this._selectedRows.has(row) ? 'selected' : ''}"
                  @click="${() => this._handleRowClick(row)}"
                >
                  ${this.selectable ? html`
                    <td class="checkbox-cell">
                      <input
                        type="checkbox"
                        class="checkbox"
                        ?checked="${this._selectedRows.has(row)}"
                        @change="${() => this._handleSelectRow(row)}"
                        @click="${e => e.stopPropagation()}"
                      />
                    </td>
                  ` : ''}
                  ${this.columns.map(column => html`
                    <td>
                      <div class="cell-content">
                        ${this._editingCell === `${row}-${column.key}` ? html`
                          <input
                            class="cell-input"
                            type="text"
                            .value="${row[column.key]}"
                            @blur="${e => this._handleCellBlur(row, column, e)}"
                            @keydown="${e => this._handleCellKeydown(e, row, column)}"
                          />
                        ` : html`
                          <span
                            class="${column.editable ? 'editable-cell' : ''}"
                            @click="${e => this._handleCellClick(row, column, e)}"
                          >
                            ${column.render ? column.render(row[column.key], row) : row[column.key]}
                          </span>
                        `}
                      </div>
                    </td>
                  `)}
                </tr>
                ${this._expandedRows.has(row) ? html`
                  <tr>
                    <td colspan="${this.columns.length + (this.selectable ? 1 : 0)}">
                      <div class="row-expand">
                        <slot name="expanded-row" .row="${row}"></slot>
                      </div>
                    </td>
                  </tr>
                ` : ''}
              `)}
            </tbody>
          </table>
        </div>
        ${this.pagination ? html`
          <div class="pagination-container">
            <span class="pagination-info">
              共 ${filteredData.length} 条
            </span>
            <div class="pagination">
              <button
                class="pagination-btn"
                ?disabled="${this.currentPage === 1}"
                @click="${() => this._handlePageChange(1)}"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
                </svg>
              </button>
              <button
                class="pagination-btn"
                ?disabled="${this.currentPage === 1}"
                @click="${() => this._handlePageChange(this.currentPage - 1)}"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              ${Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (this.currentPage <= 3) {
                  page = i + 1;
                } else if (this.currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = this.currentPage - 2 + i;
                }
                return html`
                  <button
                    class="pagination-btn ${this.currentPage === page ? 'active' : ''}"
                    @click="${() => this._handlePageChange(page)}"
                  >
                    ${page}
                  </button>
                `;
              })}
              <button
                class="pagination-btn"
                ?disabled="${this.currentPage === totalPages}"
                @click="${() => this._handlePageChange(this.currentPage + 1)}"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
              <button
                class="pagination-btn"
                ?disabled="${this.currentPage === totalPages}"
                @click="${() => this._handlePageChange(totalPages)}"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
                </svg>
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('p-table', PTable);
