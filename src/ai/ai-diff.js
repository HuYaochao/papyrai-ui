// AI Diff - AI 红笔批改风格
// 属性: before(String), after(String)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIDiff extends PapyraiElement {
  static properties = {
    before: { type: String },
    after: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
      line-height: 1.8;
    }

    .header {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
      margin-bottom: var(--spacing-sm, 8px);
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      color: var(--ai-error, #ef4444);
    }

    .header-icon {
      font-size: 1rem;
    }

    .diff-line {
      padding: 2px 8px;
      border-radius: 2px;
      position: relative;
    }

    .diff-line.removed {
      background: #fee2e2;
      color: #991b1b;
      text-decoration: line-through;
    }

    .diff-line.removed::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 8px;
      right: 8px;
      height: 2px;
      background: #ef4444;
      opacity: 0.3;
    }

    .diff-line.added {
      background: #dcfce7;
      color: #166534;
    }

    .diff-line.added::before {
      content: '✎';
      position: absolute;
      left: -20px;
      color: #22c55e;
      font-family: var(--font-handwrite, cursive);
    }

    :host([dark]) .diff-line.removed {
      background: #7f1d1d;
      color: #fca5a5;
    }

    :host([dark]) .diff-line.added {
      background: #14532d;
      color: #86efac;
    }
  `;

  constructor() {
    super();
    this.before = '';
    this.after = '';
  }

  _computeDiff() {
    const beforeLines = this.before.split('\n');
    const afterLines = this.after.split('\n');
    const result = [];

    const maxLen = Math.max(beforeLines.length, afterLines.length);
    for (let i = 0; i < maxLen; i++) {
      const beforeLine = beforeLines[i] || '';
      const afterLine = afterLines[i] || '';

      if (beforeLine === afterLine) {
        result.push({ type: 'unchanged', text: beforeLine });
      } else if (!beforeLine) {
        result.push({ type: 'added', text: afterLine });
      } else if (!afterLine) {
        result.push({ type: 'removed', text: beforeLine });
      } else {
        result.push({ type: 'removed', text: beforeLine });
        result.push({ type: 'added', text: afterLine });
      }
    }
    return result;
  }

  render() {
    const diff = this._computeDiff();
    return html`
      <div class="header">
        <span class="header-icon">✎</span>
        <span>AI 红笔批改</span>
      </div>
      <div class="diff-container">
        ${diff.map(line => html`
          <div class="diff-line ${line.type}">${line.text || ' '}</div>
        `)}
      </div>
    `;
  }
}

customElements.define('ai-diff', AIDiff);
