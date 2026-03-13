// Scroll Spy - 滚动监听高亮
// Features: 跟踪滚动位置, 高亮活动章节, 平滑滚动

import { PapyraiElement, html, css } from '../../core/base.js';

export class PScrollSpy extends PapyraiElement {
  static properties = {
    targetSelector: { type: String },
    offset: { type: Number },
    threshold: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .scroll-spy {
      position: relative;
    }

    .scroll-spy-content {
      position: relative;
    }

    .scroll-spy-nav {
      position: fixed;
      right: var(--spacing-lg, 24px);
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs, 4px);
      z-index: 50;
    }

    .nav-item {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--ink-faint, #d9d5d0);
      cursor: pointer;
      transition: all 0.15s ease;
      border: none;
      padding: 0;
    }

    .nav-item:hover {
      background: var(--ink-light, #aaa5a0);
      transform: scale(1.3);
    }

    .nav-item[aria-current="true"] {
      background: var(--accent-red, #c4453c);
      transform: scale(1.3);
    }

    .nav-item::before {
      content: attr(data-title);
      position: absolute;
      right: 100%;
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      background: var(--ink-black, #1f1a15);
      color: var(--paper-white, #f5f0e8);
      font-size: 0.7rem;
      border-radius: var(--radius-sm, 4px);
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease;
      margin-right: var(--spacing-sm, 8px);
    }

    .nav-item:hover::before {
      opacity: 1;
    }
  `;

  constructor() {
    super();
    this.targetSelector = 'section, h1, h2, h3';
    this.offset = 100;
    this.threshold = 0.5;
    this._sections = [];
    this._activeIndex = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleScroll = this._handleScroll.bind(this);
    window.addEventListener('scroll', this._handleScroll, { passive: true });
    requestAnimationFrame(() => this._setupSections());
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this._handleScroll);
    super.disconnectedCallback();
  }

  _setupSections() {
    const root = this._getRootElement();
    if (!root) return;

    const container = root.querySelector('.scroll-spy-content') || root;
    this._sections = Array.from(container.querySelectorAll(this.targetSelector))
      .filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.height > 50;
      })
      .map((el, index) => ({
        id: el.id || `section-${index}`,
        element: el,
        title: el.dataset.spyTitle || el.textContent?.trim().slice(0, 20) || `Section ${index + 1}`
      }));

    this.requestUpdate();
    this._handleScroll();
  }

  _getRootElement() {
    return this.shadowRoot?.host || this;
  }

  _handleScroll() {
    if (this._sections.length === 0) return;

    const scrollTop = window.scrollY;
    let activeIndex = 0;

    for (let i = 0; i < this._sections.length; i++) {
      const section = this._sections[i];
      const rect = section.element.getBoundingClientRect();
      const offsetTop = rect.top + scrollTop;

      if (scrollTop >= offsetTop - this.offset) {
        activeIndex = i;
      }
    }

    if (activeIndex !== this._activeIndex) {
      this._activeIndex = activeIndex;
      this.emit('spy-change', { 
        index: activeIndex, 
        section: this._sections[activeIndex] 
      });
    }
  }

  _scrollTo(index) {
    const section = this._sections[index];
    if (!section) return;

    const rect = section.element.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const offsetTop = rect.top + scrollTop;

    window.scrollTo({
      top: offsetTop - this.offset,
      behavior: 'smooth'
    });

    this._activeIndex = index;
  }

  render() {
    return html`
      <div class="scroll-spy">
        <div class="scroll-spy-content">
          <slot></slot>
        </div>
        ${this._sections.length > 1 ? html`
          <nav class="scroll-spy-nav" aria-label="Scroll navigation">
            ${this._sections.map((section, i) => html`
              <button
                class="nav-item"
                data-title=${section.title}
                aria-current=${i === this._activeIndex ? 'true' : 'false'}
                aria-label=${section.title}
                @click=${() => this._scrollTo(i)}
              ></button>
            `)}
          </nav>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('p-scroll-spy', PScrollSpy);
