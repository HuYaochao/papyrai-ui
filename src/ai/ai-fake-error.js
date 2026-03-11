// AI Fake Error - 假装错误揭示效果
// 属性: message(String), delay(Number, 1500ms)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIFakeError extends PapyraiElement {
  static properties = {
    message: { type: String },
    delay: { type: Number },
    _revealed: { state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

    .container {
      position: relative;
      padding: var(--spacing-md, 16px);
      background: var(--paper-black, #1a1612);
      border-radius: var(--radius-md, 8px);
      font-family: var(--font-mono, monospace);
      font-size: 0.85rem;
      overflow: hidden;
    }

    :host([dark]) .container {
      background: var(--paper-black, #0a0908);
    }

    .tag {
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 0.65rem;
      color: var(--ink-faint, #d9d5d0);
      opacity: 0.5;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .error-message {
      color: var(--ai-error, #ef4444);
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-xs, 4px);
    }

    .error-message::before {
      content: '✕';
      flex-shrink: 0;
    }

    .error-message.strikethrough {
      text-decoration: line-through;
      opacity: 0.5;
    }

    .revealed-content {
      color: var(--ai-stream, #10b981);
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-xs, 4px);
      animation: fadeIn 0.5s ease-out;
    }

    .revealed-content::before {
      content: '✓';
      flex-shrink: 0;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  constructor() {
    super();
    this.message = 'TypeError: Cannot read properties of undefined';
    this.delay = 1500;
    this._revealed = false;
    this._timeoutId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._startReveal();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  _startReveal() {
    this._revealed = false;
    this._timeoutId = setTimeout(() => {
      this._revealed = true;
    }, this.delay);
  }

  render() {
    return html`
      <div class="container">
        <span class="tag">ai-fake-error</span>
        ${!this._revealed ? html`
          <div class="error-message">${this.message}</div>
        ` : html`
          <div class="error-message strikethrough">${this.message}</div>
          <div class="revealed-content">
            <slot></slot>
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('ai-fake-error', AIFakeError);
