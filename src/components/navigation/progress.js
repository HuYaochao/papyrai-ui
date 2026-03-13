// Progress - 纸张风格进度条
// 属性: value(Number), max(Number), indeterminate(Boolean), 
//       variant(String: 'default'|'success'|'warning'|'error'),
//       size(String: 'sm'|'md'|'lg'), label(Boolean), type(String: 'linear'|'circular')
// 事件: complete

import { PapyraiElement, html, css } from '../../core/base.js';

export class PProgress extends PapyraiElement {
  static properties = {
    value: { type: Number },
    max: { type: Number },
    indeterminate: { type: Boolean },
    variant: { type: String },
    size: { type: String, reflect: true },
    label: { type: Boolean },
    type: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    /* Linear */
    .progress-linear {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs, 4px);
    }

    .progress-track {
      width: 100%;
      height: 8px;
      background: var(--paper-border, #d9ccb8);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: 4px;
      background: var(--accent-red, #c4453c);
      transition: width 0.3s ease;
      position: relative;
    }

    .progress-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: shimmer 1.5s ease-in-out infinite;
    }

    .progress-fill.indeterminate {
      width: 30% !important;
      animation: indeterminate 1.5s ease-in-out infinite;
    }

    @keyframes indeterminate {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(400%); }
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    /* Variants */
    :host([variant="success"]) .progress-fill {
      background: var(--status-success, #22c55e);
    }

    :host([variant="warning"]) .progress-fill {
      background: var(--status-warning, #f59e0b);
    }

    :host([variant="error"]) .progress-fill {
      background: var(--status-error, #ef4444);
    }

    /* Sizes */
    :host([size="sm"]) .progress-track {
      height: 4px;
    }

    :host([size="lg"]) .progress-track {
      height: 12px;
    }

    /* Label */
    .progress-label {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono, monospace);
      font-size: 0.8rem;
      color: var(--ink-faint, #999);
    }

    /* Circular */
    .progress-circular {
      display: inline-flex;
      position: relative;
    }

    .progress-circle {
      transform: rotate(-90deg);
    }

    .progress-circle-bg {
      fill: none;
      stroke: var(--paper-border, #d9ccb8);
    }

    .progress-circle-fill {
      fill: none;
      stroke: var(--accent-red, #c4453c);
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }

    :host([variant="success"]) .progress-circle-fill {
      stroke: var(--status-success, #22c55e);
    }

    :host([variant="warning"]) .progress-circle-fill {
      stroke: var(--status-warning, #f59e0b);
    }

    :host([variant="error"]) .progress-circle-fill {
      stroke: var(--status-error, #ef4444);
    }

    :host([indeterminate]) .progress-circle-fill {
      stroke-dasharray: 80, 200;
      stroke-dashoffset: 0;
      animation: circular-indeterminate 1.5s ease-in-out infinite;
    }

    @keyframes circular-indeterminate {
      0% { stroke-dashoffset: 200; }
      50% { stroke-dashoffset: 80; }
      100% { stroke-dashoffset: 200; }
    }

    .progress-circular-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--font-mono, monospace);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
    }
  `;

  constructor() {
    super();
    this.value = 0;
    this.max = 100;
    this.indeterminate = false;
    this.variant = 'default';
    this.size = 'md';
    this.label = false;
    this.type = 'linear';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('value') && !this.indeterminate) {
      if (this.value >= this.max) {
        this.emit('complete');
      }
    }
  }

  _getPercent() {
    return Math.min(Math.max((this.value / this.max) * 100, 0), 100);
  }

  render() {
    if (this.type === 'circular') {
      return this._renderCircular();
    }
    return this._renderLinear();
  }

  _renderLinear() {
    return html`
      <div class="progress-linear">
        ${this.label ? html`
          <div class="progress-label">
            <span>${this.label}</span>
            <span>${Math.round(this._getPercent())}%</span>
          </div>
        ` : ''}
        <div class="progress-track">
          <div 
            class="progress-fill ${this.indeterminate ? 'indeterminate' : ''}"
            style="width: ${this.indeterminate ? '30%' : this._getPercent() + '%'}"
            role="progressbar"
            aria-valuenow="${this.value}"
            aria-valuemin="0"
            aria-valuemax="${this.max}"
          ></div>
        </div>
      </div>
    `;
  }

  _renderCircular() {
    const size = this.size === 'sm' ? 48 : this.size === 'lg' ? 80 : 64;
    const strokeWidth = this.size === 'sm' ? 3 : this.size === 'lg' ? 6 : 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this._getPercent() / 100) * circumference;

    return html`
      <div class="progress-circular" style="width: ${size}px; height: ${size}px;">
        <svg class="progress-circle" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <circle 
            class="progress-circle-bg"
            cx="${size / 2}"
            cy="${size / 2}"
            r="${radius}"
            stroke-width="${strokeWidth}"
          />
          <circle 
            class="progress-circle-fill ${this.indeterminate ? 'indeterminate' : ''}"
            cx="${size / 2}"
            cy="${size / 2}"
            r="${radius}"
            stroke-width="${strokeWidth}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${this.indeterminate ? 0 : offset}"
          />
        </svg>
        ${this.label && !this.indeterminate ? html`
          <span class="progress-circular-label">${Math.round(this._getPercent())}%</span>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('p-progress', PProgress);
