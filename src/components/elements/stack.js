// Stack — z-stack of overlapping elements with optional hover-to-fan
// Props: offset(number,px), fanOnHover, direction('top'|'bottom'|'left'|'right')
// Slot: default (stacked elements)

import { PapyraiElement, html, css } from '../../core/base.js';

export class PStack extends PapyraiElement {
  static properties = {
    offset:     { type: Number },
    fanOnHover: { type: Boolean, attribute: 'fan-on-hover', reflect: true },
    direction:  { type: String, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--font-serif, serif);
    }

    .stack-wrap {
      position: relative;
      display: inline-flex;
    }

    /* Default stacked appearance */
    ::slotted(*) {
      position: absolute;
      top: 0;
      left: 0;
      transition: transform var(--transition-normal, 250ms) ease,
                  box-shadow var(--transition-normal, 250ms) ease;
    }

    /* Last slotted item is on top */
    ::slotted(*:last-child) {
      position: relative;
    }

    /* Fan effect on hover — handled via JS offset in render */
    :host([fan-on-hover]) .stack-wrap:hover ::slotted(*) {
      box-shadow: var(--elevation-2, 0 4px 6px rgba(0,0,0,.07));
    }
  `;

  constructor() {
    super();
    this.offset = 8;
    this.fanOnHover = false;
    this.direction = 'bottom';
    this._hovered = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', () => { this._hovered = true; this.requestUpdate(); });
    this.addEventListener('mouseleave', () => { this._hovered = false; this.requestUpdate(); });
  }

  _getSlottedItems() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements({ flatten: true });
  }

  _applyFan() {
    const items = this._getSlottedItems();
    if (!items.length) return;

    items.forEach((el, i) => {
      if (this._hovered && this.fanOnHover) {
        const spread = (i - Math.floor(items.length / 2)) * (this.offset * 2.5);
        if (this.direction === 'bottom' || this.direction === 'top') {
          el.style.transform = `translateX(${spread}px) translateY(${i * -2}px)`;
        } else {
          el.style.transform = `translateY(${spread}px) translateX(${i * -2}px)`;
        }
        el.style.zIndex = String(i + 10);
      } else {
        const sign = (this.direction === 'bottom' || this.direction === 'right') ? 1 : -1;
        const offset = i * this.offset * sign;
        if (this.direction === 'bottom' || this.direction === 'top') {
          el.style.transform = `translateX(${i * (this.offset / 2)}px) translateY(${offset}px)`;
        } else {
          el.style.transform = `translateX(${offset}px) translateY(${i * (this.offset / 2)}px)`;
        }
        el.style.zIndex = String(i + 1);
      }
    });
  }

  updated() {
    this._applyFan();
  }

  render() {
    return html`
      <div class="stack-wrap" part="stack">
        <slot @slotchange=${() => this._applyFan()}></slot>
      </div>
    `;
  }
}

customElements.define('p-stack', PStack);
