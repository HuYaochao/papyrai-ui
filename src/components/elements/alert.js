// Alert — informational messages with variants and closable option
// Props: variant('info'|'success'|'warning'|'error'), title, closable, icon
// Slots: default (message body), icon

import { PapyraiElement, html, css } from '../../core/base.js';

export class PAlert extends PapyraiElement {
  static properties = {
    variant:  { type: String, reflect: true },
    title:    { type: String },
    closable: { type: Boolean, reflect: true },
    icon:     { type: Boolean, reflect: true },
    closed:   { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    :host([closed]) {
      display: none;
    }

    .alert {
      display: flex;
      gap: var(--spacing-md, 16px);
      padding: var(--spacing-md, 16px);
      border-radius: var(--radius-md, 8px);
      border-left: 4px solid var(--accent-blue, #4a7c9b);
      background: color-mix(in srgb, var(--accent-blue, #4a7c9b) 8%, var(--paper-white, #fdfbf7));
      position: relative;
    }

    :host([variant="success"]) .alert {
      border-color: var(--accent-green, #5a8a5a);
      background: color-mix(in srgb, var(--accent-green, #5a8a5a) 8%, var(--paper-white, #fdfbf7));
    }

    :host([variant="warning"]) .alert {
      border-color: var(--accent-amber, #c49a3c);
      background: color-mix(in srgb, var(--accent-amber, #c49a3c) 8%, var(--paper-white, #fdfbf7));
    }

    :host([variant="error"]) .alert {
      border-color: var(--accent-red, #c4453c);
      background: color-mix(in srgb, var(--accent-red, #c4453c) 8%, var(--paper-white, #fdfbf7));
    }

    .alert-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 1px;
      color: var(--accent-blue, #4a7c9b);
    }

    :host([variant="success"]) .alert-icon { color: var(--accent-green, #5a8a5a); }
    :host([variant="warning"]) .alert-icon { color: var(--accent-amber, #c49a3c); }
    :host([variant="error"])   .alert-icon { color: var(--accent-red, #c4453c); }

    .body {
      flex: 1;
      min-width: 0;
    }

    .title {
      font-family: var(--font-handwrite, cursive);
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: var(--spacing-xs, 4px);
      color: var(--ink-black, #1a1612);
    }

    .message {
      font-size: 0.875rem;
      color: var(--ink-dark, #3a3530);
      line-height: 1.5;
    }

    .close-btn {
      position: absolute;
      top: var(--spacing-sm, 8px);
      right: var(--spacing-sm, 8px);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--ink-light, #aaa5a0);
      padding: 2px;
      border-radius: var(--radius-sm, 4px);
      display: flex;
      align-items: center;
      transition: color var(--transition-fast, 150ms) ease;
    }

    .close-btn:hover {
      color: var(--ink-dark, #3a3530);
    }

    .close-btn:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
    }
  `;

  constructor() {
    super();
    this.variant = 'info';
    this.title = '';
    this.closable = false;
    this.icon = true;
    this.closed = false;
  }

  _getIcon() {
    const icons = {
      info:    html`<path d="M12 16v-4m0-4h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>`,
      success: html`<path d="M9 12l2 2 4-4m6 2a10 10 0 11-20 0 10 10 0 0120 0z"/>`,
      warning: html`<path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>`,
      error:   html`<path d="M12 8v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>`
    };
    return icons[this.variant] || icons.info;
  }

  _close() {
    this.closed = true;
    this.emit('alert-close');
  }

  render() {
    return html`
      <div class="alert" role="alert" part="alert">
        ${this.icon ? html`
          <svg class="alert-icon" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round">
            ${this._getIcon()}
          </svg>
        ` : ''}
        <div class="body">
          ${this.title ? html`<div class="title">${this.title}</div>` : ''}
          <div class="message"><slot></slot></div>
        </div>
        ${this.closable ? html`
          <button class="close-btn" aria-label="Close alert" @click=${this._close}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('p-alert', PAlert);
