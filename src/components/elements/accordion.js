// Accordion — collapsible content sections with animated open/close
// Props: label, open, disabled
// Use multiple <p-accordion> inside a container for accordion groups

import { PapyraiElement, html, css } from '../../core/base.js';

export class PAccordion extends PapyraiElement {
  static properties = {
    label:    { type: String },
    open:     { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .accordion {
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      overflow: hidden;
      background: var(--paper-cream, #f7f3e8);
    }

    .trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.95rem;
      color: var(--ink-black, #1a1612);
      gap: var(--spacing-sm, 8px);
      transition: background var(--transition-fast, 150ms) ease;
    }

    .trigger:hover:not(:disabled) {
      background: var(--paper-aged, #ede6d6);
    }

    .trigger:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: -2px;
    }

    :host([disabled]) .trigger {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .label-text {
      font-family: var(--font-handwrite, cursive);
      font-size: 1rem;
      font-weight: 600;
    }

    .icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      transition: transform var(--transition-normal, 250ms) ease;
      color: var(--ink-mid, #6a6560);
    }

    :host([open]) .icon {
      transform: rotate(180deg);
    }

    .content-wrap {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--transition-normal, 250ms) ease;
    }

    :host([open]) .content-wrap {
      grid-template-rows: 1fr;
    }

    .content-inner {
      overflow: hidden;
    }

    .content {
      padding: 0 var(--spacing-lg, 24px) var(--spacing-md, 16px);
      color: var(--ink-dark, #3a3530);
      font-size: 0.9rem;
      line-height: 1.6;
      border-top: 1px solid var(--paper-border, #d9d0be);
    }
  `;

  constructor() {
    super();
    this.label = 'Section';
    this.open = false;
    this.disabled = false;
  }

  _toggle() {
    if (this.disabled) return;
    this.open = !this.open;
    this.emit('accordion-toggle', { open: this.open });
  }

  _handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggle();
    }
  }

  render() {
    return html`
      <div class="accordion" part="accordion">
        <button
          class="trigger"
          part="trigger"
          ?disabled=${this.disabled}
          aria-expanded=${this.open ? 'true' : 'false'}
          @click=${this._toggle}
          @keydown=${this._handleKeydown}
        >
          <span class="label-text">${this.label}</span>
          <svg class="icon" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        <div class="content-wrap" role="region">
          <div class="content-inner">
            <div class="content" part="content">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('p-accordion', PAccordion);
