// Scroll Top - 滚动到顶部按钮
// Features: 阈值显示, 平滑滚动, 可自定义图标

import { PapyraiElement, html, css } from '../../core/base.js';

export class PScrollTop extends PapyraiElement {
  static properties = {
    threshold: { type: Number },
    visibility: { type: Number },
    icon: { type: String },
    position: { type: String }
  };

  static styles = css`
    :host {
      display: contents;
    }

    .scroll-top {
      position: fixed;
      bottom: var(--spacing-lg, 24px);
      right: var(--spacing-lg, 24px);
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: 50%;
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0, 0, 0, 0.12));
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.2s ease;
      z-index: 100;
    }

    :host([position="left"]) .scroll-top {
      right: auto;
      left: var(--spacing-lg, 24px);
    }

    :host([dark]) .scroll-top {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .scroll-top[visible] {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .scroll-top:hover {
      box-shadow: var(--elevation-3, 0 12px 24px rgba(0, 0, 0, 0.18));
      transform: translateY(-2px);
    }

    .scroll-top:focus {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: 2px;
    }

    .scroll-top svg {
      width: 24px;
      height: 24px;
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .scroll-top svg {
      color: var(--paper-white, #f5f0e8);
    }
  `;

  constructor() {
    super();
    this.threshold = 300;
    this.visibility = 0.3;
    this.icon = 'arrow';
    this.position = 'right';
    this._visible = false;
    this._handleScroll = this._handleScroll.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this._handleScroll, { passive: true });
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this._handleScroll);
    super.disconnectedCallback();
  }

  _handleScroll() {
    const scrollTop = window.scrollY;
    const shouldShow = scrollTop > this.threshold;

    if (shouldShow !== this._visible) {
      this._visible = shouldShow;
      this.requestUpdate();
    }
  }

  _scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.emit('scroll-top');
  }

  render() {
    const icons = {
      arrow: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`,
      chevron: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
      rocket: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>`
    };

    return html`
      <button 
        class="scroll-top" 
        ?visible=${this._visible}
        @click=${this._scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        ${icons[this.icon] || icons.arrow}
      </button>
    `;
  }
}

customElements.define('p-scroll-top', PScrollTop);
