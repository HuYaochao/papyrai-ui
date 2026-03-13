// Pagination - 纸张风格分页组件
// 属性: current(Number), total(Number), pageSize(Number), 
//       showSizeChanger(Boolean), pageSizeOptions(Array), showQuickJumper(Boolean)
// 事件: change({page, pageSize})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PPagination extends PapyraiElement {
  static properties = {
    current: { type: Number },
    total: { type: Number },
    pageSize: { type: Number },
    showSizeChanger: { type: Boolean },
    pageSizeOptions: { type: Array },
    showQuickJumper: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
      font-family: var(--font-mono, monospace);
    }

    .pagination-item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      padding: 0 var(--spacing-sm, 8px);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 6px);
      background: var(--paper-white, #fffef8);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    }

    .pagination-item:hover:not(:disabled) {
      border-color: var(--accent-red, #c4453c);
      color: var(--accent-red, #c4453c);
    }

    .pagination-item:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .pagination-item.active {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
      color: #fff;
    }

    .pagination-ellipsis {
      padding: 0 var(--spacing-xs, 4px);
      color: var(--ink-faint, #999);
    }

    .pagination-info {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      margin-left: var(--spacing-md, 16px);
      font-size: 0.85rem;
      color: var(--ink-faint, #999);
    }

    .pagination-size-select {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
    }

    .pagination-size-select select {
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 4px);
      background: var(--paper-white, #fffef8);
      font-family: var(--font-mono, monospace);
      font-size: 0.85rem;
      cursor: pointer;
    }

    .quick-jumper {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
      margin-left: var(--spacing-md, 16px);
    }

    .quick-jumper input {
      width: 48px;
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 4px);
      background: var(--paper-white, #fffef8);
      font-family: var(--font-mono, monospace);
      font-size: 0.85rem;
      text-align: center;
      outline: none;
    }

    .quick-jumper input:focus {
      border-color: var(--accent-red, #c4453c);
    }
  `;

  constructor() {
    super();
    this.current = 1;
    this.total = 0;
    this.pageSize = 10;
    this.showSizeChanger = false;
    this.pageSizeOptions = [10, 20, 50, 100];
    this.showQuickJumper = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _getTotalPages() {
    return Math.ceil(this.total / this.pageSize) || 1;
  }

  _getPages() {
    const total = this._getTotalPages();
    const current = this.current;
    const pages = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      } else if (current >= total - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = total - 3; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      }
    }

    return pages;
  }

  _handlePageClick = (page) => {
    if (page === '...' || page === this.current || page < 1 || page > this._getTotalPages()) return;
    this.current = page;
    this.emit('change', { page: this.current, pageSize: this.pageSize });
  };

  _handlePrev = () => {
    if (this.current > 1) {
      this.current--;
      this.emit('change', { page: this.current, pageSize: this.pageSize });
    }
  };

  _handleNext = () => {
    if (this.current < this._getTotalPages()) {
      this.current++;
      this.emit('change', { page: this.current, pageSize: this.pageSize });
    }
  };

  _handleSizeChange = (e) => {
    this.pageSize = parseInt(e.target.value);
    this.current = 1;
    this.emit('change', { page: this.current, pageSize: this.pageSize });
  };

  _handleQuickJump = (e) => {
    if (e.key === 'Enter') {
      const page = parseInt(e.target.value);
      if (page >= 1 && page <= this._getTotalPages()) {
        this.current = page;
        this.emit('change', { page: this.current, pageSize: this.pageSize });
      }
      e.target.value = '';
    }
  };

  _handleKeydown = (e) => {
    if (e.key === 'ArrowLeft' && this.current > 1) {
      this.current--;
      this.emit('change', { page: this.current, pageSize: this.pageSize });
    } else if (e.key === 'ArrowRight' && this.current < this._getTotalPages()) {
      this.current++;
      this.emit('change', { page: this.current, pageSize: this.pageSize });
    }
  };

  render() {
    return html`
      <div class="pagination">
        <button 
          class="pagination-item" 
          ?disabled="${this.current === 1}"
          @click="${this._handlePrev}"
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        ${this._getPages().map(page => {
          if (page === '...') {
            return html`<span class="pagination-ellipsis">...</span>`;
          }
          return html`
            <button 
              class="pagination-item ${page === this.current ? 'active' : ''}"
              @click="${() => this._handlePageClick(page)}"
              aria-label="Page ${page}"
              aria-current="${page === this.current ? 'page' : 'false'}"
            >
              ${page}
            </button>
          `;
        })}
        <button 
          class="pagination-item"
          ?disabled="${this.current === this._getTotalPages()}"
          @click="${this._handleNext}"
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
        ${this.showSizeChanger ? html`
          <div class="pagination-info">
            <span>每页</span>
            <select class="pagination-size-select" .value="${this.pageSize}" @change="${this._handleSizeChange}">
              ${this.pageSizeOptions.map(size => html`
                <option value="${size}">${size}</option>
              `)}
            </select>
            <span>条</span>
          </div>
        ` : ''}
        ${this.showQuickJumper ? html`
          <div class="quick-jumper">
            <span>跳至</span>
            <input type="number" min="1" max="${this._getTotalPages()}" @keydown="${this._handleQuickJump}" />
            <span>页</span>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('p-pagination', PPagination);
