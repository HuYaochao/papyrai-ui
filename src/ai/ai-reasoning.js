// AI Reasoning - 推理链 / 思维过程展示
// 属性: steps(JSON array of {title, content}), collapsed(Boolean, default true), label(String)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIReasoning extends PapyraiElement {
  static properties = {
    steps: { type: Array },
    collapsed: { type: Boolean, reflect: true },
    label: { type: String },
    _steps: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .container {
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-md, 8px);
      overflow: hidden;
      background: var(--paper-white, #fdfbf7);
    }

    :host([dark]) .container {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
    }

    .toggle-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      cursor: pointer;
      user-select: none;
      background: var(--paper-cream, #f7f3e8);
      transition: background 0.15s;
    }

    .toggle-row:hover {
      background: color-mix(in srgb, var(--paper-cream, #f7f3e8) 70%, var(--ink-faint, #d9d5d0));
    }

    :host([dark]) .toggle-row {
      background: color-mix(in srgb, var(--paper-aged, #3a3530) 80%, black);
    }

    .thinking-dots {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--ai-thinking, #8b5cf6);
      animation: blink 1.4s ease-in-out infinite;
    }

    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes blink {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.9); }
      40% { opacity: 1; transform: scale(1.1); }
    }

    .label-text {
      flex: 1;
      font-family: var(--font-handwrite, cursive);
      font-size: 0.9rem;
      color: var(--ai-thinking, #8b5cf6);
      font-weight: 500;
    }

    .step-count {
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      color: var(--ink-light, #aaa5a0);
    }

    .chevron {
      width: 14px;
      height: 14px;
      stroke: var(--ink-mid, #6a6560);
      stroke-width: 2;
      fill: none;
      transition: transform 0.25s;
    }

    .chevron.open { transform: rotate(180deg); }

    /* Steps */
    .steps-body {
      display: none;
      padding: var(--spacing-md, 16px);
      border-top: 1px solid var(--paper-border, #d9d0be);
    }

    :host([dark]) .steps-body {
      border-top-color: var(--ink-dark, #3a3530);
    }

    .steps-body.open { display: block; }

    .step-list {
      position: relative;
      padding-left: 28px;
    }

    /* Connecting ink line */
    .step-list::before {
      content: '';
      position: absolute;
      left: 9px;
      top: 12px;
      bottom: 12px;
      width: 2px;
      background: repeating-linear-gradient(
        to bottom,
        var(--ai-thinking, #8b5cf6) 0,
        var(--ai-thinking, #8b5cf6) 4px,
        transparent 4px,
        transparent 8px
      );
      opacity: 0.4;
    }

    .step-item {
      position: relative;
      margin-bottom: var(--spacing-md, 16px);
    }

    .step-item:last-child { margin-bottom: 0; }

    .step-node {
      position: absolute;
      left: -22px;
      top: 4px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--paper-white, #fdfbf7);
      border: 2px solid var(--ai-thinking, #8b5cf6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono, monospace);
      font-size: 0.6rem;
      font-weight: 700;
      color: var(--ai-thinking, #8b5cf6);
      z-index: 1;
    }

    :host([dark]) .step-node {
      background: var(--paper-aged, #3a3530);
    }

    .step-title {
      font-family: var(--font-handwrite, cursive);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--ink-dark, #3a3530);
      margin-bottom: 4px;
      line-height: 1.3;
    }

    :host([dark]) .step-title {
      color: var(--paper-cream, #f7f3e8);
    }

    .step-content {
      font-size: 0.85rem;
      line-height: 1.6;
      color: var(--ink-mid, #6a6560);
    }

    :host([dark]) .step-content {
      color: var(--ink-light, #aaa5a0);
    }
  `;

  constructor() {
    super();
    this.steps = [];
    this.collapsed = true;
    this.label = 'Thinking...';
    this._steps = [];
  }

  updated(changedProperties) {
    if (changedProperties.has('steps')) {
      if (typeof this.steps === 'string') {
        try { this._steps = JSON.parse(this.steps); } catch { this._steps = []; }
      } else {
        this._steps = this.steps || [];
      }
    }
  }

  _toggle() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('reasoning-toggle', {
      bubbles: true, composed: true,
      detail: { collapsed: this.collapsed }
    }));
  }

  render() {
    const steps = this._steps.length ? this._steps : (
      typeof this.steps === 'string'
        ? (JSON.parse(this.steps || '[]') || [])
        : (this.steps || [])
    );
    return html`
      <div class="container" role="region" aria-label="推理过程">
        <div
          class="toggle-row"
          role="button"
          tabindex="0"
          aria-expanded="${!this.collapsed}"
          @click="${this._toggle}"
          @keydown="${(e) => (e.key === 'Enter' || e.key === ' ') && this._toggle()}">
          <div class="thinking-dots" aria-hidden="true">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <span class="label-text">${this.label}</span>
          ${steps.length ? html`<span class="step-count">${steps.length} steps</span>` : ''}
          <svg class="chevron ${!this.collapsed ? 'open' : ''}" viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>

        <div class="steps-body ${!this.collapsed ? 'open' : ''}" aria-hidden="${this.collapsed}">
          ${steps.length ? html`
            <ol class="step-list" role="list">
              ${steps.map((step, i) => html`
                <li class="step-item" role="listitem">
                  <div class="step-node" aria-hidden="true">${i + 1}</div>
                  ${step.title ? html`<div class="step-title">${step.title}</div>` : ''}
                  ${step.content ? html`<div class="step-content">${step.content}</div>` : ''}
                </li>
              `)}
            </ol>
          ` : html`<slot></slot>`}
        </div>
      </div>
    `;
  }
}

customElements.define('ai-reasoning', AIReasoning);
