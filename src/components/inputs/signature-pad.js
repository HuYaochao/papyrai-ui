// Signature Pad - Canvas-based drawing component
// Props: width(Number), height(Number), penColor(String), penWidth(Number), backgroundColor(String), disabled(Boolean)
// Events: change, clear

import { PapyraiElement, html, css } from '../../core/base.js';

export class PSignaturePad extends PapyraiElement {
  static properties = {
    width: { type: Number },
    height: { type: Number },
    penColor: { type: String },
    penWidth: { type: Number },
    backgroundColor: { type: String },
    disabled: { type: Boolean, reflect: true },
    empty: { type: Boolean }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    .signature-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 8px);
    }

    .canvas-wrapper {
      position: relative;
      border: 2px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      overflow: hidden;
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      background: var(--paper-white, #fffef8);
    }

    .canvas-wrapper::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
      pointer-events: none;
      z-index: 1;
    }

    .canvas-wrapper:hover {
      border-color: var(--accent-red, #c4453c);
    }

    :host-context([data-theme="dark"]) .canvas-wrapper {
      background: var(--paper-dark, #1a1815);
      border-color: var(--paper-border-dark, #3d3832);
    }

    :host([disabled]) .canvas-wrapper {
      opacity: 0.55;
    }

    :host([disabled]) canvas {
      cursor: not-allowed;
    }

    canvas {
      display: block;
      width: 100%;
      cursor: crosshair;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-sm, 8px);
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
      padding: var(--spacing-xs, 6px) var(--spacing-sm, 12px);
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 6px);
      font-family: var(--font-serif, serif);
      font-size: 0.85rem;
      color: var(--ink-black, #1f1a15);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .action-btn:hover {
      background: var(--paper-white, #fffef8);
      border-color: var(--accent-red, #c4453c);
    }

    .action-btn svg {
      width: 16px;
      height: 16px;
      stroke: currentColor;
      stroke-width: 1.5;
    }

    :host-context([data-theme="dark"]) .action-btn {
      background: var(--paper-dark-alt, #252220);
      border-color: var(--paper-border-dark, #3d3832);
      color: var(--ink-white, #f5f0e8);
    }

    :host-context([data-theme="dark"]) .action-btn:hover {
      background: var(--paper-dark, #1a1815);
    }

    .empty-placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--font-handwrite, cursive);
      font-size: 1.2rem;
      color: var(--ink-light, #8b8070);
      opacity: 0.5;
      pointer-events: none;
      user-select: none;
    }

    :host-context([data-theme="dark"]) .empty-placeholder {
      color: var(--ink-dark, #6b6050);
    }
  `;

  constructor() {
    super();
    this.width = 400;
    this.height = 200;
    this.penColor = '#1f1a15';
    this.penWidth = 2;
    this.backgroundColor = '#fffef8';
    this.disabled = false;
    this.empty = true;
    this._isDrawing = false;
    this._lastX = 0;
    this._lastY = 0;
    this._ctx = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this._initCanvas();
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('width') || changedProperties.has('height')) {
      this._initCanvas();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const canvas = this.shadowRoot.querySelector('canvas');
    if (canvas) {
      canvas.removeEventListener('mousedown', this._handleMouseDown);
      canvas.removeEventListener('mousemove', this._handleMouseMove);
      canvas.removeEventListener('mouseup', this._handleMouseUp);
      canvas.removeEventListener('mouseleave', this._handleMouseUp);
      canvas.removeEventListener('touchstart', this._handleTouchStart);
      canvas.removeEventListener('touchmove', this._handleTouchMove);
      canvas.removeEventListener('touchend', this._handleTouchEnd);
    }
  }

  _initCanvas() {
    const canvas = this.shadowRoot.querySelector('canvas');
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || this.width;
    canvas.height = rect.height || this.height;

    this._ctx = canvas.getContext('2d');
    this._ctx.strokeStyle = this.penColor;
    this._ctx.lineWidth = this.penWidth;
    this._ctx.lineCap = 'round';
    this._ctx.lineJoin = 'round';
    this._ctx.fillStyle = this.backgroundColor;
    this._ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('mousedown', this._handleMouseDown);
    canvas.addEventListener('mousemove', this._handleMouseMove);
    canvas.addEventListener('mouseup', this._handleMouseUp);
    canvas.addEventListener('mouseleave', this._handleMouseUp);
    canvas.addEventListener('touchstart', this._handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', this._handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', this._handleTouchEnd);
  }

  _getCoordinates(e) {
    const canvas = this.shadowRoot.querySelector('canvas');
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  _handleMouseDown = (e) => {
    if (this.disabled) return;
    this._isDrawing = true;
    const coords = this._getCoordinates(e);
    this._lastX = coords.x;
    this._lastY = coords.y;
    this.empty = false;
  };

  _handleMouseMove = (e) => {
    if (!this._isDrawing || this.disabled) return;
    const coords = this._getCoordinates(e);
    this._draw(coords.x, coords.y);
    this._lastX = coords.x;
    this._lastY = coords.y;
  };

  _handleMouseUp = () => {
    if (this._isDrawing) {
      this._isDrawing = false;
      this._emitChange();
    }
  };

  _handleTouchStart = (e) => {
    if (this.disabled) return;
    e.preventDefault();
    this._isDrawing = true;
    const coords = this._getCoordinates(e);
    this._lastX = coords.x;
    this._lastY = coords.y;
    this.empty = false;
  };

  _handleTouchMove = (e) => {
    if (!this._isDrawing || this.disabled) return;
    e.preventDefault();
    const coords = this._getCoordinates(e);
    this._draw(coords.x, coords.y);
    this._lastX = coords.x;
    this._lastY = coords.y;
  };

  _handleTouchEnd = () => {
    if (this._isDrawing) {
      this._isDrawing = false;
      this._emitChange();
    }
  };

  _draw(x, y) {
    if (!this._ctx) return;
    this._ctx.beginPath();
    this._ctx.moveTo(this._lastX, this._lastY);
    this._ctx.lineTo(x, y);
    this._ctx.stroke();
  }

  _emitChange() {
    const canvas = this.shadowRoot.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      this.emit('change', { dataUrl, empty: this.empty });
    }
  }

  clear() {
    if (!this._ctx) return;
    const canvas = this.shadowRoot.querySelector('canvas');
    if (canvas) {
      this._ctx.fillStyle = this.backgroundColor;
      this._ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.empty = true;
      this.emit('clear');
      this.emit('change', { dataUrl: '', empty: true });
    }
  }

  getDataURL(format = 'image/png') {
    const canvas = this.shadowRoot.querySelector('canvas');
    return canvas ? canvas.toDataURL(format) : '';
  }

  toSVG() {
    // Simple SVG conversion - would need more sophisticated implementation for production
    const dataUrl = this.getDataURL();
    return dataUrl;
  }

  render() {
    return html`
      <div class="signature-container">
        <div class="canvas-wrapper">
          <canvas 
            style="background-color: ${this.backgroundColor}"
          ></canvas>
          ${this.empty ? html`<span class="empty-placeholder">Sign here</span>` : ''}
        </div>
        <div class="actions">
          <button 
            class="action-btn" 
            @click="${this.clear}"
            ?disabled="${this.disabled}"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Clear
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('p-signature-pad', PSignaturePad);
