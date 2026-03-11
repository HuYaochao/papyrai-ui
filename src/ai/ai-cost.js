// AI Cost - Token 消耗显示
// 属性: tokens(Number), rate(Number, 0.003), animate(Boolean)

import { PapyraiElement, html, css } from '../core/base.js';

export class AICost extends PapyraiElement {
  static properties = {
    tokens: { type: Number },
    rate: { type: Number },
    animate: { type: Boolean },
    _displayTokens: { state: true }
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    .container {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      background: var(--paper-cream, #f7f3e8);
      border: 1px solid var(--ink-faint, #d9d5d0);
      border-radius: var(--radius-md, 8px);
      font-family: var(--font-mono, monospace);
      font-size: 0.8rem;
    }

    :host([dark]) .container {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-dark, #3a3530);
    }

    .icon {
      font-size: 0.9rem;
    }

    .tokens {
      color: var(--ink-dark, #3a3530);
      font-weight: 500;
    }

    :host([dark]) .tokens {
      color: var(--ink-light, #aaa5a0);
    }

    .separator {
      color: var(--ink-faint, #d9d5d0);
    }

    .cost {
      color: var(--ai-thinking, #8b5cf6);
    }
  `;

  constructor() {
    super();
    this.tokens = 0;
    this.rate = 0.003;
    this.animate = false;
    this._displayTokens = 0;
    this._animationFrame = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('tokens') && this.animate) {
      this._animateTokens();
    } else if (changedProperties.has('tokens')) {
      this._displayTokens = this.tokens;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
    }
  }

  _animateTokens() {
    const startValue = this._displayTokens;
    const endValue = this.tokens;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      this._displayTokens = Math.round(startValue + (endValue - startValue) * easeProgress);

      if (progress < 1) {
        this._animationFrame = requestAnimationFrame(animate);
      }
    };

    this._animationFrame = requestAnimationFrame(animate);
  }

  _computeCost() {
    return (this._displayTokens * this.rate).toFixed(3);
  }

  render() {
    return html`
      <div class="container">
        <span class="icon">💰</span>
        <span class="tokens">${this._displayTokens.toLocaleString()} tokens</span>
        <span class="separator">·</span>
        <span class="cost">$${this._computeCost()}</span>
      </div>
    `;
  }
}

customElements.define('ai-cost', AICost);
