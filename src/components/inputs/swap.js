// Swap - Animate between two states
// Props: checked(Boolean), disabled(Boolean), type(String: 'icon'|'text'), labelOn(String), labelOff(String)
// Events: change

import { PapyraiElement, html, css, svg } from '../../core/base.js';

export class PSwap extends PapyraiElement {
  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    type: { type: String },
    labelOn: { type: String },
    labelOff: { type: String }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    .swap-container {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      cursor: pointer;
      user-select: none;
    }

    :host([disabled]) .swap-container {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .swap-track {
      position: relative;
      width: 52px;
      height: 28px;
      background: var(--paper-border, #d9ccb8);
      border-radius: 14px;
      transition: background 0.3s ease;
    }

    :host-context([data-theme="dark"]) .swap-track {
      background: var(--paper-border-dark, #3d3832);
    }

    .swap-track.checked {
      background: var(--accent-red, #c4453c);
    }

    :host-context([data-theme="dark"]) .swap-track.checked {
      background: var(--accent-red-dark, #e55b50);
    }

    .swap-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 24px;
      height: 24px;
      background: var(--paper-white, #fffef8);
      border-radius: 50%;
      box-shadow: var(--elevation-1, 0 2px 4px rgba(0,0,0,.15));
      transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .swap-track.checked .swap-thumb {
      transform: translateX(24px);
    }

    :host-context([data-theme="dark"]) .swap-thumb {
      background: var(--paper-dark, #1a1815);
    }

    .icon-swap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: var(--ink-light, #8b8070);
      transition: all 0.3s ease;
    }

    .icon-swap svg {
      width: 100%;
      height: 100%;
      stroke: currentColor;
      stroke-width: 1.5;
    }

    .swap-track.checked .icon-swap {
      color: white;
    }

    .label {
      font-family: var(--font-serif, serif);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
      transition: color 0.3s ease;
    }

    :host-context([data-theme="dark"]) .label {
      color: var(--ink-white, #f5f0e8);
    }

    .label.off {
      color: var(--ink-light, #8b8070);
    }

    /* Text type */
    .swap-text {
      display: flex;
      align-items: center;
      font-family: var(--font-serif, serif);
      font-size: 0.85rem;
      gap: var(--spacing-xs, 4px);
    }

    .swap-text .state {
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      border-radius: var(--radius-sm, 6px);
      background: var(--paper-cream, #f8f1e5);
      color: var(--ink-light, #8b8070);
      transition: all 0.3s ease;
    }

    .swap-text .state.active {
      background: var(--accent-red, #c4453c);
      color: white;
    }

    :host-context([data-theme="dark"]) .swap-text .state {
      background: var(--paper-dark-alt, #252220);
    }

    :host-context([data-theme="dark"]) .swap-text .state.active {
      background: var(--accent-red-dark, #e55b50);
    }
  `;

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.type = 'icon';
    this.labelOn = '';
    this.labelOff = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._toggle);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._toggle);
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _toggle = () => {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.emit('change', { checked: this.checked });
  };

  _handleKeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggle();
    }
  };

  render() {
    if (this.type === 'text') {
      return html`
        <div 
          class="swap-container" 
          role="switch" 
          aria-checked="${this.checked}"
          aria-disabled="${this.disabled}"
          tabindex="${this.disabled ? -1 : 0}"
        >
          <div class="swap-text">
            <span class="state ${!this.checked ? 'active' : ''}">${this.labelOff || 'Off'}</span>
            <span class="state ${this.checked ? 'active' : ''}">${this.labelOn || 'On'}</span>
          </div>
        </div>
      `;
    }

    return html`
      <div 
        class="swap-container" 
        role="switch" 
        aria-checked="${this.checked}"
        aria-disabled="${this.disabled}"
        tabindex="${this.disabled ? -1 : 0}"
      >
        ${this.labelOff ? html`<span class="label ${!this.checked ? '' : 'off'}">${this.labelOff}</span>` : ''}
        <div class="swap-track ${this.checked ? 'checked' : ''}">
          <div class="swap-thumb">
            <svg class="icon-swap" viewBox="0 0 24 24" fill="none">
              <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M3 12h18" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        ${this.labelOn ? html`<span class="label ${this.checked ? '' : 'off'}">${this.labelOn}</span>` : ''}
      </div>
    `;
  }
}

customElements.define('p-swap', PSwap);
