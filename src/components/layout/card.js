// Card — paper-style content card with header/body/footer slots
// Props: variant('default'|'elevated'|'outlined'), clickable, folded
// Slots: header, default (body), footer

import { PapyraiElement, html, css } from '../../core/base.js';

export class PCard extends PapyraiElement {
  static properties = {
    variant:   { type: String, reflect: true },
    clickable: { type: Boolean, reflect: true },
    folded:    { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .card {
      position: relative;
      background: var(--paper-cream, #f7f3e8);
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
      overflow: hidden;
      transition: box-shadow var(--transition-fast, 150ms) ease,
                  transform var(--transition-fast, 150ms) ease;
    }

    :host([variant="elevated"]) .card {
      box-shadow: var(--elevation-2, 0 4px 6px rgba(0,0,0,.07));
    }

    :host([variant="outlined"]) .card {
      box-shadow: none;
      border-width: 2px;
    }

    :host([clickable]) .card {
      cursor: pointer;
    }

    :host([clickable]) .card:hover {
      box-shadow: var(--elevation-2, 0 4px 6px rgba(0,0,0,.07));
      transform: translateY(-1px);
    }

    :host([clickable]) .card:active {
      transform: translateY(0);
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
    }

    /* Dog-ear fold corner */
    :host([folded]) .card::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 24px 24px 0;
      border-color: transparent var(--paper-aged, #ede6d6) transparent transparent;
      filter: drop-shadow(-1px 1px 1px rgba(0,0,0,.1));
    }

    .header {
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      border-bottom: 1px solid var(--paper-border, #d9d0be);
      font-family: var(--font-handwrite, cursive);
      font-size: 1.1rem;
      color: var(--ink-dark, #3a3530);
    }

    .header:empty { display: none; }

    .body {
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      color: var(--ink-black, #1a1612);
      line-height: 1.6;
    }

    .footer {
      padding: var(--spacing-sm, 8px) var(--spacing-lg, 24px);
      border-top: 1px solid var(--paper-border, #d9d0be);
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      color: var(--ink-mid, #6a6560);
      font-size: 0.875rem;
    }

    .footer:empty { display: none; }

    /* Paper texture overlay */
    .card::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      border-radius: inherit;
    }
  `;

  constructor() {
    super();
    this.variant = 'default';
    this.clickable = false;
    this.folded = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.clickable) {
      this.setAttribute('tabindex', '0');
      this.setAttribute('role', 'button');
      this.addEventListener('click', this._handleClick);
      this.addEventListener('keydown', this._handleKeydown);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _handleClick = () => {
    this.emit('card-click');
  };

  _handleKeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.emit('card-click');
    }
  };

  render() {
    return html`
      <div class="card" part="card">
        <div class="header"><slot name="header"></slot></div>
        <div class="body"><slot></slot></div>
        <div class="footer"><slot name="footer"></slot></div>
      </div>
    `;
  }
}

customElements.define('p-card', PCard);
