// Vertical Navigation - 侧边栏垂直导航
// Features: 分组, 可折叠组, 活动项指示器, 图标支持

import { PapyraiElement, html, css } from '../../core/base.js';

export class PVerticalNavigation extends PapyraiElement {
  static properties = {
    items: { type: Array },
    value: { type: String },
    label: { type: String },
    collapsible: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .vertical-nav {
      display: flex;
      flex-direction: column;
      background: var(--paper-cream, #f8f1e5);
      border-right: 1px solid var(--paper-border, #d9ccb8);
      min-width: 220px;
    }

    :host([dark]) .vertical-nav {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .nav-header {
      padding: var(--spacing-md, 16px);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    .nav-title {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ink-faint, #9a9590);
      font-family: var(--font-mono, monospace);
    }

    .nav-group {
      display: flex;
      flex-direction: column;
    }

    .group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      cursor: pointer;
      color: var(--ink-faint, #9a9590);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: background 0.15s ease;
    }

    .group-header:hover {
      background: var(--ink-faint, #e8e5e0);
    }

    :host([dark]) .group-header:hover {
      background: var(--ink-dark, #4a4540);
    }

    .group-toggle {
      width: 16px;
      height: 16px;
      transition: transform 0.15s ease;
    }

    .group-toggle[collapsed] {
      transform: rotate(-90deg);
    }

    .group-items {
      display: flex;
      flex-direction: column;
    }

    .group-items[collapsed] {
      display: none;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      padding-left: var(--spacing-lg, 24px);
      cursor: pointer;
      color: var(--ink-black, #1f1a15);
      font-size: 0.9rem;
      transition: all 0.15s ease;
      position: relative;
      border: none;
      background: none;
      text-align: left;
      width: 100%;
    }

    :host([dark]) .nav-item {
      color: var(--paper-white, #f5f0e8);
    }

    .nav-item:hover {
      background: var(--ink-faint, #e8e5e0);
    }

    :host([dark]) .nav-item:hover {
      background: var(--ink-dark, #4a4540);
    }

    .nav-item[aria-current="true"] {
      background: var(--accent-red, #c4453c);
      color: white;
    }

    .nav-item:focus {
      outline: none;
    }

    .nav-item:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: -2px;
    }

    .item-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .item-icon svg {
      width: 18px;
      height: 18px;
    }

    .item-label {
      flex: 1;
    }

    .item-badge {
      font-size: 0.7rem;
      padding: 2px 6px;
      background: var(--accent-red, #c4453c);
      color: white;
      border-radius: var(--radius-sm, 4px);
      font-weight: 600;
    }

    .active-indicator {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--accent-red, #c4453c);
      border-radius: 0 2px 2px 0;
    }

    [hidden] {
      display: none !important;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.value = '';
    this.label = 'Navigation';
    this.collapsible = true;
    this._collapsedGroups = new Set();
  }

  _toggleGroup(index) {
    if (!this.collapsible) return;
    
    if (this._collapsedGroups.has(index)) {
      this._collapsedGroups.delete(index);
    } else {
      this._collapsedGroups.add(index);
    }
    this.requestUpdate();
  }

  _handleItemClick(item) {
    this.value = item.value;
    this.emit('change', { value: item.value, item });
  }

  _getIcon(name) {
    const icons = {
      home: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
      search: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
      settings: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
      user: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
      folder: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
      file: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
      star: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
      chart: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`
    };
    return icons[name] || icons.home;
  }

  _renderItems(items, indent = false) {
    return items.map(item => html`
      <button
        class="nav-item"
        role="menuitem"
        aria-current=${this.value === item.value ? 'true' : 'false'}
        @click=${() => this._handleItemClick(item)}
      >
        ${this.value === item.value ? html`<span class="active-indicator"></span>` : ''}
        ${item.icon ? html`<span class="item-icon">${this._getIcon(item.icon)}</span>` : ''}
        <span class="item-label">${item.label}</span>
        ${item.badge ? html`<span class="item-badge">${item.badge}</span>` : ''}
      </button>
    `);
  }

  render() {
    return html`
      <nav class="vertical-nav" role="navigation" aria-label=${this.label}>
        ${this.items.map((group, index) => html`
          <div class="nav-group">
            ${group.group ? html`
              <div class="group-header" @click=${() => this._toggleGroup(index)}>
                <span>${group.group}</span>
                ${this.collapsible ? html`
                  <svg 
                    class="group-toggle" 
                    ?collapsed=${this._collapsedGroups.has(index)}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                ` : ''}
              </div>
            ` : ''}
            <div class="group-items" ?collapsed=${this._collapsedGroups.has(index)}>
              ${this._renderItems(group.items, !!group.group)}
            </div>
          </div>
        `)}
      </nav>
    `;
  }
}

customElements.define('p-vertical-nav', PVerticalNavigation);
