// Modal Component - 纸张浮雕风格的对话框
// Features: open/close transitions, backdrop, focus trap, escape to close, scroll lock, sizes, stacking

import { PapyraiElement, html, css } from '../../core/base.js';

export class PModal extends PapyraiElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    label: { type: String },
    size: { type: String }, // 'sm' | 'md' | 'lg' | 'full'
    backdropClosable: { type: Boolean },
    scrollLock: { type: Boolean },
    closeOnEscape: { type: Boolean }
  };

  static styles = css`
    :host {
      display: contents;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
    }

    :host([open]) .backdrop {
      opacity: 1;
      visibility: visible;
    }

    .modal {
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-lg, 12px);
      box-shadow: var(--elevation-3, 0 12px 32px rgba(0, 0, 0, 0.15));
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      transform: scale(0.95) translateY(-10px);
      transition: transform 0.2s ease;
      position: relative;
    }

    :host([open]) .modal {
      transform: scale(1) translateY(0);
    }

    :host([dark]) .modal {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .modal[size="sm"] {
      width: 400px;
      max-width: 90vw;
    }

    .modal[size="md"] {
      width: 600px;
      max-width: 90vw;
    }

    .modal[size="lg"] {
      width: 800px;
      max-width: 90vw;
    }

    .modal[size="full"] {
      width: 95vw;
      height: 95vh;
    }

    /* Paper texture overlay */
    .modal::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    .title {
      font-family: var(--font-serif, serif);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--ink-black, #1f1a15);
      margin: 0;
    }

    :host([dark]) .title {
      color: var(--paper-white, #f5f0e8);
    }

    .close-btn {
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

    .close-btn:hover {
      background: var(--ink-faint, #e8e5e0);
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .close-btn:hover {
      background: var(--ink-dark, #4a4540);
      color: var(--paper-white, #f5f0e8);
    }

    .close-btn svg {
      width: 18px;
      height: 18px;
    }

    .body {
      flex: 1;
      padding: var(--spacing-lg, 24px);
      overflow-y: auto;
      font-family: var(--font-serif, serif);
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .body {
      color: var(--paper-white, #f5f0e8);
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      border-top: 1px solid var(--paper-border, #d9ccb8);
    }

    /* Focus trap styles */
    .modal:focus {
      outline: none;
    }

    [hidden] {
      display: none !important;
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.label = 'Modal';
    this.size = 'md';
    this.backdropClosable = true;
    this.scrollLock = true;
    this.closeOnEscape = true;
    this._handleEscape = this._handleEscape.bind(this);
    this._handleBackdropClick = this._handleBackdropClick.bind(this);
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
        this._trapFocus();
      } else {
        this._enableScroll();
      }
    }
  }

  _handleEscape = (e) => {
    if (!this.open || !this.closeOnEscape) return;
    if (e.key === 'Escape') {
      this.close();
    }
  };

  _handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && this.backdropClosable) {
      this.close();
    }
  };

  _disableScroll() {
    if (this.scrollLock) {
      document.body.style.overflow = 'hidden';
    }
  }

  _enableScroll() {
    document.body.style.overflow = '';
  }

  _trapFocus() {
    requestAnimationFrame(() => {
      const closeBtn = this.shadowRoot.querySelector('.close-btn');
      if (closeBtn) closeBtn.focus();
    });
  }

  _handleKeydown = (e) => {
    if (e.key === 'Tab') {
      const focusable = this.shadowRoot.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  show() {
    this.open = true;
    this.emit('modal-show', { label: this.label });
  }

  close() {
    this.open = false;
    this.emit('modal-close', { label: this.label });
  }

  render() {
    return html`
      <div 
        class="backdrop" 
        @click=${this._handleBackdropClick}
        @keydown=${this._handleKeydown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="modal" size=${this.size}>
          <header class="header">
            <h2 class="title" id="modal-title">${this.label}</h2>
            <button 
              class="close-btn" 
              @click=${this.close}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </header>
          
          <div class="body">
            <slot></slot>
          </div>
          
          <footer class="footer" hidden=${!this.querySelector('[slot="footer"]')}>
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }
}

customElements.define('p-modal', PModal);
