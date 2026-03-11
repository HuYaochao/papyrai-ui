// AI Confidence - 置信度可视化
// 属性: value(Number, 0-1), label(String)

import { PapyraiElement, html, css } from '../core/base.js';

export class AIConfidence extends PapyraiElement {
  static properties = {
    value: { type: Number },
    label: { type: String },
    _displayValue: { state: true }
  };

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
    }

    .progress-bar {
      width: 120px;
      height: 8px;
      background: var(--ink-faint, #d9d5d0);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.5s ease-out;
    }

    .progress-fill.high {
      background: var(--ai-confidence-high, #22c55e);
    }

    .progress-fill.mid {
      background: var(--ai-confidence-mid, #eab308);
    }

    .progress-fill.low {
      background: var(--ai-confidence-low, #ef4444);
    }

    .percentage {
      font-family: var(--font-mono, monospace);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--ink-dark, #3a3530);
      min-width: 45px;
    }

    :host([dark]) .percentage {
      color: var(--ink-light, #aaa5a0);
    }

    .label {
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      color: var(--ink-mid, #6a6560);
    }
  `;

  constructor() {
    super();
    this.value = 0;
    this.label = '';
    this._displayValue = 0;
    this._animationFrame = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this._animateValue();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
    }
  }

  _animateValue() {
    const startValue = this._displayValue;
    const endValue = this.value;
    const duration = 500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      this._displayValue = startValue + (endValue - startValue) * easeProgress;

      if (progress < 1) {
        this._animationFrame = requestAnimationFrame(animate);
      }
    };

    this._animationFrame = requestAnimationFrame(animate);
  }

  _getColorClass() {
    if (this.value >= 0.7) return 'high';
    if (this.value >= 0.4) return 'mid';
    return 'low';
  }

  render() {
    const percent = Math.round(this._displayValue * 100);
    return html`
      <div class="progress-bar">
        <div class="progress-fill ${this._getColorClass()}" style="width: ${percent}%"></div>
      </div>
      <span class="percentage">${percent}%</span>
      ${this.label ? html`<span class="label">${this.label}</span>` : ''}
    `;
  }
}

customElements.define('ai-confidence', AIConfidence);
