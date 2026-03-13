// Divider — horizontal or vertical separator line with optional label
// Props: orientation('horizontal'|'vertical'), dashed, label(string)
// Slot: default (label content)

import { PapyraiElement, html, css } from '../../core/base.js';

export class PDivider extends PapyraiElement {
  static properties = {
    orientation: { type: String, reflect: true },
    dashed:      { type: Boolean, reflect: true },
    label:       { type: String }
  };

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      font-family: var(--font-serif, serif);
    }

    :host([orientation="vertical"]) {
      flex-direction: column;
      align-self: stretch;
      width: auto;
    }

    .line {
      flex: 1;
      border: none;
      border-top: 1px solid var(--paper-border, #d9d0be);
    }

    :host([dashed]) .line {
      border-top-style: dashed;
    }

    :host([orientation="vertical"]) .line {
      border-top: none;
      border-left: 1px solid var(--paper-border, #d9d0be);
      width: 0;
    }

    :host([orientation="vertical"][dashed]) .line {
      border-left-style: dashed;
    }

    .label-slot {
      padding: 0 var(--spacing-md, 16px);
      font-size: 0.8rem;
      color: var(--ink-light, #aaa5a0);
      font-family: var(--font-handwrite, cursive);
      white-space: nowrap;
      flex-shrink: 0;
    }

    :host([orientation="vertical"]) .label-slot {
      padding: var(--spacing-sm, 8px) 0;
      writing-mode: vertical-rl;
    }
  `;

  constructor() {
    super();
    this.orientation = 'horizontal';
    this.dashed = false;
    this.label = '';
  }

  render() {
    const hasLabel = this.label || this.querySelector(':not([slot])');
    return html`
      <div class="line" part="line-start" role="separator"
           aria-orientation=${this.orientation}></div>
      ${hasLabel || this.label ? html`
        <span class="label-slot" part="label">
          ${this.label}<slot></slot>
        </span>
        <div class="line" part="line-end"></div>
      ` : ''}
    `;
  }
}

customElements.define('p-divider', PDivider);
