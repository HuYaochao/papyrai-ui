// Breadcrumb — navigation path with separator and current-page indicator
// Props: items(Array of {label,href}), separator(string), maxItems(number)
// Events: breadcrumb-click

import { PapyraiElement, html, css } from '../../core/base.js';

export class PBreadcrumb extends PapyraiElement {
  static properties = {
    items:     { type: Array },
    separator: { type: String },
    maxItems:  { type: Number, attribute: 'max-items' }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    nav {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0;
    }

    .crumb {
      display: flex;
      align-items: center;
    }

    .crumb a,
    .crumb span {
      font-size: 0.875rem;
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      border-radius: var(--radius-sm, 4px);
      text-decoration: none;
      color: var(--accent-blue, #4a7c9b);
      transition: background var(--transition-fast, 150ms) ease;
      white-space: nowrap;
    }

    .crumb a:hover {
      background: var(--paper-aged, #ede6d6);
      color: var(--ink-black, #1a1612);
    }

    .crumb a:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: 1px;
    }

    .crumb.current span {
      color: var(--ink-dark, #3a3530);
      font-weight: 600;
      cursor: default;
    }

    .sep {
      color: var(--ink-light, #aaa5a0);
      font-size: 0.8rem;
      user-select: none;
      font-family: var(--font-handwrite, cursive);
    }

    .ellipsis {
      color: var(--ink-mid, #6a6560);
      font-size: 0.875rem;
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      cursor: default;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.separator = '/';
    this.maxItems = 0;
  }

  _visibleItems() {
    if (!this.maxItems || this.items.length <= this.maxItems) return this.items;
    // Keep first + last (maxItems-1)
    const keep = Math.max(1, this.maxItems - 1);
    return [
      ...this.items.slice(0, 1),
      { label: '...', href: null, ellipsis: true },
      ...this.items.slice(-(keep))
    ];
  }

  render() {
    const visible = this._visibleItems();
    return html`
      <nav aria-label="Breadcrumb">
        <ol style="display:flex;align-items:center;gap:0;list-style:none;margin:0;padding:0;flex-wrap:wrap;">
          ${visible.map((item, i) => {
            const isLast = i === visible.length - 1;
            if (item.ellipsis) {
              return html`
                <li class="crumb">
                  <span class="ellipsis">…</span>
                </li>
                <li class="sep" aria-hidden="true">${this.separator}</li>
              `;
            }
            return html`
              <li class="crumb ${isLast ? 'current' : ''}">
                ${isLast || !item.href
                  ? html`<span aria-current=${isLast ? 'page' : 'false'}>${item.label}</span>`
                  : html`<a href=${item.href}
                             @click=${(e) => { e.preventDefault(); this.emit('breadcrumb-click', { item, index: i }); }}>
                       ${item.label}
                     </a>`
                }
              </li>
              ${!isLast ? html`<li class="sep" aria-hidden="true">${this.separator}</li>` : ''}
            `;
          })}
        </ol>
      </nav>
    `;
  }
}

customElements.define('p-breadcrumb', PBreadcrumb);
