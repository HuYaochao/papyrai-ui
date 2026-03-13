// Bottom Tabs - 移动端底部标签栏
// Features: 固定底部, 图标+标签, 徽章支持, 键盘导航

import { PapyraiElement, html, css } from '../../core/base.js';

export class BBottomTabs extends PapyraiElement {
  static properties = {
    items: { type: Array },
    value: { type: String },
    label: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .bottom-tabs {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: var(--paper-cream, #f8f1e5);
      border-top: 1px solid var(--paper-border, #d9ccb8);
      padding: var(--spacing-xs, 4px) 0;
      padding-bottom: env(safe-area-inset-bottom, 8px);
      z-index: 100;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.08);
    }

    :host([dark]) .bottom-tabs {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .tab {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--ink-faint, #9a9590);
      transition: color 0.15s ease;
      position: relative;
      min-width: 48px;
      gap: 2px;
    }

    .tab:hover {
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .tab:hover {
      color: var(--paper-white, #f5f0e8);
    }

    .tab[aria-selected="true"] {
      color: var(--accent-red, #c4453c);
    }

    .tab:focus {
      outline: none;
    }

    .tab:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: -2px;
      border-radius: var(--radius-sm, 4px);
    }

    .tab-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tab-icon svg {
      width: 20px;
      height: 20px;
    }

    .tab-label {
      font-size: 0.7rem;
      font-family: var(--font-handwrite, cursive);
    }

    .badge {
      position: absolute;
      top: 2px;
      right: 50%;
      transform: translateX(12px);
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      background: var(--accent-red, #c4453c);
      color: white;
      font-size: 0.65rem;
      font-weight: 600;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .active-indicator {
      position: absolute;
      bottom: 4px;
      width: 20px;
      height: 3px;
      background: var(--accent-red, #c4453c);
      border-radius: 2px;
    }

    [hidden] {
      display: none !important;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.value = '';
    this.label = 'Bottom Tabs';
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleKeydown = this._handleKeydown.bind(this);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _handleKeydown(e) {
    const tabs = this.shadowRoot.querySelectorAll('.tab');
    const currentIndex = Array.from(tabs).findIndex(t => t === this.shadowRoot.activeElement);

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      tabs[prevIndex].focus();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      tabs[nextIndex].focus();
    }
  }

  _handleTabClick(item) {
    this.value = item.value;
    this.emit('change', { value: item.value, item });
  }

  _getIcon(name) {
    const icons = {
      home: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
      search: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
      settings: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
      user: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
      bell: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
      star: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
    };
    return icons[name] || icons.home;
  }

  render() {
    return html`
      <div class="bottom-tabs" role="tablist" aria-label=${this.label}>
        ${this.items.map(item => html`
          <button
            class="tab"
            role="tab"
            aria-selected=${this.value === item.value}
            aria-label=${item.label || item.value}
            @click=${() => this._handleTabClick(item)}
          >
            <span class="tab-icon">${item.icon ? this._getIcon(item.icon) : ''}</span>
            ${item.label ? html`<span class="tab-label">${item.label}</span>` : ''}
            ${item.badge ? html`<span class="badge">${item.badge}</span>` : ''}
            ${this.value === item.value ? html`<span class="active-indicator"></span>` : ''}
          </button>
        `)}
      </div>
    `;
  }
}

customElements.define('p-bottom-tabs', BBottomTabs);
