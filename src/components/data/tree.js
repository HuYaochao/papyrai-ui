// Tree - 纸张风格树形组件
// 属性: data(Array), selectable(Boolean), multiple(Boolean), 
//       checkable(Boolean), defaultExpandAll(Boolean), 
//       expandedKeys(Array), selectedKeys(Array), checkedKeys(Array)
// 事件: select({selectedKeys, node}), check({checkedKeys, node}),
//       expand({expandedKeys, node}), load-data({node}

import { PapyraiElement, html, css } from '../../core/base.js';

export class PTree extends PapyraiElement {
  static properties = {
    data: { type: Array },
    selectable: { type: Boolean },
    multiple: { type: Boolean },
    checkable: { type: Boolean },
    defaultExpandAll: { type: Boolean },
    expandedKeys: { type: Array },
    selectedKeys: { type: Array },
    checkedKeys: { type: Array },
    showLine: { type: Boolean },
    indent: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: var(--font-serif, serif);
    }

    .tree {
      padding: var(--spacing-xs, 4px);
    }

    .tree-node {
      user-select: none;
    }

    .tree-node-content {
      display: flex;
      align-items: center;
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      border-radius: var(--radius-sm, 6px);
      cursor: pointer;
      transition: all 0.15s ease;
      gap: var(--spacing-xs, 4px);
    }

    .tree-node-content:hover {
      background: var(--paper-border, #d9ccb8);
    }

    .tree-node-content.selected {
      background: rgba(196, 69, 60, 0.15);
      color: var(--accent-red, #c4453c);
    }

    .tree-node-content.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .tree-expand-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: var(--ink-faint, #999);
      transition: transform 0.2s ease;
      flex-shrink: 0;
    }

    .tree-expand-icon.expanded {
      transform: rotate(90deg);
    }

    .tree-expand-icon.loading {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .tree-checkbox {
      width: 16px;
      height: 16px;
      margin-right: var(--spacing-xs, 4px);
      accent-color: var(--accent-red, #c4453c);
      cursor: pointer;
      flex-shrink: 0;
    }

    .tree-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-right: var(--spacing-xs, 4px);
      color: var(--ink-faint, #999);
      flex-shrink: 0;
    }

    .tree-title {
      flex: 1;
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tree-node.selected .tree-title {
      color: var(--accent-red, #c4453c);
      font-weight: 500;
    }

    .tree-children {
      margin-left: var(--spacing-md, 20px);
      overflow: hidden;
    }

    .tree-children.hidden {
      display: none;
    }

    .tree-line {
      position: relative;
      padding-left: var(--spacing-sm, 12px);
    }

    .tree-line::before {
      content: '';
      position: absolute;
      left: 9px;
      top: 0;
      bottom: 8px;
      width: 1px;
      background: var(--paper-border, #d9ccb8);
    }

    .tree-node:last-child > .tree-line::before {
      height: 12px;
    }

    .tree-node:last-child > .tree-line::after {
      content: '';
      position: absolute;
      left: 9px;
      top: 12px;
      width: 12px;
      height: 1px;
      background: var(--paper-border, #d9ccb8);
    }

    .tree-switcher-line {
      position: absolute;
      left: 9px;
      top: 12px;
      width: 12px;
      height: 1px;
      background: var(--paper-border, #d9ccb8);
    }

    .empty-state {
      padding: var(--spacing-md, 16px);
      text-align: center;
      color: var(--ink-faint, #999);
      font-style: italic;
    }
  `;

  constructor() {
    super();
    this.data = [];
    this.selectable = true;
    this.multiple = false;
    this.checkable = false;
    this.defaultExpandAll = false;
    this.expandedKeys = [];
    this.selectedKeys = [];
    this.checkedKeys = [];
    this.showLine = false;
    this.indent = 20;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.defaultExpandAll) {
      this._expandAll();
    }
  }

  _expandAll() {
    const keys = [];
    const traverse = (nodes) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          keys.push(node.key);
          traverse(node.children);
        }
      });
    };
    traverse(this.data);
    this.expandedKeys = keys;
  }

  _findNode(key, nodes = this.data) {
    for (const node of nodes) {
      if (node.key === key) return node;
      if (node.children) {
        const found = this._findNode(key, node.children);
        if (found) return found;
      }
    }
    return null;
  }

  _isExpanded(key) {
    return this.expandedKeys.includes(key);
  }

  _isSelected(key) {
    return this.selectedKeys.includes(key);
  }

  _isChecked(key) {
    return this.checkedKeys.includes(key);
  }

  _isLeaf(node) {
    return !node.children || node.children.length === 0;
  }

  _toggleExpand(key, node) {
    if (this._isExpanded(key)) {
      this.expandedKeys = this.expandedKeys.filter(k => k !== key);
    } else {
      this.expandedKeys = [...this.expandedKeys, key];
      if (node && node.isLeaf === false && !node.children) {
        this.emit('load-data', { node });
      }
    }
    this.emit('expand', { expandedKeys: this.expandedKeys, node });
  }

  _handleSelect(key, node) {
    if (node.disabled) return;

    if (this.multiple) {
      if (this._isSelected(key)) {
        this.selectedKeys = this.selectedKeys.filter(k => k !== key);
      } else {
        this.selectedKeys = [...this.selectedKeys, key];
      }
    } else {
      this.selectedKeys = [key];
    }

    this.emit('select', { selectedKeys: this.selectedKeys, node });
  }

  _handleCheck(key, node) {
    if (node.disabled) return;

    const checked = this._isChecked(key);
    const newCheckedKeys = checked
      ? this.checkedKeys.filter(k => k !== key)
      : [...this.checkedKeys, key];

    this._updateChildChecked(key, !checked);
    this._updateParentChecked(key);

    this.checkedKeys = newCheckedKeys;
    this.emit('check', { checkedKeys: this.checkedKeys, node });
  }

  _updateChildChecked(key, checked) {
    const node = this._findNode(key);
    if (!node || !node.children) return;

    node.children.forEach(child => {
      if (checked) {
        if (!this.checkedKeys.includes(child.key)) {
          this.checkedKeys = [...this.checkedKeys, child.key];
        }
      } else {
        this.checkedKeys = this.checkedKeys.filter(k => k !== child.key);
      }
      this._updateChildChecked(child.key, checked);
    });
  }

  _updateParentChecked(key) {
    const node = this._findNode(key);
    if (!node || !node.parentKey) return;

    const parent = this._findNode(node.parentKey);
    if (!parent || !parent.children) return;

    const allChecked = parent.children.every(child => this.checkedKeys.includes(child.key));
    const someChecked = parent.children.some(child => this.checkedKeys.includes(child.key));

    if (allChecked) {
      if (!this.checkedKeys.includes(parent.key)) {
        this.checkedKeys = [...this.checkedKeys, parent.key];
      }
    } else if (!someChecked) {
      this.checkedKeys = this.checkedKeys.filter(k => k !== parent.key);
    }
  }

  _handleExpandIconClick(key, node) {
    this._toggleExpand(key, node);
  }

  _renderNode(node, level = 0) {
    const key = node.key;
    const expanded = this._isExpanded(key);
    const selected = this._isSelected(key);
    const checked = this._isChecked(key);
    const isLeaf = this._isLeaf(node);

    const indentStyle = `padding-left: ${level * this.indent}px`;

    return html`
      <div class="tree-node ${selected ? 'selected' : ''}">
        <div
          class="tree-node-content ${selected ? 'selected' : ''} ${node.disabled ? 'disabled' : ''}"
          style="${indentStyle}"
          role="treeitem"
          aria-expanded="${!isLeaf ? expanded : undefined}"
          aria-selected="${this.selectable ? selected : undefined}"
          aria-checked="${this.checkable ? checked : undefined}"
          @click="${(e) => {
            e.stopPropagation();
            if (this.checkable && !node.disabled) {
              this._handleCheck(key, node);
            }
            if (this.selectable && !node.disabled) {
              this._handleSelect(key, node);
            }
          }}"
        >
          ${!isLeaf ? html`
            <span
              class="tree-expand-icon ${expanded ? 'expanded' : ''} ${node.loading ? 'loading' : ''}"
              @click="${(e) => {
                e.stopPropagation();
                this._handleExpandIconClick(key, node);
              }}"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </span>
          ` : html`<span class="tree-expand-icon"></span>`}

          ${this.checkable ? html`
            <input
              type="checkbox"
              class="tree-checkbox"
              ?checked="${checked}"
              ?disabled="${node.disabled}"
              @click="${e => e.stopPropagation()}"
              @change="${() => this._handleCheck(key, node)}"
            />
          ` : ''}

          ${node.icon ? html`
            <span class="tree-icon">
              ${node.icon}
            </span>
          ` : ''}

          <span class="tree-title">${node.title}</span>
        </div>

        ${node.children && node.children.length > 0 ? html`
          <div class="tree-children ${expanded ? '' : 'hidden'}">
            ${node.children.map(child => this._renderNode({...child, parentKey: key}, level + 1))}
          </div>
        ` : ''}
      </div>
    `;
  }

  render() {
    if (!this.data || this.data.length === 0) {
      return html`<div class="empty-state">暂无数据</div>`;
    }

    return html`
      <div class="tree" role="tree">
        ${this.data.map(node => this._renderNode(node))}
      </div>
    `;
  }
}

customElements.define('p-tree', PTree);
