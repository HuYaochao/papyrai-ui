// AI Thinking - 墨水晕开式骨架屏动画
// 属性: model(String, 'AI'), speed(String, 'normal'|'slow'|'fast')

import { PapyraiElement, html, css } from '../core/base.js';

export class AIThinking extends PapyraiElement {
  static properties = {
    model: { type: String },
    speed: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .container {
      position: relative;
      padding: var(--spacing-md, 16px);
      padding-left: var(--spacing-lg, 24px);
      background: var(--paper-cream, #f7f3e8);
      border-left: 4px solid var(--ai-thinking, #8b5cf6);
      border-radius: var(--radius-md, 8px);
    }

    :host([dark]) .container {
      background: var(--paper-aged, #3a3530);
    }

    .header {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      margin-bottom: var(--spacing-md, 16px);
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--ink-faint, #d9d5d0);
      border-top-color: var(--ai-thinking, #8b5cf6);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    :host([speed="slow"]) .spinner {
      animation-duration: 2s;
    }

    :host([speed="fast"]) .spinner {
      animation-duration: 0.5s;
    }

    .model-name {
      font-family: var(--font-mono, monospace);
      font-size: 0.8rem;
      color: var(--ai-thinking, #8b5cf6);
      font-weight: 600;
    }

    .skeleton-lines {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 8px);
    }

    .skeleton-line {
      height: 12px;
      border-radius: 6px;
      background: linear-gradient(90deg, 
        var(--ink-faint, #d9d5d0) 0%, 
        var(--ink-light, #aaa5a0) 50%, 
        var(--ink-faint, #d9d5d0) 100%);
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-line:nth-child(1) {
      width: 80%;
    }

    .skeleton-line:nth-child(2) {
      width: 60%;
    }

    .skeleton-line:nth-child(3) {
      width: 70%;
    }

    :host([speed="slow"]) .skeleton-line {
      animation-duration: 2.5s;
    }

    :host([speed="fast"]) .skeleton-line {
      animation-duration: 0.8s;
    }

    .ink-drop {
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      opacity: 0.2;
      animation: inkPulse 2s ease-in-out infinite;
    }

    .ink-drop::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--ai-thinking, #8b5cf6);
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      transform: rotate(45deg);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes inkPulse {
      0%, 100% { transform: scale(1); opacity: 0.2; }
      50% { transform: scale(1.1); opacity: 0.3; }
    }
  `;

  constructor() {
    super();
    this.model = 'AI';
    this.speed = 'normal';
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <div class="spinner"></div>
          <span class="model-name">${this.model}</span>
        </div>
        <div class="skeleton-lines">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
        <div class="ink-drop"></div>
      </div>
    `;
  }
}

customElements.define('ai-thinking', AIThinking);
