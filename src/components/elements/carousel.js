// Carousel - 纸张风格轮播组件
// 属性: autoplay(Boolean), interval(Number), transition(String: slide/fade),
//       showArrows(Boolean), showDots(Boolean), infinite(Boolean),
//       slidesPerView(Number), gap(Number)
// 事件: change({index}), slide-change({index})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PCarousel extends PapyraiElement {
  static properties = {
    autoplay: { type: Boolean },
    interval: { type: Number },
    transition: { type: String },
    showArrows: { type: Boolean },
    showDots: { type: Boolean },
    infinite: { type: Boolean },
    slidesPerView: { type: Number },
    gap: { type: Number },
    _currentIndex: { state: true },
    _isHovering: { state: true },
    _touchStartX: { state: true },
    _touchDeltaX: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .carousel {
      position: relative;
      border-radius: var(--radius-md, 10px);
      overflow: hidden;
      background: var(--paper-cream, #f8f1e5);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    .carousel-track-container {
      overflow: hidden;
    }

    .carousel-track {
      display: flex;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .carousel-track.fade {
      transition: opacity 0.5s ease;
    }

    .slide {
      flex: 0 0 100%;
      min-width: 100%;
      padding: var(--spacing-md, 16px);
      box-sizing: border-box;
    }

    .slide-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm, 6px);
      background: var(--paper-white, #fffef8);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      overflow: hidden;
    }

    .slide-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      background: var(--paper-white, #fffef8);
      color: var(--ink-black, #1f1a15);
      cursor: pointer;
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.12));
      transition: all 0.2s ease;
      z-index: 2;
    }

    .arrow:hover {
      background: var(--accent-red, #c4453c);
      color: #fff;
      transform: translateY(-50%) scale(1.1);
    }

    .arrow.prev {
      left: var(--spacing-sm, 12px);
    }

    .arrow.next {
      right: var(--spacing-sm, 12px);
    }

    .arrow:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .arrow:disabled:hover {
      background: var(--paper-white, #fffef8);
      color: var(--ink-black, #1f1a15);
      transform: translateY(-50%);
    }

    .dots {
      position: absolute;
      bottom: var(--spacing-sm, 12px);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: var(--spacing-xs, 6px);
      padding: var(--spacing-xs, 6px) var(--spacing-sm, 12px);
      background: rgba(255, 254, 248, 0.9);
      border-radius: var(--radius-lg, 20px);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.1));
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1.5px solid var(--paper-border, #d9ccb8);
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .dot:hover {
      border-color: var(--accent-red, #c4453c);
    }

    .dot.active {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
      transform: scale(1.2);
    }

    .carousel-track-container.touch-enabled {
      cursor: grab;
    }

    .carousel-track-container.touch-enabled:active {
      cursor: grabbing;
    }

    .touch-indicator {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 60px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
      z-index: 1;
    }

    .touch-indicator.visible {
      opacity: 1;
    }

    .touch-indicator.left {
      left: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.15), transparent);
    }

    .touch-indicator.right {
      right: 0;
      background: linear-gradient(to left, rgba(0,0,0,0.15), transparent);
    }

    .touch-indicator svg {
      width: 24px;
      height: 24px;
      color: #fff;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
    }

    [hidden] {
      display: none !important;
    }

    :host([transition="fade"]) .slide {
      flex: 1;
      min-width: 100%;
    }

    :host([transition="fade"]) .carousel-track.fade .slide {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
    }

    :host([transition="fade"]) .carousel-track.fade .slide.active {
      opacity: 1;
      pointer-events: auto;
    }
  `;

  constructor() {
    super();
    this.autoplay = false;
    this.interval = 3000;
    this.transition = 'slide';
    this.showArrows = true;
    this.showDots = true;
    this.infinite = false;
    this.slidesPerView = 1;
    this.gap = 0;
    this._currentIndex = 0;
    this._isHovering = false;
    this._touchStartX = 0;
    this._touchDeltaX = 0;
    this._autoplayTimer = null;
    this._hasSwiped = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupAutoplay();
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this._clearAutoplay();
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('autoplay')) {
      this._setupAutoplay();
    }
  }

  _setupAutoplay() {
    this._clearAutoplay();

    if (this.autoplay && this._totalSlides > 1) {
      this._autoplayTimer = setInterval(() => {
        if (!this._isHovering) {
          this._next();
        }
      }, this.interval);
    }
  }

  _clearAutoplay() {
    if (this._autoplayTimer) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = null;
    }
  }

  get _slides() {
    return Array.from(this.querySelectorAll('slot')).reduce((acc, slot) => {
      return acc.concat(slot.assignedElements());
    }, []);
  }

  get _totalSlides() {
    const slot = this.shadowRoot.querySelector('slot');
    if (!slot) return 0;
    return slot.assignedElements().length;
  }

  _getTranslateX() {
    const slideWidth = 100 / this.slidesPerView;
    const offset = this._currentIndex * slideWidth;
    return -offset + (this._currentIndex * this.gap / this.offsetWidth * 100);
  }

  get offsetWidth() {
    return this.shadowRoot.querySelector('.carousel')?.offsetWidth || 0;
  }

  _prev = () => {
    if (this._currentIndex > 0) {
      this._currentIndex--;
    } else if (this.infinite) {
      this._currentIndex = this._totalSlides - 1;
    }
    this._emitChange();
  };

  _next = () => {
    if (this._currentIndex < this._totalSlides - 1) {
      this._currentIndex++;
    } else if (this.infinite) {
      this._currentIndex = 0;
    }
    this._emitChange();
  };

  _goTo(index) {
    if (index >= 0 && index < this._totalSlides) {
      this._currentIndex = index;
      this._emitChange();
    }
  }

  _emitChange() {
    this.emit('change', { index: this._currentIndex });
    this.emit('slide-change', { index: this._currentIndex });
  }

  _handleMouseEnter = () => {
    this._isHovering = true;
  };

  _handleMouseLeave = () => {
    this._isHovering = false;
  };

  _handleTouchStart = (e) => {
    this._touchStartX = e.touches[0].clientX;
    this._hasSwiped = false;
  };

  _handleTouchMove = (e) => {
    this._touchDeltaX = e.touches[0].clientX - this._touchStartX;
    if (Math.abs(this._touchDeltaX) > 10) {
      this._hasSwiped = true;
    }
  };

  _handleTouchEnd = () => {
    if (this._hasSwiped) {
      const threshold = 50;
      if (this._touchDeltaX < -threshold) {
        this._next();
      } else if (this._touchDeltaX > threshold) {
        this._prev();
      }
    }
    this._touchStartX = 0;
    this._touchDeltaX = 0;
  };

  _handleKeydown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this._prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this._next();
    }
  };

  _renderSlides() {
    const slot = this.shadowRoot.querySelector('slot');
    if (!slot) return '';

    const assignedElements = slot.assignedElements();

    if (this.transition === 'fade') {
      return assignedElements.map((el, i) => html`
        <div class="slide ${i === this._currentIndex ? 'active' : ''}">
          ${this._wrapSlideContent(el)}
        </div>
      `);
    }

    return assignedElements.map(el => html`
      <div class="slide">
        ${this._wrapSlideContent(el)}
      </div>
    `);
  }

  _wrapSlideContent(el) {
    const clone = el.cloneNode(true);
    clone.removeAttribute('slot');
    return html`<div class="slide-content">${clone}</div>`;
  }

  _renderArrows() {
    if (!this.showArrows) return '';

    const canPrev = this.infinite || this._currentIndex > 0;
    const canNext = this.infinite || this._currentIndex < this._totalSlides - 1;

    return html`
      <button
        class="arrow prev"
        ?disabled="${!canPrev}"
        @click="${this._prev}"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button
        class="arrow next"
        ?disabled="${!canNext}"
        @click="${this._next}"
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    `;
  }

  _renderDots() {
    if (!this.showDots || this._totalSlides <= 1) return '';

    return html`
      <div class="dots" role="tablist" aria-label="Slide navigation">
        ${Array.from({ length: this._totalSlides }, (_, i) => html`
          <button
            class="dot ${i === this._currentIndex ? 'active' : ''}"
            @click="${() => this._goTo(i)}"
            role="tab"
            aria-selected="${i === this._currentIndex}"
            aria-label="Go to slide ${i + 1}"
          ></button>
        `)}
      </div>
    `;
  }

  render() {
    const trackStyle = this.transition === 'slide'
      ? `transform: translateX(${this._getTranslateX()}%);`
      : '';

    return html`
      <div
        class="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Image carousel"
        @mouseenter="${this._handleMouseEnter}"
        @mouseleave="${this._handleMouseLeave}"
      >
        <div
          class="carousel-track-container ${this._hasSwiped ? 'touch-enabled' : ''}"
          @touchstart="${this._handleTouchStart}"
          @touchmove="${this._handleTouchMove}"
          @touchend="${this._handleTouchEnd}"
        >
          <div
            class="carousel-track ${this.transition === 'fade' ? 'fade' : ''}"
            style="${trackStyle}"
            aria-live="polite"
          >
            <slot @slotchange="${this._emitChange}"></slot>
            ${this._renderSlides()}
          </div>
          <div class="touch-indicator left ${this._touchDeltaX > 20 ? 'visible' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </div>
          <div class="touch-indicator right ${this._touchDeltaX < -20 ? 'visible' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
        ${this._renderArrows()}
        ${this._renderDots()}
      </div>
    `;
  }
}

customElements.define('p-carousel', PCarousel);
