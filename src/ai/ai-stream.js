// AI Stream - 钢笔书写效果，逐字显示
// 属性: text(String), speed(Number, 60ms), cursor(Boolean, true)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIStream extends PapyraiElement {
  static properties = {
    text: { type: String },
    speed: { type: Number },
    cursor: { type: Boolean, attribute: 'show-cursor' },
    _displayedText: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
      line-height: 1.8;
    }

    .container {
      position: relative;
    }

    .streaming-label {
      position: absolute;
      top: -20px;
      left: 0;
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      color: var(--ai-stream, #10b981);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.7;
    }

    .content {
      color: var(--ink-black, #1a1612);
      white-space: pre-wrap;
      word-break: break-word;
    }

    :host([dark]) .content {
      color: var(--ink-light, #aaa5a0);
    }

    .cursor {
      display: inline-block;
      width: 2px;
      height: 1.1em;
      background: var(--ai-stream, #10b981);
      margin-left: 2px;
      vertical-align: text-bottom;
      animation: blink 1s step-end infinite;
    }

    .cursor.steady {
      animation: none;
      opacity: 1;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;

  constructor() {
    super();
    this.text = '';
    this.speed = 60;
    this.cursor = true;
    this._displayedText = '';
    this._timeoutId = null;
    this._isComplete = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('text') && this.text !== changedProperties.get('text')) {
      this._startStreaming();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  _startStreaming() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
    this._displayedText = '';
    this._isComplete = false;

    let i = 0;
    const stream = () => {
      if (i < this.text.length) {
        this._displayedText = this.text.slice(0, i + 1);
        i++;
        const delay = this.speed + (Math.random() * 20 - 10);
        this._timeoutId = setTimeout(stream, delay);
      } else {
        this._isComplete = true;
      }
    };
    stream();
  }

  render() {
    return html`
      <div class="container">
        ${!this._isComplete ? html`<span class="streaming-label">streaming</span>` : ''}
        <span class="content">${this._displayedText}</span>
        ${this.cursor ? html`
          <span class="cursor ${this._isComplete ? 'steady' : ''}"></span>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('ai-stream', AIStream);
