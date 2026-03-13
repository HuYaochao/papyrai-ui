// Indicator — badge/dot overlay on any slotted element
// Props: count(number), dot(boolean), position('top-right'|'top-left'|'bottom-right'|'bottom-left'), pulse, variant('default'|'primary'|'danger'|'success'|'warning')
// Slot: default (element to decorate)

import { PapyraiElement, html, css } from '../../core/base.js';

export class PIndicator extends PapyraiElement {
  static properties = {
    count:    { type: Number },
    dot:      { type: Boolean, reflect: true },
    position: { type: String, reflect: true },
    pulse:    { type: Boolean, reflect: true },
    variant:  { type: String, reflect: true },
    max:      { type: Number }
  };

  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
      vertical-align: middle;
    }

    .indicator {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      border-radius: 9px;
      background: var(--accent-red, #c4453c);
      color: var(--paper-white, #fdfbf7);
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      font-weight: 700;
      border: 2px solid var(--paper-white, #fdfbf7);
      white-space: nowrap;
      z-index: 1;
      pointer-events: none;
    }

    /* Variants */
    :host([variant="primary"]) .indicator { background: var(--accent-blue, #4a7c9b); }
    :host([variant="success"]) .indicator { background: var(--accent-green, #5a8a5a); }
    :host([variant="warning"]) .indicator { background: var(--accent-amber, #c49a3c); color: var(--ink-black, #1a1612); }
    :host([variant="default"]) .indicator { background: var(--ink-mid, #6a6560); }

    /* Positions */
    :host(:not([position="top-left"]):not([position="bottom-right"]):not([position="bottom-left"])) .indicator {
      top: -6px;
      right: -6px;
    }

    :host([position="top-left"]) .indicator {
      top: -6px;
      left: -6px;
    }

    :host([position="bottom-right"]) .indicator {
      bottom: -6px;
      right: -6px;
    }

    :host([position="bottom-left"]) .indicator {
      bottom: -6px;
      left: -6px;
    }

    /* Dot mode */
    :host([dot]) .indicator {
      min-width: 10px;
      width: 10px;
      height: 10px;
      padding: 0;
      font-size: 0;
    }

    /* Pulse animation */
    :host([pulse]) .indicator::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: inherit;
      opacity: 0.4;
      animation: pulse-ring 1.5s ease-out infinite;
    }

    @keyframes pulse-ring {
      0%   { transform: scale(0.8); opacity: 0.4; }
      100% { transform: scale(1.8); opacity: 0; }
    }
  `;

  constructor() {
    super();
    this.count = 0;
    this.dot = false;
    this.position = 'top-right';
    this.pulse = false;
    this.variant = 'danger';
    this.max = 99;
  }

  _displayCount() {
    if (this.dot) return '';
    if (this.count > this.max) return `${this.max}+`;
    return this.count > 0 ? String(this.count) : '';
  }

  _shouldShow() {
    return this.dot || this.count > 0;
  }

  render() {
    return html`
      <slot></slot>
      ${this._shouldShow() ? html`
        <span class="indicator" part="indicator" aria-label=${`${this.count} notifications`}>
          ${this._displayCount()}
        </span>
      ` : ''}
    `;
  }
}

customElements.define('p-indicator', PIndicator);
