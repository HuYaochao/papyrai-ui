// Watermark - 水印
// Features: 重复对角线文字, 可配置透明度/旋转/间距, canvas渲染性能

import { PapyraiElement, html, css } from '../../core/base.js';

export class PWatermark extends PapyraiElement {
  static properties = {
    text: { type: String },
    rotate: { type: Number },
    opacity: { type: Number },
    gap: { type: Number },
    fontSize: { type: Number },
    color: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }

    .watermark-canvas {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
    }
  `;

  constructor() {
    super();
    this.text = 'PAPYRAI';
    this.rotate = -30;
    this.opacity = 0.08;
    this.gap = 100;
    this.fontSize = 24;
    this.color = '#000000';
    this._resizeObserver = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._renderWatermark();
    this._resizeObserver = new ResizeObserver(() => {
      this._renderWatermark();
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  updated(changedProperties) {
    if (['text', 'rotate', 'opacity', 'gap', 'fontSize', 'color'].some(p => changedProperties.has(p))) {
      this._renderWatermark();
    }
  }

  _renderWatermark() {
    const canvas = this.shadowRoot?.querySelector('.watermark-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = this.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.font = `${this.fontSize}px var(--font-handwrite, cursive)`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const diagonal = Math.sqrt(rect.width ** 2 + rect.height ** 2);
    const cols = Math.ceil(diagonal / this.gap) + 2;
    const rows = Math.ceil(diagonal / this.gap) + 2;

    ctx.save();
    ctx.translate(rect.width / 2, rect.height / 2);
    ctx.rotate(this.rotate * Math.PI / 180);

    for (let row = -rows; row <= rows; row++) {
      for (let col = -cols; col <= cols; col++) {
        const x = col * this.gap;
        const y = row * this.gap;
        ctx.fillText(this.text, x, y);
      }
    }

    ctx.restore();
  }

  render() {
    return html`<canvas class="watermark-canvas"></canvas><slot></slot>`;
  }
}

customElements.define('p-watermark', PWatermark);
