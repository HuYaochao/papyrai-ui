// AI Source Card - RAG 检索结果卡片
// 属性: title(String), source(String), score(Number 0-1), snippet(String), url(String), type('document'|'webpage'|'code'|'database')

import { PapyraiElement, html, css } from '../core/base.js';

export class AISourceCard extends PapyraiElement {
  static properties = {
    title: { type: String },
    source: { type: String },
    score: { type: Number },
    snippet: { type: String },
    url: { type: String },
    type: { type: String, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .card {
      position: relative;
      background: var(--paper-white, #fdfbf7);
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      padding: var(--spacing-md, 16px);
      padding-top: calc(var(--spacing-md, 16px) + 4px);
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
      cursor: pointer;
      transition: box-shadow 0.2s, transform 0.15s;
      overflow: hidden;
    }

    .card:hover {
      box-shadow: var(--elevation-2, 0 4px 6px rgba(0,0,0,.07));
      transform: translateY(-2px);
    }

    .card:active {
      transform: translateY(0);
    }

    :host([dark]) .card {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
    }

    /* Dog-ear fold top-right */
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background: var(--paper-border, #d9d0be);
      clip-path: polygon(0 0, 100% 100%, 100% 0);
    }

    .card::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background: var(--paper-cream, #f7f3e8);
      clip-path: polygon(0 0, 0 100%, 100% 100%);
      box-shadow: -2px 2px 3px rgba(0,0,0,.08);
    }

    /* Type icon — top-right corner (above dog-ear) */
    .type-icon {
      position: absolute;
      top: 2px;
      right: 22px;
      width: 18px;
      height: 18px;
      z-index: 2;
    }

    .type-icon svg {
      width: 18px;
      height: 18px;
      stroke: var(--ink-mid, #6a6560);
      stroke-width: 1.5;
      fill: none;
    }

    .title {
      font-family: var(--font-handwrite, cursive);
      font-size: 1rem;
      font-weight: 600;
      color: var(--ink-dark, #3a3530);
      margin-bottom: 4px;
      margin-right: 24px;
      line-height: 1.3;
    }

    :host([dark]) .title { color: var(--paper-cream, #f7f3e8); }

    .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: var(--spacing-sm, 8px);
      flex-wrap: wrap;
    }

    .source-name {
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      color: var(--ink-mid, #6a6560);
    }

    .score-bar-wrap {
      display: flex;
      align-items: center;
      gap: 5px;
      flex: 1;
      min-width: 80px;
      max-width: 140px;
    }

    .score-track {
      flex: 1;
      height: 4px;
      background: var(--ink-faint, #d9d5d0);
      border-radius: 2px;
      overflow: hidden;
    }

    .score-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.4s ease-out;
    }

    .score-fill.high { background: var(--ai-confidence-high, #22c55e); }
    .score-fill.mid  { background: var(--ai-confidence-mid, #eab308); }
    .score-fill.low  { background: var(--ai-confidence-low, #ef4444); }

    .score-pct {
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      color: var(--ink-mid, #6a6560);
      min-width: 28px;
    }

    .snippet {
      font-size: 0.83rem;
      line-height: 1.6;
      color: var(--ink-mid, #6a6560);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: var(--spacing-sm, 8px);
    }

    :host([dark]) .snippet { color: var(--ink-light, #aaa5a0); }

    .slot-wrap {
      margin-bottom: var(--spacing-sm, 8px);
    }

    .url-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: var(--font-mono, monospace);
      font-size: 0.68rem;
      color: var(--accent-blue, #4a7c9b);
      text-decoration: none;
      word-break: break-all;
    }

    .url-link:hover { text-decoration: underline; }
  `;

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.score = 1;
    this.snippet = '';
    this.url = '';
    this.type = 'document';
  }

  _scoreClass() {
    if (this.score >= 0.7) return 'high';
    if (this.score >= 0.4) return 'mid';
    return 'low';
  }

  _typeIcon() {
    switch (this.type) {
      case 'webpage':
        return html`<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`;
      case 'code':
        return html`<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`;
      case 'database':
        return html`<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`;
      default: // document
        return html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>`;
    }
  }

  _click() {
    this.dispatchEvent(new CustomEvent('source-click', {
      bubbles: true, composed: true,
      detail: { url: this.url, title: this.title, source: this.source, score: this.score }
    }));
    if (this.url) window.open(this.url, '_blank', 'noopener');
  }

  render() {
    const pct = Math.round(this.score * 100);
    const cls = this._scoreClass();
    return html`
      <div
        class="card"
        role="article"
        tabindex="0"
        aria-label="来源: ${this.title || this.source}"
        @click="${this._click}"
        @keydown="${(e) => (e.key === 'Enter' || e.key === ' ') && this._click()}">

        <div class="type-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">${this._typeIcon()}</svg>
        </div>

        ${this.title ? html`<div class="title">${this.title}</div>` : ''}

        <div class="meta">
          ${this.source ? html`<span class="source-name">${this.source}</span>` : ''}
          <div class="score-bar-wrap">
            <div class="score-track">
              <div class="score-fill ${cls}" style="width:${pct}%"></div>
            </div>
            <span class="score-pct">${pct}%</span>
          </div>
        </div>

        ${this.snippet ? html`<p class="snippet">${this.snippet}</p>` : ''}

        <div class="slot-wrap"><slot></slot></div>

        ${this.url ? html`
          <a class="url-link" href="${this.url}" target="_blank" rel="noopener"
             @click="${(e) => e.stopPropagation()}">
            ↗ ${this.url}
          </a>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('ai-source-card', AISourceCard);
