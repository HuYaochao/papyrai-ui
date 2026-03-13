// Context Menu - 右键菜单
// Features: 右键触发, 嵌套子菜单, 键盘导航, 分隔符

import { PapyraiElement, html, css } from '../../core/base.js';

export class PContextMenu extends PapyraiElement {
  static properties = {
    items: { type: Array },
    open: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: contents;
    }

    .context-menu {
      position: fixed;
      z-index: 3000;
      min-width: 180px;
      max-width: 280px;
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 8px);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0, 0, 0, 0.15));
      padding: var(--spacing-xs, 4px) 0;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95);
      transition: all 0.1s ease;
    }

    :host([open]) .context-menu {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    :host([dark]) .context-menu {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      cursor: pointer;
      color: var(--ink-black, #1f1a15);
      font-size: 0.875rem;
      font-family: var(--font-serif, serif);
      transition: background 0.1s ease;
      border: none;
      background: none;
      text-align: left;
      width: 100%;
    }

    :host([dark]) .menu-item {
      color: var(--paper-white, #f5f0e8);
    }

    .menu-item:hover, .menu-item:focus {
      background: var(--ink-faint, #e8e5e0);
      outline: none;
    }

    :host([dark]) .menu-item:hover,
    :host([dark]) .menu-item:focus {
      background: var(--ink-dark, #4a4540);
    }

    .menu-item[aria-disabled="true"] {
      opacity: 0.5;
      pointer-events: none;
    }

    .menu-item-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-item-icon svg {
      width: 14px;
      height: 14px;
    }

    .menu-item-label {
      flex: 1;
    }

    .menu-item-shortcut {
      font-size: 0.7rem;
      color: var(--ink-faint, #9a9590);
      font-family: var(--font-mono, monospace);
    }

    .menu-item-expand {
      width: 16px;
      height: 16px;
      color: var(--ink-faint, #9a9590);
    }

    .menu-divider {
      height: 1px;
      background: var(--paper-border, #d9ccb8);
      margin: var(--spacing-xs, 4px) 0;
    }

    :host([dark]) .menu-divider {
      background: var(--ink-faint, #5a5550);
    }

    .menu-group-label {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ink-faint, #9a9590);
      padding: var(--spacing-xs, 4px) var(--spacing-md, 12px);
      font-family: var(--font-mono, monospace);
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.open = false;
    this._x = 0;
    this._y = 0;
    this._handleClickOutside = this._handleClickOutside.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('contextmenu', this._handleContextMenu);
    document.addEventListener('click', this._handleClickOutside);
    document.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('contextmenu', this._handleContextMenu);
    document.removeEventListener('click', this._handleClickOutside);
    document.removeEventListener('keydown', this._handleKeydown);
  }

  _handleContextMenu = (e) => {
    e.preventDefault();
    this._x = e.clientX;
    this._y = e.clientY;
    this.open = true;
    this.emit('menu-show', { x: this._x, y: this._y });
  };

  _handleClickOutside = () => {
    if (this.open) {
      this.open = false;
      this.emit('menu-hide');
    }
  };

  _handleKeydown(e) {
    if (!this.open) return;

    if (e.key === 'Escape') {
      this.open = false;
      this.emit('menu-hide');
    }
  }

  _handleItemClick(item) {
    if (item.disabled) return;
    this.emit('item-click', { item });
    this.open = false;
    this.emit('menu-hide');
  }

  _getIcon(name) {
    const icons = {
      copy: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
      cut: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>`,
      paste: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`,
      delete: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
      refresh: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
      download: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
      edit: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
      view: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
      info: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
      settings: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
    };
    return icons[name];
  }

  render() {
    return html`
      <div 
        class="context-menu"
        style="left: ${this._x}px; top: ${this._y}px;"
        role="menu"
      >
        ${this.items.map(item => {
          if (item.divider) {
            return html`<div class="menu-divider"></div>`;
          }
          if (item.group) {
            return html`<div class="menu-group-label">${item.group}</div>`;
          }
          return html`
            <button
              class="menu-item"
              role="menuitem"
              aria-disabled=${item.disabled ? 'true' : 'false'}
              @click=${() => this._handleItemClick(item)}
            >
              ${item.icon ? html`<span class="menu-item-icon">${this._getIcon(item.icon)}</span>` : ''}
              <span class="menu-item-label">${item.label}</span>
              ${item.shortcut ? html`<span class="menu-item-shortcut">${item.shortcut}</span>` : ''}
              ${item.children ? html`<span class="menu-item-expand">▶</span>` : ''}
            </button>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('p-context-menu', PContextMenu);
