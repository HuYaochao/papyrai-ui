// Knob - Rotary dial input
// Props: value(Number), min(Number), max(Number), step(Number), size(String), disabled(Boolean), readonly(Boolean)
// Events: change, input

import { PapyraiElement, html, css, svg } from '../../core/base.js';

export class PKnob extends PapyraiElement {
  static properties = {
    value: { type: Number },
    min: { type: Number },
    max: { type: Number },
    step: { type: Number },
    size: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true },
    label: { type: String },
    showValue: { type: Boolean }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    :host([size="sm"]) {
      --knob-size: 60px;
    }

    :host([size="md"]) {
      --knob-size: 80px;
    }

    :host([size="lg"]) {
      --knob-size: 100px;
    }

    .knob-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      user-select: none;
    }

    .label {
      font-family: var(--font-serif, serif);
      font-size: 0.85rem;
      color: var(--ink-black, #1f1a15);
      font-weight: 500;
    }

    :host-context([data-theme="dark"]) .label {
      color: var(--ink-white, #f5f0e8);
    }

    .knob-wrapper {
      position: relative;
      width: var(--knob-size, 80px);
      height: var(--knob-size, 80px);
      cursor: pointer;
    }

    :host([disabled]) .knob-wrapper {
      opacity: 0.55;
      cursor: not-allowed;
    }

    :host([readonly]) .knob-wrapper {
      cursor: default;
    }

    .knob-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-135deg);
    }

    .track {
      fill: none;
      stroke: var(--paper-border, #d9ccb8);
      stroke-width: 6;
      stroke-linecap: round;
    }

    :host-context([data-theme="dark"]) .track {
      stroke: var(--paper-border-dark, #3d3832);
    }

    .progress {
      fill: none;
      stroke: var(--accent-red, #c4453c);
      stroke-width: 6;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.1s ease;
    }

    .knob-body {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 60%;
      background: var(--paper-white, #fffef8);
      border: 2px solid var(--paper-border, #d9ccb8);
      border-radius: 50%;
      box-shadow: var(--elevation-2, 0 4px 12px rgba(0,0,0,.15));
    }

    .knob-body::before {
      content: '';
      position: absolute;
      top: 8%;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 20%;
      background: var(--accent-red, #c4453c);
      border-radius: 2px;
    }

    :host-context([data-theme="dark"]) .knob-body {
      background: var(--paper-dark, #1a1815);
      border-color: var(--paper-border-dark, #3d3832);
    }

    .value-display {
      font-family: var(--font-mono, monospace);
      font-size: 1rem;
      font-weight: 600;
      color: var(--ink-black, #1f1a15);
    }

    :host-context([data-theme="dark"]) .value-display {
      color: var(--ink-white, #f5f0e8);
    }
  `;

  constructor() {
    super();
    this.value = 50;
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.size = 'md';
    this.disabled = false;
    this.readonly = false;
    this.label = '';
    this.showValue = true;
    this._isDragging = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mousedown', this._handleMouseDown);
    this.addEventListener('touchstart', this._handleTouchStart, { passive: true });
    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseup', this._handleMouseUp);
    document.addEventListener('touchmove', this._handleTouchMove, { passive: false });
    document.addEventListener('touchend', this._handleTouchEnd);
    this.addEventListener('wheel', this._handleWheel, { passive: false });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mousedown', this._handleMouseDown);
    this.removeEventListener('touchstart', this._handleTouchStart);
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
    document.removeEventListener('touchmove', this._handleTouchMove);
    document.removeEventListener('touchend', this._handleTouchEnd);
    this.removeEventListener('wheel', this._handleWheel);
  }

  _getAngle(clientX, clientY) {
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    return angle;
  }

  _valueFromAngle(angle) {
    const startAngle = 135;
    const endAngle = 405;
    const range = endAngle - startAngle;
    const clampedAngle = Math.max(startAngle, Math.min(endAngle, angle));
    const ratio = (clampedAngle - startAngle) / range;
    let value = this.min + ratio * (this.max - this.min);
    value = Math.round(value / this.step) * this.step;
    return Math.max(this.min, Math.min(this.max, value));
  }

  _handleMouseDown = (e) => {
    if (this.disabled || this.readonly) return;
    this._isDragging = true;
    this._startY = e.clientY;
  };

  _handleMouseMove = (e) => {
    if (!this._isDragging) return;
    const angle = this._getAngle(e.clientX, e.clientY);
    this._updateValue(angle);
  };

  _handleMouseUp = () => {
    if (this._isDragging) {
      this._isDragging = false;
      this.emit('change', { value: this.value });
    }
  };

  _handleTouchStart = (e) => {
    if (this.disabled || this.readonly) return;
    this._isDragging = true;
    const touch = e.touches[0];
    this._startY = touch.clientY;
  };

  _handleTouchMove = (e) => {
    if (!this._isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const angle = this._getAngle(touch.clientX, touch.clientY);
    this._updateValue(angle);
  };

  _handleTouchEnd = () => {
    if (this._isDragging) {
      this._isDragging = false;
      this.emit('change', { value: this.value });
    }
  };

  _handleWheel = (e) => {
    if (this.disabled || this.readonly) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -this.step : this.step;
    let newValue = this.value + delta;
    newValue = Math.round(newValue / this.step) * this.step;
    newValue = Math.max(this.min, Math.min(this.max, newValue));
    if (newValue !== this.value) {
      this.value = newValue;
      this.emit('input', { value: this.value });
      this.emit('change', { value: this.value });
    }
  };

  _updateValue(angle) {
    const newValue = this._valueFromAngle(angle);
    if (newValue !== this.value) {
      this.value = newValue;
      this.emit('input', { value: this.value });
    }
  }

  _getArcDashoffset() {
    const startAngle = 135;
    const endAngle = 405;
    const range = endAngle - startAngle;
    const ratio = (this.value - this.min) / (this.max - this.min);
    const arcLength = (range / 360) * 2 * Math.PI * 28;
    return arcLength * (1 - ratio);
  }

  render() {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const startAngle = 135;
    const endAngle = 405;
    const range = endAngle - startAngle;
    const ratio = (this.value - this.min) / (this.max - this.min);
    const arcLength = (range / 360) * circumference;
    const dashoffset = circumference * (1 - ratio);

    return html`
      <div class="knob-container">
        ${this.label ? html`<span class="label">${this.label}</span>` : ''}
        <div 
          class="knob-wrapper"
          role="slider"
          aria-label="${this.label || 'Knob'}"
          aria-valuemin="${this.min}"
          aria-valuemax="${this.max}"
          aria-valuenow="${this.value}"
          ?aria-disabled="${this.disabled}"
          tabindex="${this.disabled ? -1 : 0}"
        >
          <svg class="knob-svg" viewBox="0 0 64 64">
            <circle 
              class="track"
              cx="32" 
              cy="32" 
              r="${radius}"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="0"
            />
            <circle 
              class="progress"
              cx="32" 
              cy="32" 
              r="${radius}"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${dashoffset}"
            />
          </svg>
          <div class="knob-body"></div>
        </div>
        ${this.showValue ? html`<span class="value-display">${this.value}</span>` : ''}
      </div>
    `;
  }
}

customElements.define('p-knob', PKnob);
