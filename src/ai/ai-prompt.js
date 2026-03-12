// AI Prompt - AI 提示词输入框
// 属性: placeholder(String), maxTokens(Number), value(String), disabled(Boolean), showTokenCount(Boolean)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIPrompt extends PapyraiElement {
  static properties = {
    placeholder: { type: String },
    maxTokens: { type: Number },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    showTokenCount: { type: Boolean },
    _tokenCount: { state: true },
    _focused: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .container {
      position: relative;
      background: var(--paper-white, #fdfbf7);
      border: 1.5px solid var(--paper-border, #d9d0be);
      border-radius: var(--radius-lg, 12px);
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
      transition: border-color 0.2s, box-shadow 0.2s;
      overflow: hidden;
    }

    .container.focused {
      border-color: var(--ai-thinking, #8b5cf6);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--ai-thinking, #8b5cf6) 12%, transparent),
                  var(--elevation-2, 0 4px 6px rgba(0,0,0,.07));
    }

    :host([disabled]) .container {
      opacity: 0.55;
      pointer-events: none;
    }

    :host([dark]) .container {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
    }

    /* Quill decoration */
    .quill-deco {
      position: absolute;
      top: var(--spacing-sm, 8px);
      right: var(--spacing-sm, 8px);
      width: 20px;
      height: 20px;
      opacity: 0.18;
      pointer-events: none;
    }

    .quill-deco svg {
      width: 20px;
      height: 20px;
      stroke: var(--ai-thinking, #8b5cf6);
      stroke-width: 1.5;
      fill: none;
    }

    .textarea {
      display: block;
      width: 100%;
      min-height: 80px;
      max-height: 320px;
      padding: var(--spacing-md, 16px);
      padding-right: 36px;
      padding-bottom: 44px;
      background: transparent;
      border: none;
      outline: none;
      resize: none;
      font-family: var(--font-serif, serif);
      font-size: 0.95rem;
      line-height: 1.7;
      color: var(--ink-dark, #3a3530);
      overflow-y: auto;
    }

    :host([dark]) .textarea {
      color: var(--paper-cream, #f7f3e8);
    }

    .textarea::placeholder {
      color: var(--ink-light, #aaa5a0);
      font-style: italic;
    }

    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px var(--spacing-sm, 8px) 6px var(--spacing-md, 16px);
      border-top: 1px solid var(--paper-border, #d9d0be);
      background: var(--paper-cream, #f7f3e8);
    }

    :host([dark]) .footer {
      background: var(--paper-aged, #3a3530);
      border-top-color: var(--ink-dark, #3a3530);
    }

    .token-count {
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      color: var(--ink-light, #aaa5a0);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .token-count.over {
      color: var(--ai-error, #ef4444);
    }

    .actions-slot {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .submit-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 5px 14px;
      background: var(--ai-thinking, #8b5cf6);
      color: #fff;
      border: none;
      border-radius: var(--radius-md, 8px);
      font-family: var(--font-handwrite, cursive);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
      box-shadow: 0 2px 4px color-mix(in srgb, var(--ai-thinking, #8b5cf6) 40%, transparent);
    }

    .submit-btn:hover:not(:disabled) {
      background: color-mix(in srgb, var(--ai-thinking, #8b5cf6) 85%, black);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px color-mix(in srgb, var(--ai-thinking, #8b5cf6) 35%, transparent);
    }

    .submit-btn:active:not(:disabled) {
      transform: translateY(0);
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .submit-icon {
      width: 14px;
      height: 14px;
      stroke: #fff;
      stroke-width: 2;
      fill: none;
    }
  `;

  constructor() {
    super();
    this.placeholder = '输入你的问题…';
    this.maxTokens = 4096;
    this.value = '';
    this.disabled = false;
    this.showTokenCount = true;
    this._tokenCount = 0;
    this._focused = false;
  }

  _estimateTokens(text) {
    return Math.ceil((text || '').length / 4);
  }

  _onInput(e) {
    this.value = e.target.value;
    this._tokenCount = this._estimateTokens(this.value);
    this.dispatchEvent(new CustomEvent('prompt-change', {
      bubbles: true, composed: true,
      detail: { value: this.value, tokenCount: this._tokenCount }
    }));
  }

  _onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this._submit();
    }
  }

  _submit() {
    if (!this.value.trim() || this.disabled) return;
    this.dispatchEvent(new CustomEvent('prompt-submit', {
      bubbles: true, composed: true,
      detail: { value: this.value, tokenCount: this._tokenCount }
    }));
  }

  render() {
    const isOver = this.maxTokens && this._tokenCount > this.maxTokens;
    return html`
      <div class="container ${this._focused ? 'focused' : ''}">
        <div class="quill-deco" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 19L20 5"/>
            <path d="M20 5l-1 1 2 2 1-1-2-2z"/>
            <path d="M8 19l3-3"/>
            <path d="M11 16l2-2"/>
          </svg>
        </div>

        <textarea
          class="textarea"
          .value="${this.value}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          aria-label="AI 提示词输入"
          aria-multiline="true"
          @input="${this._onInput}"
          @keydown="${this._onKeyDown}"
          @focus="${() => { this._focused = true; }}"
          @blur="${() => { this._focused = false; }}"
        ></textarea>

        <div class="footer">
          <div>
            ${this.showTokenCount ? html`
              <span class="token-count ${isOver ? 'over' : ''}">
                ${this._tokenCount}${this.maxTokens ? html` / ${this.maxTokens}` : ''} tokens
              </span>
            ` : ''}
          </div>
          <div class="actions-slot">
            <slot name="actions"></slot>
            <button
              class="submit-btn"
              ?disabled="${this.disabled || !this.value.trim() || isOver}"
              @click="${this._submit}"
              aria-label="提交"
              title="Enter 提交 · Shift+Enter 换行">
              <svg class="submit-icon" viewBox="0 0 24 24" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              发送
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ai-prompt', AIPrompt);
