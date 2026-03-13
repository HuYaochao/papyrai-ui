// Rating - 纸张风格星级评分
// 属性: value(Number), max(Number), readonly(Boolean), disabled(Boolean), half(Boolean),
//       size(String: 'sm'|'md'|'lg'), label(String)
// 事件: change({value})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PRating extends PapyraiElement {
  static properties = {
    value: { type: Number },
    max: { type: Number },
    readonly: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    half: { type: Boolean },
    size: { type: String, reflect: true },
    label: { type: String }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    .rating-wrapper {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
    }

    .rating-wrapper:focus-within {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: 2px;
    }

    :host([disabled]) {
      opacity: 0.55;
      pointer-events: none;
    }

    .stars {
      display: flex;
      gap: 2px;
    }

    .star {
      position: relative;
      width: 24px;
      height: 24px;
      cursor: pointer;
      transition: transform 0.15s ease;
    }

    .star:hover:not([data-readonly]) {
      transform: scale(1.15);
    }

    .star svg {
      width: 100%;
      height: 100%;
      stroke: var(--paper-border, #d9ccb8);
      stroke-width: 1.5;
      fill: none;
      transition: fill 0.2s ease, stroke 0.2s ease;
    }

    .star.filled svg {
      fill: var(--status-warning, #f59e0b);
      stroke: var(--status-warning, #f59e0b);
    }

    .star.half {
      position: relative;
    }

    .star.half .star-half-fill {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
    }

    .star.half .star-half-fill svg {
      fill: var(--status-warning, #f59e0b);
      stroke: var(--status-warning, #f59e0b);
    }

    /* Sizes */
    :host([size="sm"]) .star {
      width: 18px;
      height: 18px;
    }

    :host([size="lg"]) .star {
      width: 32px;
      height: 32px;
    }

    .label {
      font-family: var(--font-serif, serif);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
      margin-left: var(--spacing-xs, 4px);
    }
  `;

  constructor() {
    super();
    this.value = 0;
    this.max = 5;
    this.readonly = false;
    this.disabled = false;
    this.half = false;
    this.size = 'md';
    this.label = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
    if (!this.readonly) {
      this.addEventListener('click', this._handleClick);
      this.addEventListener('keydown', this._handleKeydown);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _handleClick = (e) => {
    const star = e.composedPath().find(el => el.classList?.contains('star'));
    if (!star || this.readonly || this.disabled) return;
    const index = parseInt(star.dataset.index);
    if (this.half) {
      const rect = star.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isHalf = x < rect.width / 2;
      this.value = isHalf ? index + 0.5 : index + 1;
    } else {
      this.value = index + 1;
    }
    this.emit('change', { value: this.value });
  };

  _handleKeydown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.value = Math.min(this.value + 1, this.max);
      this.emit('change', { value: this.value });
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.value = Math.max(this.value - 1, 0);
      this.emit('change', { value: this.value });
    }
  };

  render() {
    return html`
      <div class="rating-wrapper">
        <div class="stars" role="radiogroup" aria-label="${this.label || 'Rating'}">
          ${[...Array(this.max)].map((_, i) => {
            const filled = i < Math.floor(this.value);
            const isHalf = i === Math.floor(this.value) && this.value % 1 !== 0;
            return html`
              <span 
                class="star ${filled || isHalf ? 'filled' : ''} ${isHalf ? 'half' : ''}"
                data-index="${i}"
                role="radio"
                aria-checked="${i + 1 <= this.value}"
                tabindex="${this.readonly ? -1 : 0}"
              >
                ${isHalf ? html`<span class="star-half-fill"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>` : ''}
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </span>
            `;
          })}
        </div>
        ${this.label ? html`<span class="label">${this.value} / ${this.max}</span>` : ''}
      </div>
    `;
  }
}

customElements.define('p-rating', PRating);
