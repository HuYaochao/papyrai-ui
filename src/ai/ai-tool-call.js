// AI Tool Call - 工具调用展示
// 属性: name(String), status('pending'|'running'|'success'|'error'), input(String/JSON), output(String/JSON)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIToolCall extends PapyraiElement {
  static properties = {
    name: { type: String },
    status: { type: String, reflect: true },
    input: { type: String },
    output: { type: String },
    _expanded: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-mono, monospace);
    }

    .card {
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      overflow: hidden;
      background: var(--paper-white, #fdfbf7);
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
      position: relative;
    }

    :host([dark]) .card {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
    }

    /* Paperclip decoration */
    .clip-deco {
      position: absolute;
      top: -4px;
      left: 18px;
      width: 16px;
      height: 28px;
      border: 2px solid var(--ink-light, #aaa5a0);
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      pointer-events: none;
    }

    .header {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      cursor: pointer;
      user-select: none;
      background: var(--paper-cream, #f7f3e8);
      border-bottom: 1px solid transparent;
      transition: background 0.15s;
    }

    .header:hover {
      background: color-mix(in srgb, var(--paper-cream, #f7f3e8) 70%, var(--ink-faint, #d9d5d0));
    }

    :host([dark]) .header {
      background: color-mix(in srgb, var(--paper-aged, #3a3530) 80%, black);
    }

    .header.expanded {
      border-bottom-color: var(--paper-border, #d9d0be);
    }

    :host([dark]) .header.expanded {
      border-bottom-color: var(--ink-dark, #3a3530);
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .status-dot.pending  { background: var(--ink-faint, #d9d5d0); }
    .status-dot.running  {
      background: var(--ai-thinking, #8b5cf6);
      animation: spin-dot 1s linear infinite;
      border: 2px solid color-mix(in srgb, var(--ai-thinking, #8b5cf6) 30%, transparent);
      background-clip: padding-box;
    }
    .status-dot.success  { background: var(--ai-confidence-high, #22c55e); }
    .status-dot.error    { background: var(--ai-error, #ef4444); }

    @keyframes spin-dot {
      0%   { box-shadow: 2px 0 0 0 var(--ai-thinking, #8b5cf6); }
      25%  { box-shadow: 0 2px 0 0 var(--ai-thinking, #8b5cf6); }
      50%  { box-shadow: -2px 0 0 0 var(--ai-thinking, #8b5cf6); }
      75%  { box-shadow: 0 -2px 0 0 var(--ai-thinking, #8b5cf6); }
      100% { box-shadow: 2px 0 0 0 var(--ai-thinking, #8b5cf6); }
    }

    .tool-name {
      flex: 1;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--ink-dark, #3a3530);
    }

    :host([dark]) .tool-name {
      color: var(--paper-cream, #f7f3e8);
    }

    .status-label {
      font-size: 0.7rem;
      padding: 2px 8px;
      border-radius: var(--radius-sm, 4px);
      font-weight: 500;
    }

    .status-label.pending  {
      background: var(--ink-faint, #d9d5d0);
      color: var(--ink-mid, #6a6560);
    }
    .status-label.running  {
      background: color-mix(in srgb, var(--ai-thinking, #8b5cf6) 15%, transparent);
      color: var(--ai-thinking, #8b5cf6);
    }
    .status-label.success  {
      background: color-mix(in srgb, var(--ai-confidence-high, #22c55e) 15%, transparent);
      color: var(--ai-confidence-high, #22c55e);
    }
    .status-label.error    {
      background: color-mix(in srgb, var(--ai-error, #ef4444) 15%, transparent);
      color: var(--ai-error, #ef4444);
    }

    .chevron {
      width: 14px;
      height: 14px;
      stroke: var(--ink-mid, #6a6560);
      stroke-width: 2;
      fill: none;
      transition: transform 0.2s;
    }

    .chevron.open { transform: rotate(180deg); }

    .body {
      display: none;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
    }

    .body.open { display: block; }

    .section-label {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-mid, #6a6560);
      margin-bottom: 4px;
      margin-top: var(--spacing-sm, 8px);
    }

    .section-label:first-child { margin-top: 0; }

    .code-block {
      background: var(--paper-cream, #f7f3e8);
      border: 1px solid var(--ink-faint, #d9d5d0);
      border-radius: var(--radius-sm, 4px);
      padding: var(--spacing-sm, 8px);
      font-size: 0.78rem;
      line-height: 1.5;
      color: var(--ink-dark, #3a3530);
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-all;
    }

    :host([dark]) .code-block {
      background: color-mix(in srgb, var(--paper-aged, #3a3530) 70%, black);
      border-color: var(--ink-dark, #3a3530);
      color: var(--paper-cream, #f7f3e8);
    }
  `;

  constructor() {
    super();
    this.name = '';
    this.status = 'pending';
    this.input = '';
    this.output = '';
    this._expanded = false;
  }

  _toggle() {
    this._expanded = !this._expanded;
    const event = this._expanded ? 'tool-expand' : 'tool-collapse';
    this.dispatchEvent(new CustomEvent(event, {
      bubbles: true, composed: true,
      detail: { name: this.name, status: this.status }
    }));
  }

  _formatJson(str) {
    if (!str) return '';
    try {
      return JSON.stringify(JSON.parse(str), null, 2);
    } catch {
      return str;
    }
  }

  _statusText() {
    const map = { pending: '等待', running: '执行中', success: '完成', error: '错误' };
    return map[this.status] || this.status;
  }

  render() {
    const s = this.status || 'pending';
    return html`
      <div class="card" role="region" aria-label="工具调用: ${this.name}">
        <div class="clip-deco" aria-hidden="true"></div>
        <div
          class="header ${this._expanded ? 'expanded' : ''}"
          role="button"
          tabindex="0"
          aria-expanded="${this._expanded}"
          @click="${this._toggle}"
          @keydown="${(e) => (e.key === 'Enter' || e.key === ' ') && this._toggle()}">
          <span class="status-dot ${s}" aria-hidden="true"></span>
          <span class="tool-name">${this.name || '(tool)'}</span>
          <span class="status-label ${s}">${this._statusText()}</span>
          <svg class="chevron ${this._expanded ? 'open' : ''}" viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div class="body ${this._expanded ? 'open' : ''}">
          ${this.input ? html`
            <div class="section-label">Input</div>
            <pre class="code-block">${this._formatJson(this.input)}</pre>
          ` : ''}
          ${this.output ? html`
            <div class="section-label">Output</div>
            <pre class="code-block">${this._formatJson(this.output)}</pre>
          ` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('ai-tool-call', AIToolCall);
