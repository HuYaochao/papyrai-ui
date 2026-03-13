// Tabs - 纸张风格标签页
// 属性: active(String), variant(String: 'line'|'pills'|'enclosed'), 
//       size(String: 'sm'|'md'|'lg'), closable(Boolean)
// 插槽: default(包含p-tab元素)
// 事件: change({active})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PTabs extends PapyraiElement {
  static properties = {
    active: { type: String },
    variant: { type: String },
    size: { type: String, reflect: true },
    closable: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .tabs-container {
      display: flex;
      flex-direction: column;
    }

    .tabs-list {
      display: flex;
      gap: var(--spacing-xs, 4px);
      border-bottom: 1.5px solid var(--paper-border, #d9ccb8);
      overflow-x: auto;
      scrollbar-width: thin;
    }

    .tab {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 6px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      font-family: var(--font-serif, serif);
      font-size: 0.95rem;
      color: var(--ink-faint, #999);
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      position: relative;
    }

    .tab:hover {
      color: var(--ink-black, #1f1a15);
    }

    .tab.active {
      color: var(--accent-red, #c4453c);
      border-bottom-color: var(--accent-red, #c4453c);
    }

    .tab:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: -2px;
    }

    /* Variants */
    :host([variant="pills"]) .tabs-list {
      border-bottom: none;
      background: var(--paper-cream, #f8f1e5);
      padding: var(--spacing-xs, 4px);
      border-radius: var(--radius-md, 10px);
    }

    :host([variant="pills"]) .tab {
      border-bottom: none;
      border-radius: var(--radius-sm, 6px);
    }

    :host([variant="pills"]) .tab.active {
      background: var(--paper-white, #fffef8);
      box-shadow: var(--elevation-1, 0 2px 4px rgba(0,0,0,.08));
    }

    :host([variant="enclosed"]) .tabs-list {
      border-bottom: none;
    }

    :host([variant="enclosed"]) .tab {
      border: 1.5px solid transparent;
      border-bottom: none;
      border-radius: var(--radius-md, 10px) var(--radius-md, 10px) 0 0;
    }

    :host([variant="enclosed"]) .tab.active {
      background: var(--paper-white, #fffef8);
      border-color: var(--paper-border, #d9ccb8);
      border-bottom-color: var(--paper-white, #fffef8);
    }

    /* Sizes */
    :host([size="sm"]) .tab {
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 10px);
      font-size: 0.85rem;
    }

    :host([size="lg"]) .tab {
      padding: var(--spacing-md, 12px) var(--spacing-lg, 20px);
      font-size: 1.05rem;
    }

    /* Close button */
    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border: none;
      background: transparent;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.2s ease;
      padding: 0;
    }

    .close-btn:hover {
      opacity: 1;
      background: var(--status-error, rgba(220, 38, 38, 0.1));
    }

    .close-btn svg {
      width: 12px;
      height: 12px;
      stroke: var(--ink-faint, #999);
      stroke-width: 2;
      fill: none;
    }

    /* Panels */
    .tab-panels {
      padding-top: var(--spacing-md, 16px);
    }

    .tab-panel {
      display: none;
    }

    .tab-panel.active {
      display: block;
    }
  `;

  constructor() {
    super();
    this.active = '';
    this.variant = 'line';
    this.size = 'md';
    this.closable = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tablist');
    this.addEventListener('keydown', this._handleKeydown);
    
    // Auto-activate first tab if none specified
    this.updateComplete.then(() => {
      if (!this.active) {
        const tabs = this._getTabs();
        if (tabs.length > 0) {
          this.active = tabs[0].value || '0';
        }
      }
    });
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _getTabs() {
    return Array.from(this.querySelectorAll('p-tab'));
  }

  _getPanels() {
    return Array.from(this.querySelectorAll('p-tab-panel'));
  }

  _activateTab(tab) {
    const value = tab.value || tab.getAttribute('value') || tab.dataset.value;
    if (!value) return;
    
    this.active = value;
    
    // Update tabs
    this._getTabs().forEach(t => {
      const tVal = t.value || t.getAttribute('value') || t.dataset.value;
      t.classList.toggle('active', tVal === value);
    });
    
    // Update panels
    this._getPanels().forEach(p => {
      const pVal = p.value || p.getAttribute('value') || p.dataset.value;
      p.classList.toggle('active', pVal === value);
    });
    
    this.emit('change', { active: value });
  }

  _handleKeydown = (e) => {
    const tabs = this._getTabs();
    const currentIndex = tabs.findIndex(tab => {
      const val = tab.value || tab.getAttribute('value') || tab.dataset.value;
      return val === this.active;
    });

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      tabs[nextIndex].focus();
      this._activateTab(tabs[nextIndex]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      tabs[prevIndex].focus();
      this._activateTab(tabs[prevIndex]);
    }
  };

  _handleTabClick = (e) => {
    const tab = e.target.closest('.tab');
    if (tab) {
      this._activateTab(tab);
    }
  };

  _handleClose = (e, tabValue) => {
    e.stopPropagation();
    this.emit('close', { value: tabValue });
  };

  render() {
    return html`
      <div class="tabs-container" @click="${this._handleTabClick}">
        <div class="tabs-list" role="tablist">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export class PTab extends PapyraiElement {
  static properties = {
    value: { type: String },
    label: { type: String },
    disabled: { type: Boolean, reflect: true },
    closable: { type: Boolean }
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    .tab {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 6px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      font-family: var(--font-serif, serif);
      font-size: 0.95rem;
      color: var(--ink-faint, #999);
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      position: relative;
    }

    :host([disabled]) .tab {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host(.active) .tab {
      color: var(--accent-red, #c4453c);
      border-bottom-color: var(--accent-red, #c4453c);
    }

    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border: none;
      background: transparent;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.2s ease;
      padding: 0;
    }

    .close-btn:hover {
      opacity: 1;
      background: var(--status-error, rgba(220, 38, 38, 0.1));
    }

    .close-btn svg {
      width: 12px;
      height: 12px;
      stroke: var(--ink-faint, #999);
      stroke-width: 2;
      fill: none;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.label = '';
    this.disabled = false;
    this.closable = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tab');
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
  }

  render() {
    return html`
      <button 
        class="tab" 
        ?disabled="${this.disabled}"
        aria-selected="${this.classList.contains('active')}"
      >
        <slot>${this.label}</slot>
        ${this.closable ? html`
          <span class="close-btn" @click="${(e) => this.dispatchEvent(new CustomEvent('tab-close', { bubbles: true, composed: true, detail: { value: this.value } }))}">
            <svg viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </span>
        ` : ''}
      </button>
    `;
  }
}

export class PTabPanel extends PapyraiElement {
  static properties = {
    value: { type: String },
    label: { type: String }
  };

  static styles = css`
    :host {
      display: none;
    }

    :host(.active) {
      display: block;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.label = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tabpanel');
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('p-tabs', PTabs);
customElements.define('p-tab', PTab);
customElements.define('p-tab-panel', PTabPanel);
