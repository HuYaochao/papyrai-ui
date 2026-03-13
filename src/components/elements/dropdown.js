// Dropdown — trigger + floating menu panel
// Props: placement('bottom'|'top'|'left'|'right'), trigger('click'|'hover'), open
// Slots: trigger (the activating element), default (menu content)
// Events: dropdown-open, dropdown-close

import { PapyraiElement, html, css } from '../../core/base.js';

export class PDropdown extends PapyraiElement {
  static properties = {
    placement: { type: String, reflect: true },
    trigger:   { type: String },
    open:      { type: Boolean, reflect: true },
    disabled:  { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--font-serif, serif);
    }

    .trigger-slot {
      display: inline-flex;
      cursor: pointer;
    }

    .panel {
      position: absolute;
      z-index: var(--z-dropdown, 1000);
      min-width: 160px;
      background: var(--paper-white, #fdfbf7);
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      box-shadow: var(--elevation-2, 0 4px 6px rgba(0,0,0,.07));
      padding: var(--spacing-xs, 4px) 0;
      opacity: 0;
      transform: translateY(-6px) scale(0.97);
      pointer-events: none;
      transition: opacity var(--transition-fast, 150ms) ease,
                  transform var(--transition-fast, 150ms) ease;
    }

    :host([open]) .panel {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    /* Placement */
    :host(:not([placement="top"]):not([placement="left"]):not([placement="right"])) .panel {
      top: calc(100% + 6px);
      left: 0;
    }

    :host([placement="top"]) .panel {
      bottom: calc(100% + 6px);
      left: 0;
      transform-origin: bottom left;
    }

    :host([placement="right"]) .panel {
      left: calc(100% + 6px);
      top: 0;
      transform-origin: left top;
    }

    :host([placement="left"]) .panel {
      right: calc(100% + 6px);
      top: 0;
      transform-origin: right top;
    }

    ::slotted(p-dropdown-item),
    ::slotted([role="menuitem"]) {
      display: block;
    }
  `;

  constructor() {
    super();
    this.placement = 'bottom';
    this.trigger = 'click';
    this.open = false;
    this.disabled = false;
    this._outsideClick = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._outsideClick, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._outsideClick, true);
    super.disconnectedCallback();
  }

  _handleOutsideClick(e) {
    if (!this.contains(e.target)) {
      this._close();
    }
  }

  _toggle() {
    if (this.disabled) return;
    this.open ? this._close() : this._openMenu();
  }

  _openMenu() {
    this.open = true;
    this.emit('dropdown-open');
  }

  _close() {
    if (!this.open) return;
    this.open = false;
    this.emit('dropdown-close');
  }

  _handleTriggerKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggle();
    }
    if (e.key === 'Escape') this._close();
  }

  _handleHover(enter) {
    if (this.trigger !== 'hover') return;
    enter ? this._openMenu() : this._close();
  }

  render() {
    return html`
      <div class="trigger-slot"
           @click=${this.trigger === 'click' ? this._toggle : undefined}
           @mouseenter=${() => this._handleHover(true)}
           @mouseleave=${() => this._handleHover(false)}
           @keydown=${this._handleTriggerKeydown}
           tabindex="0"
           aria-haspopup="true"
           aria-expanded=${this.open ? 'true' : 'false'}>
        <slot name="trigger"></slot>
      </div>
      <div class="panel" part="panel" role="menu">
        <slot @keydown=${this._handlePanelKeydown}></slot>
      </div>
    `;
  }

  _handlePanelKeydown(e) {
    if (e.key === 'Escape') {
      this._close();
      this.shadowRoot.querySelector('.trigger-slot').focus();
    }
  }
}

customElements.define('p-dropdown', PDropdown);
