// AI Message - 聊天消息气泡
// 属性: role('user'|'assistant'|'system'), model(String), timestamp(String), avatar(String), loading(Boolean)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIMessage extends PapyraiElement {
  static properties = {
    role: { type: String, reflect: true },
    model: { type: String },
    timestamp: { type: String },
    avatar: { type: String },
    loading: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
      padding: var(--spacing-xs, 4px) 0;
    }

    .message-row {
      display: flex;
      align-items: flex-end;
      gap: var(--spacing-sm, 8px);
      max-width: 100%;
    }

    /* User: right-aligned */
    :host([role="user"]) .message-row {
      flex-direction: row-reverse;
    }

    /* System: centered */
    :host([role="system"]) .message-row {
      justify-content: center;
    }

    .avatar {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      border: 1.5px solid var(--paper-border, #d9d0be);
      background: var(--paper-cream, #f7f3e8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-handwrite, cursive);
      font-size: 0.85rem;
      color: var(--ink-mid, #6a6560);
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    :host([role="system"]) .avatar {
      display: none;
    }

    .bubble-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-width: 72%;
    }

    :host([role="system"]) .bubble-wrap {
      max-width: 80%;
      align-items: center;
    }

    .bubble {
      position: relative;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      border-radius: var(--radius-lg, 12px);
      line-height: 1.7;
      font-size: 0.9rem;
      word-break: break-word;
    }

    /* User bubble — paper-note style */
    :host([role="user"]) .bubble {
      background: var(--paper-cream, #f7f3e8);
      border: 1px solid var(--paper-border, #d9d0be);
      border-bottom-right-radius: var(--radius-sm, 4px);
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
      color: var(--ink-dark, #3a3530);
    }

    /* Assistant bubble — typewriter-paper style */
    :host([role="assistant"]) .bubble {
      background: var(--paper-white, #fdfbf7);
      border: 1px solid var(--paper-border, #d9d0be);
      border-bottom-left-radius: var(--radius-sm, 4px);
      box-shadow: var(--elevation-2, 0 4px 6px rgba(0,0,0,.07));
      color: var(--ink-dark, #3a3530);
    }

    /* System bubble — muted ink */
    :host([role="system"]) .bubble {
      background: transparent;
      border: 1px dashed var(--ink-faint, #d9d5d0);
      border-radius: var(--radius-md, 8px);
      color: var(--ink-mid, #6a6560);
      font-size: 0.8rem;
      font-style: italic;
      text-align: center;
    }

    :host([dark]) .bubble {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
      color: var(--paper-cream, #f7f3e8);
    }

    /* Dog-ear on user bubble */
    :host([role="user"]) .bubble::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -6px;
      width: 12px;
      height: 12px;
      background: var(--paper-cream, #f7f3e8);
      border-left: 1px solid var(--paper-border, #d9d0be);
      border-bottom: 1px solid var(--paper-border, #d9d0be);
      clip-path: polygon(0 0, 0 100%, 100% 100%);
    }

    :host([role="assistant"]) .bubble::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -6px;
      width: 12px;
      height: 12px;
      background: var(--paper-white, #fdfbf7);
      border-right: 1px solid var(--paper-border, #d9d0be);
      border-bottom: 1px solid var(--paper-border, #d9d0be);
      clip-path: polygon(100% 0, 0 100%, 100% 100%);
    }

    .meta-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono, monospace);
      font-size: 0.68rem;
      color: var(--ink-light, #aaa5a0);
    }

    :host([role="user"]) .meta-row {
      justify-content: flex-end;
    }

    :host([role="system"]) .meta-row {
      justify-content: center;
    }

    .timestamp {
      color: var(--ink-light, #aaa5a0);
    }

    /* Loading state */
    .thinking-inline {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 0;
    }

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--ai-thinking, #8b5cf6);
      animation: bounce 1.2s ease-in-out infinite;
    }

    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }
  `;

  constructor() {
    super();
    this.role = 'assistant';
    this.model = '';
    this.timestamp = '';
    this.avatar = '';
    this.loading = false;
  }

  _avatarContent() {
    if (this.avatar) {
      return html`<img src="${this.avatar}" alt="${this.role}" />`;
    }
    const initials = { user: 'U', assistant: 'AI', system: 'S' };
    return html`${initials[this.role] || 'AI'}`;
  }

  _loadingContent() {
    return html`
      <div class="thinking-inline" aria-label="正在输入">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>`;
  }

  render() {
    return html`
      <div class="message-row" role="article" aria-label="${this.role} 消息">
        <div class="avatar" aria-hidden="true">${this._avatarContent()}</div>
        <div class="bubble-wrap">
          <div class="bubble">
            ${this.loading ? this._loadingContent() : html`<slot></slot>`}
          </div>
          <div class="meta-row">
            ${this.model ? html`<ai-model-badge model="${this.model}"></ai-model-badge>` : ''}
            ${this.timestamp ? html`<span class="timestamp">${this.timestamp}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  _handleAction(type) {
    this.dispatchEvent(new CustomEvent('message-action', {
      bubbles: true, composed: true,
      detail: { type, role: this.role }
    }));
  }
}

customElements.define('ai-message', AIMessage);
