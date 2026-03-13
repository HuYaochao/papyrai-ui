// Badge — count or status badge overlay
// Props: count(number), dot(boolean), max(number,default 99), variant('default'|'primary'|'danger'|'success'|'warning')
// Slot: default (element to badge)

import { PapyraiElement, html, css } from '../../core/base.js';

export class PBadge extends PapyraiElement {
  static properties = {
    count:   { type: Number },
    dot:     { type: Boolean, reflect: true },
    max:     { type: Number },
    variant: { type: String, reflect: true },
    standalone: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
      vertical-align: middle;
    }

    .badge {
      position: absolute;
      top: -6px;
      right: -6px;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 9px;
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      font-weight: 700;
      line-height: 18px;
      text-align: center;
      white-space: nowrap;
      border: 2px solid var(--paper-white, #fdfbf7);
      background: var(--ink-mid, #6a6560);
      color: var(--paper-white, #fdfbf7);
      pointer-events: none;
    }

    :host([variant="primary"]) .badge { background: var(--accent-blue, #4a7c9b); }
    :host([variant="danger"])  .badge { background: var(--accent-red, #c4453c); }
    :host([variant="success"]) .badge { background: var(--accent-green, #5a8a5a); }
    :host([variant="warning"]) .badge { background: var(--accent-amber, #c49a3c); color: var(--ink-black, #1a1612); }

    :host([dot]) .badge {
      min-width: 10px;
      width: 10px;
      height: 10px;
      padding: 0;
      border-radius: 50%;
      font-size: 0;
    }

    :host([standalone]) .badge {
      position: static;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `;

  constructor() {
    super();
    this.count = 0;
    this.dot = false;
    this.max = 99;
    this.variant = 'danger';
    this.standalone = false;
  }

  _displayCount() {
    if (this.dot) return '';
    if (this.count > this.max) return `${this.max}+`;
    return String(this.count);
  }

  _shouldShow() {
    if (this.dot) return true;
    return this.count > 0;
  }

  render() {
    return html`
      <slot></slot>
      ${this._shouldShow() ? html`
        <span class="badge" part="badge" aria-label=${this.count > this.max ? `${this.max}+ items` : `${this.count} items`}>
          ${this._displayCount()}
        </span>
      ` : ''}
    `;
  }
}

customElements.define('p-badge', PBadge);
