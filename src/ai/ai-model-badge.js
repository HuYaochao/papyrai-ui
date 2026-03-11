// AI Model Badge - 模型徽章，根据模型名自动配色
// 属性: model(String)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIModelBadge extends PapyraiElement {
  static properties = {
    model: { type: String }
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: var(--paper-cream, #f7f3e8);
      border: 1px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-lg, 12px);
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      font-weight: 500;
    }

    :host([dark]) .badge {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .dot.claude { background: #d97706; }
    .dot.gpt { background: #10a37f; }
    .dot.qwen { background: #3b82f6; }
    .dot.gemini { background: #ec4899; }
    .dot.llama { background: #8b5cf6; }
    .dot.default { background: #6b7280; }

    .name {
      color: var(--ink-dark, #3a3530);
    }

    :host([dark]) .name {
      color: var(--ink-light, #aaa5a0);
    }
  `;

  constructor() {
    super();
    this.model = '';
  }

  _getModelKey() {
    const m = this.model.toLowerCase();
    if (m.includes('claude')) return 'claude';
    if (m.includes('gpt')) return 'gpt';
    if (m.includes('qwen')) return 'qwen';
    if (m.includes('gemini')) return 'gemini';
    if (m.includes('llama')) return 'llama';
    return 'default';
  }

  _getDisplayName() {
    const m = this.model.toLowerCase();
    if (m.includes('claude')) return 'Claude';
    if (m.includes('gpt')) return 'GPT';
    if (m.includes('qwen')) return 'Qwen';
    if (m.includes('gemini')) return 'Gemini';
    if (m.includes('llama')) return 'Llama';
    return this.model || 'AI';
  }

  render() {
    return html`
      <span class="badge">
        <span class="dot ${this._getModelKey()}"></span>
        <span class="name">${this._getDisplayName()}</span>
      </span>
    `;
  }
}

customElements.define('ai-model-badge', AIModelBadge);
