// Timeline — vertical/horizontal event list with connector line
// Props: items(Array of {title, content, date, icon, variant}), orientation('vertical'|'horizontal'), alternating
// Slot: none (data-driven)

import { PapyraiElement, html, css } from '../../core/base.js';

export class PTimeline extends PapyraiElement {
  static properties = {
    items:       { type: Array },
    orientation: { type: String, reflect: true },
    alternating: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .timeline {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    :host([orientation="horizontal"]) .timeline {
      flex-direction: row;
      align-items: flex-start;
    }

    /* Vertical connector line */
    .timeline::before {
      content: '';
      position: absolute;
      left: 19px;
      top: 20px;
      bottom: 20px;
      width: 2px;
      background: linear-gradient(
        to bottom,
        var(--paper-border, #d9d0be),
        var(--accent-red, #c4453c) 50%,
        var(--paper-border, #d9d0be)
      );
      opacity: 0.6;
    }

    :host([orientation="horizontal"]) .timeline::before {
      left: 20px;
      right: 20px;
      top: 19px;
      bottom: auto;
      width: auto;
      height: 2px;
      background: linear-gradient(
        to right,
        var(--paper-border, #d9d0be),
        var(--accent-red, #c4453c) 50%,
        var(--paper-border, #d9d0be)
      );
    }

    :host([alternating]) .timeline::before {
      left: 50%;
      transform: translateX(-50%);
    }

    /* Item */
    .item {
      display: flex;
      gap: var(--spacing-md, 16px);
      padding-bottom: var(--spacing-xl, 32px);
      position: relative;
    }

    .item:last-child {
      padding-bottom: 0;
    }

    :host([orientation="horizontal"]) .item {
      flex-direction: column;
      flex: 1;
      align-items: center;
      padding-bottom: 0;
      padding-right: 0;
    }

    :host([alternating]) .item:nth-child(even) {
      flex-direction: row-reverse;
      text-align: right;
    }

    /* Node (icon/dot) */
    .node {
      position: relative;
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--paper-cream, #f7f3e8);
      border: 2px solid var(--paper-border, #d9d0be);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ink-mid, #6a6560);
      z-index: 1;
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
      font-family: var(--font-handwrite, cursive);
      font-size: 1rem;
      transition: border-color var(--transition-fast, 150ms) ease;
    }

    .item:hover .node {
      border-color: var(--accent-red, #c4453c);
    }

    .node svg {
      width: 18px;
      height: 18px;
    }

    /* Content box */
    .content {
      flex: 1;
      min-width: 0;
      padding-top: 8px;
    }

    :host([orientation="horizontal"]) .content {
      text-align: center;
    }

    .item-title {
      font-family: var(--font-handwrite, cursive);
      font-size: 1rem;
      font-weight: 600;
      color: var(--ink-black, #1a1612);
      margin-bottom: 2px;
    }

    .item-date {
      font-size: 0.75rem;
      color: var(--ink-light, #aaa5a0);
      margin-bottom: var(--spacing-xs, 4px);
    }

    .item-body {
      font-size: 0.875rem;
      color: var(--ink-dark, #3a3530);
      line-height: 1.5;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.orientation = 'vertical';
    this.alternating = false;
  }

  _defaultIcon() {
    return html`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"/>
      </svg>
    `;
  }

  render() {
    return html`
      <div class="timeline" part="timeline">
        ${this.items.map((item, _i) => html`
          <div class="item" part="item">
            <div class="node" part="node">
              ${item.icon ? html`<span>${item.icon}</span>` : this._defaultIcon()}
            </div>
            <div class="content">
              ${item.date ? html`<div class="item-date">${item.date}</div>` : ''}
              ${item.title ? html`<div class="item-title">${item.title}</div>` : ''}
              ${item.content ? html`<div class="item-body">${item.content}</div>` : ''}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('p-timeline', PTimeline);
