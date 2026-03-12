// AI Feedback - 回复反馈（点赞/踩/复制/重试）
// 属性: value('up'|'down'|null), showCopy(Boolean), showRetry(Boolean)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIFeedback extends PapyraiElement {
  static properties = {
    value: { type: String, reflect: true },
    showCopy: { type: Boolean },
    showRetry: { type: Boolean }
  };

  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--font-serif, serif);
    }

    .group {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: var(--paper-cream, #f7f3e8);
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-lg, 12px);
      padding: 3px;
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
    }

    :host([dark]) .group {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
    }

    .sep {
      width: 1px;
      height: 18px;
      background: var(--ink-faint, #d9d5d0);
      margin: 0 2px;
    }

    :host([dark]) .sep {
      background: var(--ink-dark, #3a3530);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 5px 10px;
      border: none;
      border-radius: var(--radius-md, 8px);
      background: transparent;
      cursor: pointer;
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      color: var(--ink-mid, #6a6560);
      transition: background 0.15s, color 0.15s, transform 0.1s, box-shadow 0.15s;
      white-space: nowrap;
    }

    .btn:hover {
      background: var(--paper-white, #fdfbf7);
      color: var(--ink-dark, #3a3530);
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
      transform: translateY(-1px);
    }

    :host([dark]) .btn:hover {
      background: color-mix(in srgb, var(--paper-aged, #3a3530) 60%, white 40%);
      color: var(--paper-cream, #f7f3e8);
    }

    .btn:active { transform: scale(0.95); }

    .btn.up.active {
      background: color-mix(in srgb, var(--ai-confidence-high, #22c55e) 15%, transparent);
      color: var(--ai-confidence-high, #22c55e);
    }

    .btn.down.active {
      background: color-mix(in srgb, var(--ai-error, #ef4444) 15%, transparent);
      color: var(--ai-error, #ef4444);
    }

    .btn svg {
      width: 15px;
      height: 15px;
      stroke: currentColor;
      stroke-width: 1.8;
      fill: none;
      flex-shrink: 0;
      transition: fill 0.15s;
    }

    .btn.up.active svg,
    .btn.down.active svg {
      fill: currentColor;
    }

    .btn-label {
      display: none;
    }

    @media (min-width: 480px) {
      .btn-label { display: inline; }
    }
  `;

  constructor() {
    super();
    this.value = null;
    this.showCopy = true;
    this.showRetry = true;
  }

  _clickUp() {
    const next = this.value === 'up' ? null : 'up';
    this.value = next;
    this.dispatchEvent(new CustomEvent('feedback-change', {
      bubbles: true, composed: true, detail: { value: next }
    }));
  }

  _clickDown() {
    const next = this.value === 'down' ? null : 'down';
    this.value = next;
    this.dispatchEvent(new CustomEvent('feedback-change', {
      bubbles: true, composed: true, detail: { value: next }
    }));
  }

  _clickCopy() {
    this.dispatchEvent(new CustomEvent('feedback-copy', {
      bubbles: true, composed: true
    }));
  }

  _clickRetry() {
    this.dispatchEvent(new CustomEvent('feedback-retry', {
      bubbles: true, composed: true
    }));
  }

  render() {
    return html`
      <div class="group" role="group" aria-label="回复反馈">
        <button
          class="btn up ${this.value === 'up' ? 'active' : ''}"
          aria-label="有帮助"
          aria-pressed="${this.value === 'up'}"
          @click="${this._clickUp}">
          <svg viewBox="0 0 24 24">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
          </svg>
          <span class="btn-label">有帮助</span>
        </button>

        <button
          class="btn down ${this.value === 'down' ? 'active' : ''}"
          aria-label="没帮助"
          aria-pressed="${this.value === 'down'}"
          @click="${this._clickDown}">
          <svg viewBox="0 0 24 24">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/>
            <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
          </svg>
          <span class="btn-label">没帮助</span>
        </button>

        ${this.showCopy ? html`
          <span class="sep" aria-hidden="true"></span>
          <button class="btn" aria-label="复制内容" @click="${this._clickCopy}">
            <svg viewBox="0 0 24 24">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <span class="btn-label">复制</span>
          </button>
        ` : ''}

        ${this.showRetry ? html`
          <button class="btn" aria-label="重新生成" @click="${this._clickRetry}">
            <svg viewBox="0 0 24 24">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
            </svg>
            <span class="btn-label">重试</span>
          </button>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('ai-feedback', AIFeedback);
