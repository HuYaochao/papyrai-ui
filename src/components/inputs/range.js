// Range - 纸张风格滑块
// 属性: value(Number), min(Number), max(Number), step(Number), disabled(Boolean),
//       size(String: 'sm'|'md'|'lg'), showValue(Boolean), label(String)
// 事件: change({value})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PRange extends PapyraiElement {
  static properties = {
    value: { type: Number },
    min: { type: Number },
    max: { type: Number },
    step: { type: Number },
    disabled: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    showValue: { type: Boolean },
    label: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .range-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs, 4px);
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      font-family: var(--font-serif, serif);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
      font-weight: 500;
    }

    .value {
      font-family: var(--font-mono, monospace);
      font-size: 0.85rem;
      color: var(--ink-faint, #999);
    }

    :host([disabled]) .label {
      color: var(--ink-faint, #999);
    }

    .slider-container {
      position: relative;
      height: 8px;
      margin: var(--spacing-sm, 8px) 0;
    }

    .slider-track {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 6px;
      background: var(--paper-border, #d9ccb8);
      border-radius: 3px;
      transform: translateY(-50%);
    }

    .slider-fill {
      position: absolute;
      top: 50%;
      left: 0;
      height: 6px;
      background: var(--accent-red, #c4453c);
      border-radius: 3px;
      transform: translateY(-50%);
      transition: width 0.1s ease;
    }

    .slider-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      margin: 0;
    }

    .slider-thumb {
      position: absolute;
      top: 50%;
      width: 18px;
      height: 18px;
      background: var(--paper-white, #fffef8);
      border: 2px solid var(--accent-red, #c4453c);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      pointer-events: none;
      box-shadow: var(--elevation-1, 0 2px 4px rgba(0,0,0,.1));
    }

    .slider-thumb:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: var(--elevation-2, 0 4px 8px rgba(0,0,0,.15));
    }

    /* Sizes */
    :host([size="sm"]) .slider-container {
      height: 6px;
    }

    :host([size="sm"]) .slider-thumb {
      width: 14px;
      height: 14px;
    }

    :host([size="lg"]) .slider-container {
      height: 10px;
    }

    :host([size="lg"]) .slider-thumb {
      width: 22px;
      height: 22px;
    }

    /* Disabled */
    :host([disabled]) .slider-input {
      cursor: not-allowed;
    }

    :host([disabled]) .slider-thumb {
      opacity: 0.5;
      border-color: var(--ink-faint, #999);
    }
  `;

  constructor() {
    super();
    this.value = 50;
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.disabled = false;
    this.size = 'md';
    this.showValue = false;
    this.label = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'slider');
    this.setAttribute('aria-valuemin', this.min);
    this.setAttribute('aria-valuemax', this.max);
    this.setAttribute('aria-valuenow', this.value);
    this.addEventListener('input', this._handleInput);
    this.addEventListener('change', this._handleChange);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('input', this._handleInput);
    this.removeEventListener('change', this._handleChange);
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.setAttribute('aria-valuenow', this.value);
    }
  }

  _getPercent() {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  _handleInput = (e) => {
    this.value = parseFloat(e.target.value);
    this._updateThumbPosition();
  };

  _handleChange = () => {
    this.emit('change', { value: this.value });
  };

  _handleKeydown = (e) => {
    if (this.disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.value = Math.min(this.value + this.step, this.max);
      this._updateThumbPosition();
      this.emit('change', { value: this.value });
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.value = Math.max(this.value - this.step, this.min);
      this._updateThumbPosition();
      this.emit('change', { value: this.value });
    }
  };

  _updateThumbPosition() {
    const thumb = this.shadowRoot.querySelector('.slider-thumb');
    if (thumb) {
      thumb.style.left = `${this._getPercent()}%`;
    }
    const fill = this.shadowRoot.querySelector('.slider-fill');
    if (fill) {
      fill.style.width = `${this._getPercent()}%`;
    }
  }

  render() {
    return html`
      <div class="range-wrapper">
        <div class="label-row">
          ${this.label ? html`<span class="label">${this.label}</span>` : ''}
          ${this.showValue ? html`<span class="value">${this.value}</span>` : ''}
        </div>
        <div class="slider-container">
          <div class="slider-track">
            <div class="slider-fill" style="width: ${this._getPercent()}%"></div>
          </div>
          <input
            type="range"
            class="slider-input"
            .value="${this.value}"
            min="${this.min}"
            max="${this.max}"
            step="${this.step}"
            ?disabled="${this.disabled}"
            aria-label="${this.label}"
          />
          <div class="slider-thumb" style="left: ${this._getPercent()}%"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('p-range', PRange);
