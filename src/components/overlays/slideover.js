// Slideover - 侧边栏面板
// Features: 左侧/右侧, 遮罩背景, 关闭按钮, 过渡动画

import { PapyraiElement, html, css } from '../../core/base.js';

export class PSlideover extends PapyraiElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    label: { type: String },
    placement: { type: String },
    width: { type: String },
    backdrop: { type: Boolean }
  };

  static styles = css`
    :host {
      display: contents;
    }

    .slideover {
      position: fixed;
      top: 0;
      bottom: 0;
      width: var(--slideover-width, 400px);
      max-width: 90vw;
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease;
    }

    :host([placement="right"]) .slideover {
      right: 0;
      transform: translateX(100%);
    }

    :host([placement="left"]) .slideover {
      left: 0;
      transform: translateX(-100%);
    }

    :host([dark]) .slideover {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    :host([open]) .slideover {
      transform: translateX(0);
    }

    /* Paper texture */
    .slideover::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
    }

    .slideover-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    :host([dark]) .slideover-header {
      border-color: var(--ink-fount, #5a5550);
    }

    .slideover-title {
      font-family: var(--font-serif, serif);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--ink-black, #1f1a15);
      margin: 0;
    }

    :host([dark]) .slideover-title {
      color: var(--paper-white, #f5f0e8);
    }

    .slideover-close {
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm, 6px);
      color: var(--ink-faint, #9a9590);
      transition: background 0.15s ease, color 0.15s ease;
    }

    .slideover-close:hover {
      background: var(--ink-faint, #e8e5e0);
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .slideover-close:hover {
      background: var(--ink-dark, #4a4540);
      color: var(--paper-white, #f5f0e8);
    }

    .slideover-close svg {
      width: 18px;
      height: 18px;
    }

    .slideover-body {
      flex: 1;
      padding: var(--spacing-lg, 24px);
      overflow-y: auto;
      font-family: var(--font-serif, serif);
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .slideover-body {
      color: var(--paper-white, #f5f0e8);
    }

    .slideover-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      border-top: 1px solid var(--paper-border, #d9ccb8);
    }

    :host([dark]) .slideover-footer {
      border-color: var(--ink-faint, #5a5550);
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
    }

    :host([open]) .backdrop {
      opacity: 1;
      visibility: visible;
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.label = 'Slideover';
    this.placement = 'right';
    this.width = '400px';
    this.backdrop = true;
    this._handleEscape = this._handleEscape.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleEscape);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleEscape);
    this._enableScroll();
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._disableScroll();
        this.emit('slideover-show');
      } else {
        this._enableScroll();
        this.emit('slideover-hide');
      }
    }
  }

  _handleEscape = (e) => {
    if (this.open && e.key === 'Escape') {
      this.close();
    }
  };

  _disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  _enableScroll() {
    document.body.style.overflow = '';
  }

  _handleBackdropClick() {
    if (this.backdrop) {
      this.close();
    }
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  render() {
    return html`
      <div class="backdrop" @click=${this._handleBackdropClick}></div>
      <aside 
        class="slideover"
        role="dialog"
        aria-modal="true"
        aria-label=${this.label}
        style="--slideover-width: ${this.width}"
      >
        <header class="slideover-header">
          <h2 class="slideover-title">${this.label}</h2>
          <button 
            class="slideover-close"
            @click=${this.close}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>
        <div class="slideover-body">
          <slot></slot>
        </div>
        <footer class="slideover-footer" hidden=${!this.querySelector('[slot="footer"]')}>
          <slot name="footer"></slot>
        </footer>
      </aside>
    `;
  }
}

customElements.define('p-slideover', PSlideover);
