// Order List - 拖拽排序列表
// Features: 拖拽重排序, 手柄图标, 键盘排序(alt+箭头), 编号显示

import { PapyraiElement, html, css } from '../../core/base.js';

export class POrderList extends PapyraiElement {
  static properties = {
    items: { type: Array },
    value: { type: Array },
    numbered: { type: Boolean },
    handle: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .order-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs, 4px);
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 8px);
      padding: var(--spacing-sm, 8px);
    }

    :host([dark]) .order-list {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .order-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      background: var(--paper-white, #ffffff);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 6px);
      cursor: grab;
      transition: all 0.15s ease;
      user-select: none;
    }

    .order-item:hover {
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0, 0, 0, 0.08));
    }

    .order-item.dragging {
      opacity: 0.5;
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0, 0, 0, 0.15));
    }

    .order-item.drag-over {
      border-color: var(--accent-red, #c4453c);
      background: rgba(196, 69, 60, 0.05);
    }

    :host([dark]) .order-item {
      background: var(--ink-dark, #4a4540);
      border-color: var(--ink-faint, #5a5550);
    }

    .item-handle {
      width: 16px;
      height: 16px;
      color: var(--ink-faint, #9a9590);
      flex-shrink: 0;
      cursor: grab;
    }

    .item-handle:active {
      cursor: grabbing;
    }

    .item-number {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-family: var(--font-mono, monospace);
      font-weight: 600;
      color: var(--ink-faint, #9a9590);
      background: var(--ink-faint, #e8e5e0);
      border-radius: 50%;
      flex-shrink: 0;
    }

    :host([dark]) .item-number {
      background: var(--ink-dark, #5a5550);
      color: var(--paper-white, #f5f0e8);
    }

    .item-content {
      flex: 1;
      color: var(--ink-black, #1f1a15);
      font-size: 0.9rem;
    }

    :host([dark]) .item-content {
      color: var(--paper-white, #f5f0e8);
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.value = [];
    this.numbered = false;
    this.handle = true;
    this._draggedIndex = null;
    this._dragOverIndex = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  _handleDragStart(e, index) {
    this._draggedIndex = index;
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  }

  _handleDragOver(e, index) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (this._dragOverIndex !== index) {
      this._dragOverIndex = index;
      this.requestUpdate();
    }
  }

  _handleDragLeave() {
    this._dragOverIndex = null;
    this.requestUpdate();
  }

  _handleDrop(e, index) {
    e.preventDefault();
    if (this._draggedIndex === null || this._draggedIndex === index) {
      return;
    }

    const newItems = [...this.items];
    const [draggedItem] = newItems.splice(this._draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);

    this.items = newItems;
    this.emit('order-change', { items: newItems, from: this._draggedIndex, to: index });

    this._draggedIndex = null;
    this._dragOverIndex = null;
  }

  _handleDragEnd(e) {
    e.target.classList.remove('dragging');
    this._draggedIndex = null;
    this._dragOverIndex = null;
  }

  _handleKeydown(e) {
    const activeIndex = this.items.findIndex(item => item.value === document.activeElement?.dataset?.value);
    if (activeIndex === -1) return;

    if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault();
      this._moveItem(activeIndex, activeIndex - 1);
    } else if (e.altKey && e.key === 'ArrowDown') {
      e.preventDefault();
      this._moveItem(activeIndex, activeIndex + 1);
    }
  }

  _moveItem(from, to) {
    if (to < 0 || to >= this.items.length) return;

    const newItems = [...this.items];
    const [item] = newItems.splice(from, 1);
    newItems.splice(to, 0, item);
    this.items = newItems;
    this.emit('order-change', { items: newItems, from, to });
  }

  render() {
    return html`
      <div class="order-list" role="list" aria-label="Order list">
        ${this.items.map((item, index) => html`
          <div 
            class="order-item ${this._draggedIndex === index ? 'dragging' : ''} ${this._dragOverIndex === index ? 'drag-over' : ''}"
            draggable="true"
            role="listitem"
            data-value=${item.value}
            @dragstart=${(e) => this._handleDragStart(e, index)}
            @dragover=${(e) => this._handleDragOver(e, index)}
            @dragleave=${this._handleDragLeave}
            @drop=${(e) => this._handleDrop(e, index)}
            @dragend=${this._handleDragEnd}
          >
            ${this.handle ? html`
              <svg class="item-handle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="5" r="1"></circle>
                <circle cx="9" cy="12" r="1"></circle>
                <circle cx="9" cy="19" r="1"></circle>
                <circle cx="15" cy="5" r="1"></circle>
                <circle cx="15" cy="12" r="1"></circle>
                <circle cx="15" cy="19" r="1"></circle>
              </svg>
            ` : ''}
            ${this.numbered ? html`<span class="item-number">${index + 1}</span>` : ''}
            <span class="item-content">${item.label || item.value}</span>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('p-order-list', POrderList);
