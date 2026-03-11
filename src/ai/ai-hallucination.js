// AI Hallucination - 标记可能为幻觉的内容
// 属性: label(String, '可能为幻觉内容')

import { PapyraiElement, html, css } from '../core/base.js';

export class AIHallucination extends PapyraiElement {
  static properties = {
    label: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }

    .container {
      position: relative;
      padding: var(--spacing-md, 16px);
      background: var(--paper-cream, #f7f3e8);
      border: 2px dashed var(--ai-hallucination, #eab308);
      border-radius: var(--radius-md, 8px);
    }

    :host([dark]) .container {
      background: var(--paper-aged, #3a3530);
    }

    .warning-label {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: var(--spacing-sm, 8px);
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      color: var(--ai-hallucination, #eab308);
      font-weight: 500;
    }

    .content {
      font-family: var(--font-serif, serif);
      color: var(--ink-mid, #6a6560);
      font-style: italic;
    }

    :host([dark]) .content {
      color: var(--ink-light, #aaa5a0);
    }

    .question-mark {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 2rem;
      font-weight: bold;
      color: var(--ai-hallucination, #eab308);
      opacity: 0.3;
      pointer-events: none;
    }

    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-12deg);
      font-family: var(--font-handwrite, cursive);
      font-size: 1.5rem;
      color: var(--ink-faint, #d9d5d0);
      opacity: 0.5;
      pointer-events: none;
      text-transform: uppercase;
      letter-spacing: 0.2em;
    }
  `;

  constructor() {
    super();
    this.label = '可能为幻觉内容';
  }

  render() {
    return html`
      <div class="container">
        <div class="warning-label">
          <span>⚠</span>
          <span>${this.label}</span>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <span class="question-mark">?</span>
        <span class="watermark">UNVERIFIED</span>
      </div>
    `;
  }
}

customElements.define('ai-hallucination', AIHallucination);
