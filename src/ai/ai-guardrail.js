// AI Guardrail - 内容安全 / 过滤提示
// 属性: level('info'|'warning'|'blocked'), reason(String), policy(String)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIGuardrail extends PapyraiElement {
  static properties = {
    level: { type: String, reflect: true },
    reason: { type: String },
    policy: { type: String },
    _revealed: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .container {
      position: relative;
      border-radius: var(--radius-md, 8px);
      overflow: hidden;
    }

    /* Info */
    :host([level="info"]) .container {
      border: 1px solid var(--accent-blue, #4a7c9b);
      background: color-mix(in srgb, var(--accent-blue, #4a7c9b) 6%, var(--paper-white, #fdfbf7));
    }

    /* Warning */
    :host([level="warning"]) .container {
      border: 1.5px solid var(--accent-amber, #c49a3c);
      background: color-mix(in srgb, var(--accent-amber, #c49a3c) 6%, var(--paper-white, #fdfbf7));
    }

    /* Blocked */
    :host([level="blocked"]) .container {
      border: 2px solid var(--ai-error, #ef4444);
      background: color-mix(in srgb, var(--ai-error, #ef4444) 5%, var(--paper-white, #fdfbf7));
    }

    :host([dark]) .container {
      background: var(--paper-aged, #3a3530);
    }

    .header {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
    }

    .icon {
      flex-shrink: 0;
      margin-top: 2px;
      width: 18px;
      height: 18px;
    }

    .icon svg {
      width: 18px;
      height: 18px;
      stroke-width: 1.8;
      fill: none;
    }

    :host([level="info"]) .icon svg    { stroke: var(--accent-blue, #4a7c9b); }
    :host([level="warning"]) .icon svg { stroke: var(--accent-amber, #c49a3c); }
    :host([level="blocked"]) .icon svg { stroke: var(--ai-error, #ef4444); }

    .text-group {
      flex: 1;
      min-width: 0;
    }

    .level-tag {
      display: inline-block;
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 1px 7px;
      border-radius: var(--radius-sm, 4px);
      margin-bottom: 4px;
    }

    :host([level="info"]) .level-tag {
      background: color-mix(in srgb, var(--accent-blue, #4a7c9b) 15%, transparent);
      color: var(--accent-blue, #4a7c9b);
    }

    :host([level="warning"]) .level-tag {
      background: color-mix(in srgb, var(--accent-amber, #c49a3c) 15%, transparent);
      color: var(--accent-amber, #c49a3c);
    }

    :host([level="blocked"]) .level-tag {
      background: color-mix(in srgb, var(--ai-error, #ef4444) 15%, transparent);
      color: var(--ai-error, #ef4444);
    }

    .reason {
      font-size: 0.85rem;
      line-height: 1.5;
      color: var(--ink-dark, #3a3530);
    }

    :host([dark]) .reason { color: var(--paper-cream, #f7f3e8); }

    .policy {
      margin-top: 4px;
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      color: var(--ink-light, #aaa5a0);
    }

    /* Stamp decoration for warning/blocked */
    .stamp {
      position: absolute;
      top: 8px;
      right: 12px;
      font-family: var(--font-handwrite, cursive);
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: var(--radius-sm, 4px);
      border: 2.5px solid currentColor;
      opacity: 0.22;
      transform: rotate(-8deg);
      pointer-events: none;
      user-select: none;
    }

    :host([level="warning"]) .stamp {
      color: var(--accent-amber, #c49a3c);
    }

    :host([level="blocked"]) .stamp {
      color: var(--ai-error, #ef4444);
      font-size: 1.1rem;
      opacity: 0.28;
    }

    /* Slot content */
    .slot-wrap {
      position: relative;
    }

    /* Blur overlay for blocked content */
    :host([level="blocked"]) .slot-wrap:not(.revealed) ::slotted(*) {
      filter: blur(6px);
      user-select: none;
      pointer-events: none;
    }

    :host([level="blocked"]) .slot-wrap:not(.revealed) {
      min-height: 40px;
    }

    .reveal-btn {
      display: none;
      width: 100%;
      padding: 6px;
      border: none;
      border-top: 1px dashed var(--ai-error, #ef4444);
      background: transparent;
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
      color: var(--ai-error, #ef4444);
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.15s;
    }

    .reveal-btn:hover { opacity: 1; }

    :host([level="blocked"]) .reveal-btn {
      display: block;
    }
  `;

  constructor() {
    super();
    this.level = 'info';
    this.reason = '';
    this.policy = '';
    this._revealed = false;
  }

  _levelLabel() {
    const map = { info: 'Notice', warning: 'Caution', blocked: 'Blocked' };
    return map[this.level] || this.level;
  }

  _stampText() {
    if (this.level === 'blocked') return 'BLOCKED';
    if (this.level === 'warning') return 'CAUTION';
    return '';
  }

  _iconPath() {
    if (this.level === 'info') return html`
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>`;
    if (this.level === 'warning') return html`
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>`;
    return html`
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>`;
  }

  _reveal() {
    this._revealed = true;
    this.dispatchEvent(new CustomEvent('guardrail-action', {
      bubbles: true, composed: true,
      detail: { action: 'reveal', level: this.level }
    }));
  }

  render() {
    const hasSlot = true;
    return html`
      <div class="container" role="alert" aria-live="polite">
        ${this._stampText() ? html`
          <div class="stamp" aria-hidden="true">${this._stampText()}</div>
        ` : ''}
        <div class="header">
          <div class="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">${this._iconPath()}</svg>
          </div>
          <div class="text-group">
            <div class="level-tag">${this._levelLabel()}</div>
            ${this.reason ? html`<div class="reason">${this.reason}</div>` : ''}
            ${this.policy ? html`<div class="policy">Policy: ${this.policy}</div>` : ''}
          </div>
        </div>
        <div class="slot-wrap ${this._revealed ? 'revealed' : ''}">
          <slot></slot>
        </div>
        ${this.level === 'blocked' && !this._revealed ? html`
          <button class="reveal-btn" @click="${this._reveal}" aria-label="显示被过滤的内容">
            ⚠ 点击查看被过滤内容（可能包含不适当内容）
          </button>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('ai-guardrail', AIGuardrail);
