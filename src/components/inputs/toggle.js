// Toggle - 纸张风格开关
// 属性: checked(Boolean), disabled(Boolean), size(String: 'sm'|'md'|'lg'),
//       label(String), labelOff(String)
// 事件: change({checked})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PToggle extends PapyraiElement {
  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    label: { type: String },
    labelOff: { type: String }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
    }

    .toggle-wrapper {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      cursor: pointer;
    }

    :host([disabled]) .toggle-wrapper {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .toggle {
      position: relative;
      width: 44px;
      height: 24px;
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: 12px;
      background: var(--paper-cream, #f8f1e5);
      transition: all 0.3s ease;
    }

    .toggle-wrapper:hover:not([disabled]) .toggle {
      border-color: var(--accent-red, #c4453c);
    }

    :host([checked]) .toggle {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
    }

    /* Sizes */
    :host([size="sm"]) .toggle {
      width: 36px;
      height: 20px;
      border-radius: 10px;
    }

    :host([size="lg"]) .toggle {
      width: 56px;
      height: 30px;
      border-radius: 15px;
    }

    .toggle-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--paper-white, #fffef8);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    :host([checked]) .toggle-thumb {
      transform: translateX(20px);
    }

    :host([size="sm"]) .toggle-thumb {
      width: 14px;
      height: 14px;
    }

    :host([size="sm"][checked]) .toggle-thumb {
      transform: translateX(16px);
    }

    :host([size="lg"]) .toggle-thumb {
      width: 24px;
      height: 24px;
    }

    :host([size="lg"][checked]) .toggle-thumb {
      transform: translateX(26px);
    }

    .label {
      font-family: var(--font-serif, serif);
      font-size: 0.95rem;
      color: var(--ink-black, #1f1a15);
      user-select: none;
    }

    :host([disabled]) .label {
      color: var(--ink-faint, #999);
    }

    /* Focus */
    .toggle-wrapper:focus-visible {
      outline: 2px solid var(--accent-red, #c4453c);
      outline-offset: 2px;
    }
  `;

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.size = 'md';
    this.label = '';
    this.labelOff = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'switch');
    this.setAttribute('aria-checked', this.checked);
    this.addEventListener('click', this._toggle);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._toggle);
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', this.checked);
    }
  }

  _toggle = () => {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.emit('change', { checked: this.checked });
  };

  _handleKeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._toggle();
    }
  };

  render() {
    return html`
      <span class="toggle-wrapper" tabindex="0">
        <span class="toggle">
          <span class="toggle-thumb"></span>
        </span>
        ${this.label ? html`<span class="label">${this.checked ? this.label : (this.labelOff || this.label)}</span>` : ''}
      </span>
    `;
  }
}

customElements.define('p-toggle', PToggle);
