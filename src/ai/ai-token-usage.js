// AI Token Usage - Token 消耗详情面板
// 属性: inputTokens(Number), outputTokens(Number), inputRate(Number), outputRate(Number), model(String)

import { PapyraiElement, html, css } from '../core/base.js';

export class AITokenUsage extends PapyraiElement {
  static properties = {
    inputTokens: { type: Number },
    outputTokens: { type: Number },
    inputRate: { type: Number },
    outputRate: { type: Number },
    model: { type: String },
    compact: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-mono, monospace);
    }

    .card {
      background: var(--paper-white, #fdfbf7);
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      overflow: hidden;
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
      cursor: pointer;
      transition: box-shadow 0.2s;
    }

    .card:hover {
      box-shadow: var(--elevation-2, 0 4px 6px rgba(0,0,0,.07));
    }

    :host([dark]) .card {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
    }

    /* Top bar */
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      background: var(--paper-cream, #f7f3e8);
      border-bottom: 1px solid var(--paper-border, #d9d0be);
    }

    :host([dark]) .topbar {
      background: color-mix(in srgb, var(--paper-aged, #3a3530) 80%, black);
      border-bottom-color: var(--ink-dark, #3a3530);
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
    }

    .title {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--ink-dark, #3a3530);
    }

    :host([dark]) .title { color: var(--paper-cream, #f7f3e8); }

    .total-cost {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--ai-thinking, #8b5cf6);
    }

    /* Ratio bar */
    .ratio-bar-wrap {
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
    }

    .ratio-legend {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.68rem;
      color: var(--ink-mid, #6a6560);
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .legend-dot.input  { background: var(--accent-blue, #4a7c9b); }
    .legend-dot.output { background: var(--ai-thinking, #8b5cf6); }

    .ratio-bar {
      height: 10px;
      border-radius: 5px;
      background: var(--ink-faint, #d9d5d0);
      overflow: hidden;
      display: flex;
    }

    .bar-input {
      background: var(--accent-blue, #4a7c9b);
      height: 100%;
      transition: width 0.5s ease-out;
      border-radius: 5px 0 0 5px;
    }

    .bar-output {
      background: var(--ai-thinking, #8b5cf6);
      height: 100%;
      transition: width 0.5s ease-out;
      flex: 1;
      border-radius: 0 5px 5px 0;
    }

    /* Detail rows */
    .detail {
      padding: var(--spacing-xs, 4px) var(--spacing-md, 16px) var(--spacing-sm, 8px);
    }

    :host([compact]) .detail { display: none; }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
      border-bottom: 1px solid var(--paper-border, #d9d0be);
      font-size: 0.75rem;
    }

    .row:last-child { border-bottom: none; }

    :host([dark]) .row { border-bottom-color: var(--ink-dark, #3a3530); }

    .row-label {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--ink-mid, #6a6560);
    }

    .row-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .row-dot.input  { background: var(--accent-blue, #4a7c9b); }
    .row-dot.output { background: var(--ai-thinking, #8b5cf6); }
    .row-dot.total  { background: var(--ink-mid, #6a6560); }

    .row-tokens {
      color: var(--ink-dark, #3a3530);
      font-weight: 500;
    }

    :host([dark]) .row-tokens { color: var(--paper-cream, #f7f3e8); }

    .row-cost {
      font-weight: 600;
      min-width: 60px;
      text-align: right;
    }

    .row-cost.input  { color: var(--accent-blue, #4a7c9b); }
    .row-cost.output { color: var(--ai-thinking, #8b5cf6); }
    .row-cost.total  { color: var(--ai-thinking, #8b5cf6); font-size: 0.82rem; }
  `;

  constructor() {
    super();
    this.inputTokens = 0;
    this.outputTokens = 0;
    this.inputRate = 0.003;    // $ per 1k tokens
    this.outputRate = 0.015;   // $ per 1k tokens
    this.model = '';
    this.compact = false;
  }

  _cost(tokens, rate) {
    return ((tokens / 1000) * rate).toFixed(4);
  }

  _totalCost() {
    return (
      parseFloat(this._cost(this.inputTokens, this.inputRate)) +
      parseFloat(this._cost(this.outputTokens, this.outputRate))
    ).toFixed(4);
  }

  _inputPct() {
    const total = this.inputTokens + this.outputTokens;
    if (!total) return 50;
    return Math.round((this.inputTokens / total) * 100);
  }

  _click() {
    this.dispatchEvent(new CustomEvent('usage-click', {
      bubbles: true, composed: true,
      detail: {
        inputTokens: this.inputTokens,
        outputTokens: this.outputTokens,
        totalCost: this._totalCost(),
        model: this.model
      }
    }));
  }

  render() {
    const inputPct = this._inputPct();
    const outputPct = 100 - inputPct;
    const totalTokens = this.inputTokens + this.outputTokens;
    return html`
      <div class="card" role="region" aria-label="Token 用量" @click="${this._click}">
        <div class="topbar">
          <div class="topbar-left">
            <span class="title">Token Usage</span>
            ${this.model ? html`<ai-model-badge model="${this.model}"></ai-model-badge>` : ''}
          </div>
          <span class="total-cost">$${this._totalCost()}</span>
        </div>

        <div class="ratio-bar-wrap">
          <div class="ratio-legend">
            <span class="legend-item">
              <span class="legend-dot input"></span>
              Input ${inputPct}%
            </span>
            <span class="legend-item">
              <span class="legend-dot output"></span>
              Output ${outputPct}%
            </span>
          </div>
          <div class="ratio-bar" role="meter"
               aria-valuenow="${this.inputTokens}"
               aria-valuemax="${totalTokens}"
               aria-label="Input vs Output token ratio">
            <div class="bar-input" style="width:${inputPct}%"></div>
            <div class="bar-output"></div>
          </div>
        </div>

        <div class="detail">
          <div class="row">
            <span class="row-label">
              <span class="row-dot input"></span>
              Input tokens
            </span>
            <span class="row-tokens">${this.inputTokens.toLocaleString()}</span>
            <span class="row-cost input">$${this._cost(this.inputTokens, this.inputRate)}</span>
          </div>
          <div class="row">
            <span class="row-label">
              <span class="row-dot output"></span>
              Output tokens
            </span>
            <span class="row-tokens">${this.outputTokens.toLocaleString()}</span>
            <span class="row-cost output">$${this._cost(this.outputTokens, this.outputRate)}</span>
          </div>
          <div class="row">
            <span class="row-label">
              <span class="row-dot total"></span>
              Total
            </span>
            <span class="row-tokens">${totalTokens.toLocaleString()}</span>
            <span class="row-cost total">$${this._totalCost()}</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ai-token-usage', AITokenUsage);
