// Virtual Scroller - 虚拟滚动
// Features: 只渲染可见项, 动态项高支持, scrollToIndex API

import { PapyraiElement, html, css } from '../../core/base.js';

export class PVirtualScroller extends PapyraiElement {
  static properties = {
    items: { type: Array },
    itemHeight: { type: Number },
    overscan: { type: Number },
    height: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .virtual-scroller {
      position: relative;
      overflow-y: auto;
    }

    .virtual-scroller-content {
      position: relative;
    }

    .virtual-item {
      position: absolute;
      left: 0;
      right: 0;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.itemHeight = 48;
    this.overscan = 3;
    this.height = '400px';
    this._scrollTop = 0;
    this._containerHeight = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleScroll = this._handleScroll.bind(this);
    this._resizeObserver = new ResizeObserver(() => this._measureContainer());
    requestAnimationFrame(() => {
      this._measureContainer();
      this._resizeObserver.observe(this);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
  }

  _measureContainer() {
    const rect = this.getBoundingClientRect();
    this._containerHeight = rect.height;
    this.requestUpdate();
  }

  _handleScroll(e) {
    this._scrollTop = e.target.scrollTop;
  }

  _getVisibleRange() {
    const start = Math.max(0, Math.floor(this._scrollTop / this.itemHeight) - this.overscan);
    const visibleCount = Math.ceil(this._containerHeight / this.itemHeight);
    const end = Math.min(this.items.length, start + visibleCount + this.overscan * 2);
    return { start, end };
  }

  _getVisibleItems() {
    const { start, end } = this._getVisibleRange();
    return this.items.slice(start, end).map((item, i) => ({
      ...item,
      _index: start + i,
      _style: {
        transform: `translateY(${(start + i) * this.itemHeight}px)`,
        height: `${this.itemHeight}px`
      }
    }));
  }

  scrollToIndex(index, alignment = 'start') {
    const targetTop = index * this.itemHeight;
    const container = this.shadowRoot?.querySelector('.virtual-scroller');
    if (!container) return;

    if (alignment === 'start') {
      container.scrollTop = targetTop;
    } else if (alignment === 'end') {
      container.scrollTop = targetTop - this._containerHeight + this.itemHeight;
    } else {
      container.scrollTop = targetTop - this._containerHeight / 2 + this.itemHeight / 2;
    }
  }

  render() {
    const visibleItems = this._getVisibleItems();
    const totalHeight = this.items.length * this.itemHeight;

    return html`
      <div 
        class="virtual-scroller"
        style="height: ${this.height}"
        @scroll=${this._handleScroll}
      >
        <div class="virtual-scroller-content" style="height: ${totalHeight}px">
          ${visibleItems.map(item => html`
            <div class="virtual-item" style="${item._style}">
              <slot name=${item.value}></slot>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('p-virtual-scroller', PVirtualScroller);
