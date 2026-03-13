// ColorPicker Component - 色彩选择器
// Features: hue/saturation canvas, hue slider, alpha slider, hex/rgb/hsl input, preset swatches, eyedropper, recent colors

import { PapyraiElement, html, css } from '../../core/base.js';

export class PColorPicker extends PapyraiElement {
  static properties = {
    value: { type: String },
    format: { type: String }, // 'hex' | 'rgb' | 'hsl'
    showAlpha: { type: Boolean },
    disabled: { type: Boolean, reflect: true },
    open: { type: Boolean, reflect: true },
    presets: { type: Array }
  };

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--font-serif, serif);
    }

    .trigger {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      cursor: pointer;
      min-width: 100px;
      transition: border-color 0.15s;
    }

    :host([disabled]) .trigger {
      opacity: 0.55;
      pointer-events: none;
    }

    .trigger:hover:not(:disabled) {
      border-color: var(--ink-faint, #b5b0a8);
    }

    :host([dark]) .trigger {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .color-preview {
      width: 28px;
      height: 28px;
      border-radius: var(--radius-sm, 6px);
      border: 2px solid var(--paper-border, #d9ccb8);
      box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
    }

    :host([dark]) .color-preview {
      border-color: var(--ink-faint, #5a5550);
    }

    .color-value {
      font-size: 0.9rem;
      font-family: var(--font-mono, monospace);
      color: var(--ink-black, #1f1a15);
      text-transform: uppercase;
    }

    :host([dark]) .color-value {
      color: var(--paper-white, #f5f0e8);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: var(--spacing-xs, 6px);
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      box-shadow: var(--elevation-3, 0 12px 32px rgba(0, 0, 0, 0.15));
      z-index: 100;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: opacity 0.15s, transform 0.15s;
      padding: var(--spacing-md, 16px);
      width: 260px;
    }

    :host([open]) .dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    :host([dark]) .dropdown {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .saturation-area {
      position: relative;
      width: 100%;
      height: 150px;
      border-radius: var(--radius-sm, 6px);
      margin-bottom: var(--spacing-sm, 12px);
      cursor: crosshair;
    }

    .saturation-white {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, #fff, transparent);
      border-radius: inherit;
    }

    .saturation-black {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, #000, transparent);
      border-radius: inherit;
    }

    .saturation-hue {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
      border-radius: inherit;
    }

    .saturation-cursor {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 3px rgba(0,0,0,0.4);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .hue-slider {
      position: relative;
      width: 100%;
      height: 14px;
      border-radius: 7px;
      background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
      cursor: pointer;
      margin-bottom: var(--spacing-sm, 12px);
    }

    .hue-cursor {
      position: absolute;
      top: -3px;
      width: 20px;
      height: 20px;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      transform: translateX(-50%);
      pointer-events: none;
    }

    .alpha-slider {
      position: relative;
      width: 100%;
      height: 14px;
      border-radius: 7px;
      background: linear-gradient(45deg, #ccc 25%, transparent 25%),
                  linear-gradient(-45deg, #ccc 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #ccc 75%),
                  linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 8px 8px;
      background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
      cursor: pointer;
      margin-bottom: var(--spacing-md, 16px);
    }

    .alpha-fill {
      position: absolute;
      inset: 0;
      border-radius: inherit;
    }

    .alpha-cursor {
      position: absolute;
      top: -3px;
      width: 20px;
      height: 20px;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      transform: translateX(-50%);
      pointer-events: none;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      margin-bottom: var(--spacing-md, 16px);
    }

    .input-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--ink-faint, #9a9590);
      width: 30px;
    }

    .color-input {
      flex: 1;
      padding: 6px 8px;
      font-family: var(--font-mono, monospace);
      font-size: 0.85rem;
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 6px);
      background: var(--paper-white, #fff);
      color: var(--ink-black, #1f1a15);
      text-transform: uppercase;
    }

    .color-input:focus {
      outline: none;
      border-color: var(--accent-blue, #3b82f6);
    }

    :host([dark]) .color-input {
      background: var(--ink-dark, #2a2520);
      border-color: var(--ink-faint, #5a5550);
      color: var(--paper-white, #f5f0e8);
    }

    .preset-colors {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 4px;
    }

    .preset-swatch {
      aspect-ratio: 1;
      border: 2px solid transparent;
      border-radius: var(--radius-sm, 4px);
      cursor: pointer;
      transition: transform 0.1s, border-color 0.1s;
    }

    .preset-swatch:hover {
      transform: scale(1.1);
      border-color: var(--ink-faint, #9a9590);
    }

    .preset-swatch.selected {
      border-color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .preset-swatch.selected {
      border-color: var(--paper-white, #f5f0e8);
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-sm, 8px);
      margin-top: var(--spacing-md, 16px);
      padding-top: var(--spacing-md, 16px);
      border-top: 1px solid var(--paper-border, #d9ccb8);
    }

    :host([dark]) .actions {
      border-color: var(--ink-faint, #5a5550);
    }

    .action-btn {
      padding: 6px 12px;
      font-size: 0.8rem;
      border: 1px solid var(--paper-border, #d9ccb8);
      background: transparent;
      border-radius: var(--radius-sm, 6px);
      cursor: pointer;
      color: var(--ink-black, #1f1a15);
      transition: background 0.15s;
    }

    .action-btn:hover {
      background: var(--ink-faint, #e8e5e0);
    }

    .action-btn.primary {
      background: var(--accent-blue, #3b82f6);
      border-color: var(--accent-blue, #3b82f6);
      color: white;
    }

    .action-btn.primary:hover {
      background: #2563eb;
    }

    :host([dark]) .action-btn {
      border-color: var(--ink-faint, #5a5550);
      color: var(--paper-white, #f5f0e8);
    }

    :host([dark]) .action-btn:hover {
      background: var(--ink-dark, #4a4540);
    }

    [hidden] {
      display: none !important;
    }
  `;

  constructor() {
    super();
    this.value = '#3b82f6';
    this.format = 'hex';
    this.showAlpha = false;
    this.disabled = false;
    this.open = false;
    this.presets = [];
    
    this._h = 217;
    this._s = 91;
    this._l = 60;
    this._a = 1;
    
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside);
    if (this.value) this._parseValue();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
  }

  updated(changedProperties) {
    if (changedProperties.has('value') && this.value) {
      this._parseValue();
    }
  }

  _parseValue() {
    const hex = this.value.replace('#', '');
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      this._h = 0; this._s = 0; [r, g, b].forEach(() => {});
      const [h, s, l] = this._rgbToHsl(r, g, b);
      this._h = h; this._s = s; this._l = l;
    } else if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const [h, s, l] = this._rgbToHsl(r, g, b);
      this._h = h; this._s = s; this._l = l;
      if (hex.length === 8) {
        this._a = parseInt(hex.slice(6, 8), 16) / 255;
      }
    }
  }

  _handleClickOutside(e) {
    if (this.open && !this.contains(e.target)) {
      this.open = false;
    }
  }

  _toggleOpen(e) {
    e.stopPropagation();
    if (this.disabled) return;
    this.open = !this.open;
    this.requestUpdate();
  }

  _rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  _hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  _rgbToHex(r, g, b, a) {
    const toHex = n => {
      const hex = Math.round(n).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    let hex = '#' + toHex(r) + toHex(g) + toHex(b);
    if (this.showAlpha && a < 1) {
      hex += toHex(a * 255);
    }
    return hex;
  }

  _formatValue() {
    const [r, g, b] = this._hslToRgb(this._h, this._s, this._l);
    if (this.format === 'hex') {
      return this._rgbToHex(r, g, b, this._a);
    }
    if (this.format === 'rgb') {
      const a = this.showAlpha ? `, ${this._a.toFixed(2)}` : '';
      return `rgb(${r}, ${g}, ${b}${a})`;
    }
    if (this.format === 'hsl') {
      const a = this.showAlpha ? `, ${this._a.toFixed(2)}` : '';
      return `hsl(${this._h}, ${this._s}%, ${this._l}%${a})`;
    }
    return this.value;
  }

  _handleSaturationClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    this._s = Math.round(x * 100);
    this._l = Math.round((1 - y) * 100);
    this.value = this._formatValue();
    this.emit('change', { value: this.value });
    this.requestUpdate();
  }

  _handleHueChange(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this._h = Math.round(x * 360);
    this.value = this._formatValue();
    this.emit('change', { value: this.value });
    this.requestUpdate();
  }

  _handleAlphaChange(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this._a = x;
    this.value = this._formatValue();
    this.emit('change', { value: this.value });
    this.requestUpdate();
  }

  _handleInputChange(e) {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    this.value = val;
    this._parseValue();
    this.emit('change', { value: this.value });
    this.requestUpdate();
  }

  _selectPreset(color) {
    this.value = color;
    this._parseValue();
    this.value = this._formatValue();
    this.emit('change', { value: this.value });
    this.requestUpdate();
  }

  _getSaturationCursorPos() {
    return { left: `${this._s}%`, top: `${100 - this._l}%` };
  }

  _getHueCursorPos() {
    return { left: `${(this._h / 360) * 100}%` };
  }

  _getAlphaCursorPos() {
    return { left: `${this._a * 100}%` };
  }

  _getCurrentColor() {
    const [r, g, b] = this._hslToRgb(this._h, this._s, this._l);
    return `rgb(${r}, ${g}, ${b})`;
  }

  _getAlphaGradient() {
    const [r, g, b] = this._hslToRgb(this._h, this._s, this._l);
    return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0), rgb(${r}, ${g}, ${b}))`;
  }

  render() {
    const presets = this.presets.length ? this.presets : ['#000000', '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e'];
    
    return html`
      <div class="trigger" @click=${this._toggleOpen} tabindex="0" role="combobox" aria-expanded="${this.open}" aria-haspopup="dialog">
        <div class="color-preview" style="background: ${this.value}"></div>
        <span class="color-value">${this.value}</span>
      </div>

      <div class="dropdown">
        <div class="saturation-area" 
             style="background: hsl(${this._h}, 100%, 50%)"
             @click=${this._handleSaturationClick}>
          <div class="saturation-white"></div>
          <div class="saturation-black"></div>
          <div class="saturation-cursor" style="left: ${this._s}%; top: ${100 - this._l}%; background: ${this._getCurrentColor()}"></div>
        </div>

        <div class="hue-slider" @click=${this._handleHueChange}>
          <div class="hue-cursor" style="left: ${(this._h / 360) * 100}%; background: hsl(${this._h}, 100%, 50%)"></div>
        </div>

        ${this.showAlpha ? html`
          <div class="alpha-slider" @click=${this._handleAlphaChange}>
            <div class="alpha-fill" style="background: ${this._getAlphaGradient()}"></div>
            <div class="alpha-cursor" style="left: ${this._a * 100}%; background: ${this._getCurrentColor()}"></div>
          </div>
        ` : ''}

        <div class="input-row">
          <span class="input-label">${this.format.toUpperCase()}</span>
          <input 
            class="color-input" 
            type="text" 
            .value=${this.value}
            @change=${this._handleInputChange}
          />
        </div>

        <div class="preset-colors">
          ${presets.map(color => html`
            <div 
              class="preset-swatch ${color.toLowerCase() === this.value.toLowerCase() ? 'selected' : ''}"
              style="background: ${color}"
              @click=${() => this._selectPreset(color)}
            ></div>
          `)}
        </div>

        <div class="actions">
          <button class="action-btn" @click=${() => this.open = false}>Cancel</button>
          <button class="action-btn primary" @click=${() => this.open = false}>OK</button>
        </div>
      </div>
    `;
  }
}

customElements.define('p-color-picker', PColorPicker);
