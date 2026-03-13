// Skeleton — loading placeholder with pulse/wave animation
// Props: variant('text'|'circle'|'rect'), width, height, animation('pulse'|'wave'|'none'), lines

import { PapyraiElement, html, css } from '../../core/base.js';

export class PSkeleton extends PapyraiElement {
  static properties = {
    variant:   { type: String, reflect: true },
    width:     { type: String },
    height:    { type: String },
    animation: { type: String, reflect: true },
    lines:     { type: Number }
  };

  static styles = css`
    :host {
      display: block;
    }

    .skeleton {
      background: var(--paper-aged, #ede6d6);
      border-radius: var(--radius-sm, 4px);
      overflow: hidden;
      position: relative;
    }

    :host([variant="circle"]) .skeleton {
      border-radius: 50%;
    }

    :host([animation="pulse"]) .skeleton {
      animation: pulse 1.5s ease-in-out infinite;
    }

    :host([animation="wave"]) .skeleton::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255,255,255,0.4) 50%,
        transparent 100%
      );
      animation: wave 1.5s ease-in-out infinite;
    }

    .lines-wrap {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 8px);
    }

    .line {
      height: 14px;
      border-radius: var(--radius-sm, 4px);
      background: var(--paper-aged, #ede6d6);
      position: relative;
      overflow: hidden;
    }

    .line:last-child:not(:first-child) {
      width: 70%;
    }

    :host([animation="pulse"]) .line {
      animation: pulse 1.5s ease-in-out infinite;
    }

    :host([animation="wave"]) .line::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255,255,255,0.4) 50%,
        transparent 100%
      );
      animation: wave 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.4; }
    }

    @keyframes wave {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;

  constructor() {
    super();
    this.variant = 'rect';
    this.width = '';
    this.height = '';
    this.animation = 'pulse';
    this.lines = 1;
  }

  _skeletonStyle() {
    const styles = [];
    if (this.variant === 'circle') {
      const size = this.width || this.height || '40px';
      styles.push(`width: ${size}`, `height: ${size}`);
    } else {
      if (this.width)  styles.push(`width: ${this.width}`);
      if (this.height) styles.push(`height: ${this.height}`);
      if (!this.height) styles.push('height: 16px');
    }
    return styles.join(';');
  }

  render() {
    if (this.variant === 'text' || this.lines > 1) {
      const count = Math.max(1, this.lines);
      return html`
        <div class="lines-wrap" part="lines">
          ${Array.from({ length: count }, () => html`<div class="line"></div>`)}
        </div>
      `;
    }

    return html`
      <div class="skeleton" style=${this._skeletonStyle()} part="skeleton"></div>
    `;
  }
}

customElements.define('p-skeleton', PSkeleton);
