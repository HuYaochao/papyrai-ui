// AI Citation - 知识库引用 / 来源标注
// 属性: source(String), page(String), confidence(Number 0-1), url(String), title(String)

import { PapyraiElement, html, css } from '../core/base.js';

export class AICitation extends PapyraiElement {
  static properties = {
    source: { type: String },
    page: { type: String },
    confidence: { type: Number },
    url: { type: String },
    title: { type: String },
    _expanded: { state: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--font-serif, serif);
      position: relative;
    }

    .citation-mark {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      cursor: pointer;
      vertical-align: super;
      font-size: 0.75em;
      user-select: none;
    }

    .mark-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      border-radius: var(--radius-sm, 4px);
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      font-weight: 700;
      border: 1.5px solid currentColor;
      transition: background 0.15s, transform 0.1s;
    }

    .mark-badge.high {
      color: var(--ai-confidence-high, #22c55e);
      background: color-mix(in srgb, var(--ai-confidence-high, #22c55e) 10%, transparent);
    }

    .mark-badge.mid {
      color: var(--ai-confidence-mid, #eab308);
      background: color-mix(in srgb, var(--ai-confidence-mid, #eab308) 10%, transparent);
    }

    .mark-badge.low {
      color: var(--ai-confidence-low, #ef4444);
      background: color-mix(in srgb, var(--ai-confidence-low, #ef4444) 10%, transparent);
    }

    .citation-mark:hover .mark-badge {
      transform: scale(1.1);
    }

    /* Footnote popover */
    .footnote {
      display: none;
      position: absolute;
      bottom: calc(100% + 8px);
      left: 0;
      z-index: 100;
      min-width: 240px;
      max-width: 320px;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      background: var(--paper-white, #fdfbf7);
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      box-shadow: var(--elevation-3, 0 10px 15px rgba(0,0,0,.1));
      font-size: 0.85rem;
      line-height: 1.5;
    }

    .footnote::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 12px;
      border: 6px solid transparent;
      border-top-color: var(--paper-border, #d9d0be);
    }

    :host([dark]) .footnote {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
    }

    :host([dark]) .footnote::after {
      border-top-color: var(--ink-dark, #3a3530);
    }

    .footnote.open {
      display: block;
      animation: fadeIn 0.15s ease-out;
    }

    .footnote-title {
      font-family: var(--font-handwrite, cursive);
      font-size: 0.95rem;
      color: var(--ink-dark, #3a3530);
      font-weight: 600;
      margin-bottom: 4px;
    }

    :host([dark]) .footnote-title {
      color: var(--paper-cream, #f7f3e8);
    }

    .footnote-meta {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      flex-wrap: wrap;
      margin-bottom: 6px;
    }

    .source-label {
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      color: var(--ink-mid, #6a6560);
    }

    .page-label {
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      color: var(--ink-mid, #6a6560);
      padding: 1px 6px;
      background: var(--paper-cream, #f7f3e8);
      border: 1px solid var(--ink-faint, #d9d5d0);
      border-radius: var(--radius-sm, 4px);
    }

    :host([dark]) .page-label {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
    }

    .conf-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }

    .conf-track {
      flex: 1;
      height: 4px;
      background: var(--ink-faint, #d9d5d0);
      border-radius: 2px;
      overflow: hidden;
    }

    .conf-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.4s ease;
    }

    .conf-fill.high { background: var(--ai-confidence-high, #22c55e); }
    .conf-fill.mid  { background: var(--ai-confidence-mid, #eab308); }
    .conf-fill.low  { background: var(--ai-confidence-low, #ef4444); }

    .conf-label {
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      color: var(--ink-mid, #6a6560);
      min-width: 32px;
      text-align: right;
    }

    .url-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      color: var(--accent-blue, #4a7c9b);
      text-decoration: none;
      margin-top: 2px;
    }

    .url-link:hover { text-decoration: underline; }

    .slot-content {
      display: inline;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;

  constructor() {
    super();
    this.source = '';
    this.page = '';
    this.confidence = 1;
    this.url = '';
    this.title = '';
    this._expanded = false;
  }

  _confidenceClass() {
    if (this.confidence >= 0.7) return 'high';
    if (this.confidence >= 0.4) return 'mid';
    return 'low';
  }

  _toggle(e) {
    e.stopPropagation();
    this._expanded = !this._expanded;
    this.dispatchEvent(new CustomEvent('citation-click', {
      bubbles: true, composed: true,
      detail: { source: this.source, url: this.url, expanded: this._expanded }
    }));
  }

  connectedCallback() {
    super.connectedCallback();
    this._closeOnOutside = (e) => {
      if (!this.contains(e.target)) this._expanded = false;
    };
    document.addEventListener('click', this._closeOnOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._closeOnOutside);
  }

  render() {
    const cls = this._confidenceClass();
    const pct = Math.round(this.confidence * 100);
    return html`
      <span class="slot-content"><slot></slot></span><!--
      --><span class="citation-mark" role="button" tabindex="0"
          aria-label="引用来源: ${this.title || this.source}"
          aria-expanded="${this._expanded}"
          @click="${this._toggle}"
          @keydown="${(e) => (e.key === 'Enter' || e.key === ' ') && this._toggle(e)}">
        <span class="mark-badge ${cls}">${this.source ? this.source[0].toUpperCase() : '?'}</span>
      </span>
      <div class="footnote ${this._expanded ? 'open' : ''}" role="tooltip">
        ${this.title ? html`<div class="footnote-title">${this.title}</div>` : ''}
        <div class="footnote-meta">
          ${this.source ? html`<span class="source-label">${this.source}</span>` : ''}
          ${this.page ? html`<span class="page-label">p.${this.page}</span>` : ''}
        </div>
        <div class="conf-bar">
          <div class="conf-track">
            <div class="conf-fill ${cls}" style="width:${pct}%"></div>
          </div>
          <span class="conf-label">${pct}%</span>
        </div>
        ${this.url ? html`
          <a class="url-link" href="${this.url}" target="_blank" rel="noopener">
            ↗ ${this.url}
          </a>` : ''}
      </div>
    `;
  }
}

customElements.define('ai-citation', AICitation);
