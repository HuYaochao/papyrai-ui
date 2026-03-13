// ChatBubble — generic chat message bubble (not AI-specific, no model badge)
// Props: align('left'|'right'), timestamp, name, variant('default'|'paper')
// Slots: default (message content), avatar

import { PapyraiElement, html, css } from '../../core/base.js';

export class PChatBubble extends PapyraiElement {
  static properties = {
    align:     { type: String, reflect: true },
    timestamp: { type: String },
    name:      { type: String },
    variant:   { type: String, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .row {
      display: flex;
      align-items: flex-end;
      gap: var(--spacing-sm, 8px);
    }

    :host([align="right"]) .row {
      flex-direction: row-reverse;
    }

    .avatar-slot {
      flex-shrink: 0;
    }

    .bubble-col {
      display: flex;
      flex-direction: column;
      max-width: 75%;
      gap: 2px;
    }

    :host([align="right"]) .bubble-col {
      align-items: flex-end;
    }

    .name {
      font-size: 0.75rem;
      color: var(--ink-light, #aaa5a0);
      padding: 0 var(--spacing-sm, 8px);
      font-family: var(--font-handwrite, cursive);
    }

    .bubble {
      position: relative;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      border-radius: var(--radius-lg, 12px);
      background: var(--paper-cream, #f7f3e8);
      border: 1px solid var(--paper-border, #d9d0be);
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
      font-size: 0.9rem;
      color: var(--ink-black, #1a1612);
      line-height: 1.5;
      word-break: break-word;
    }

    /* Tail — left */
    :host(:not([align="right"])) .bubble {
      border-bottom-left-radius: var(--radius-sm, 4px);
    }

    /* Tail — right */
    :host([align="right"]) .bubble {
      background: color-mix(in srgb, var(--accent-blue, #4a7c9b) 12%, var(--paper-white, #fdfbf7));
      border-color: color-mix(in srgb, var(--accent-blue, #4a7c9b) 30%, var(--paper-border, #d9d0be));
      border-bottom-right-radius: var(--radius-sm, 4px);
    }

    :host([variant="paper"]) .bubble {
      font-family: var(--font-handwrite, cursive);
      font-size: 1rem;
      background: var(--paper-white, #fdfbf7);
      border-style: solid;
      border-width: 1px;
    }

    .timestamp {
      font-size: 0.7rem;
      color: var(--ink-light, #aaa5a0);
      padding: 0 var(--spacing-sm, 8px);
      align-self: flex-end;
    }

    :host([align="right"]) .timestamp {
      align-self: flex-start;
    }
  `;

  constructor() {
    super();
    this.align = 'left';
    this.timestamp = '';
    this.name = '';
    this.variant = 'default';
  }

  render() {
    return html`
      <div class="row" part="row">
        <div class="avatar-slot"><slot name="avatar"></slot></div>
        <div class="bubble-col">
          ${this.name ? html`<span class="name">${this.name}</span>` : ''}
          <div class="bubble" part="bubble">
            <slot></slot>
          </div>
          ${this.timestamp ? html`<span class="timestamp">${this.timestamp}</span>` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('p-chat-bubble', PChatBubble);
