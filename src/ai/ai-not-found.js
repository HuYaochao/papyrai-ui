// AI Not Found - AI 以为存在但实际不存在
// 属性: what(String) - AI以为存在的资源名

import { PapyraiElement, html, css } from '../core/base.js';

export class AINotFound extends PapyraiElement {
  static properties = {
    what: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }

    .container {
      position: relative;
      padding: var(--spacing-md, 16px);
      background: var(--paper-cream, #f7f3e8);
      border: 2px solid var(--ink-faint, #d9d5d0);
      border-radius: var(--radius-lg, 12px);
      text-align: center;
    }

    :host([dark]) .container {
      background: var(--paper-aged, #3a3530);
    }

    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm, 8px);
      flex-wrap: wrap;
      font-family: var(--font-serif, serif);
    }

    .resource-name {
      font-weight: 600;
      color: var(--ink-dark, #3a3530);
      text-decoration: line-through;
      text-decoration-style: wavy;
      text-decoration-color: var(--accent-red, #c4453c);
    }

    :host([dark]) .resource-name {
      color: var(--ink-light, #aaa5a0);
    }

    .description {
      margin-top: var(--spacing-sm, 8px);
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      color: var(--ink-mid, #6a6560);
    }

    .stamp {
      position: absolute;
      top: 12px;
      right: 12px;
      font-family: var(--font-handwrite, cursive);
      font-size: 1rem;
      color: var(--accent-red, #c4453c);
      padding: 4px 8px;
      border: 2px solid var(--accent-red, #c4453c);
      border-radius: 4px;
      transform: rotate(12deg);
      animation: stampIn 0.3s ease-out;
    }

    @keyframes stampIn {
      0% {
        transform: rotate(12deg) scale(2);
        opacity: 0;
      }
      100% {
        transform: rotate(12deg) scale(1);
        opacity: 1;
      }
    }
  `;

  constructor() {
    super();
    this.what = '';
  }

  render() {
    return html`
      <div class="container">
        <div class="stamp">虚构</div>
        <div class="content">
          <slot></slot>
          ${this.what ? html`<span class="resource-name">${this.what}</span>` : ''}
        </div>
        <p class="description">AI 以为存在但实际不存在</p>
      </div>
    `;
  }
}

customElements.define('ai-not-found', AINotFound);
