// Container — responsive layout container with max-width breakpoints
// Props: maxWidth('sm'|'md'|'lg'|'xl'|'full'), centered, fluid, padded

import { PapyraiElement, html, css } from '../../core/base.js';

export class PContainer extends PapyraiElement {
  static properties = {
    maxWidth: { type: String, attribute: 'max-width', reflect: true },
    centered: { type: Boolean, reflect: true },
    fluid:    { type: Boolean, reflect: true },
    padded:   { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .container {
      width: 100%;
      box-sizing: border-box;
    }

    :host([padded]) .container {
      padding-left: var(--spacing-lg, 24px);
      padding-right: var(--spacing-lg, 24px);
    }

    :host([centered]) .container {
      margin-left: auto;
      margin-right: auto;
    }

    /* Max-width breakpoints */
    :host([max-width="sm"]) .container  { max-width: 640px; }
    :host([max-width="md"]) .container  { max-width: 768px; }
    :host([max-width="lg"]) .container  { max-width: 1024px; }
    :host([max-width="xl"]) .container  { max-width: 1280px; }
    :host([max-width="2xl"]) .container { max-width: 1536px; }
    :host([max-width="full"]) .container { max-width: 100%; }

    /* Paper edge decoration */
    :host([padded]) .container::before {
      content: '';
      display: block;
      height: 3px;
      background: linear-gradient(
        90deg,
        var(--accent-red, #c4453c) 0%,
        var(--paper-border, #d9d0be) 100%
      );
      margin-bottom: var(--spacing-md, 16px);
      border-radius: var(--radius-sm, 4px);
      opacity: 0.4;
    }
  `;

  constructor() {
    super();
    this.maxWidth = 'lg';
    this.centered = true;
    this.fluid = false;
    this.padded = false;
  }

  render() {
    return html`
      <div class="container" part="container">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('p-container', PContainer);
