import { PapyraiElement, html, css } from '../../core/base.js';

export class PContextMenu extends PapyraiElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    active: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      border-radius: var(--radius-md, 10px);
      border: 1px solid var(--paper-border, #d9ccb8);
      background: var(--paper-cream, #f8f1e5);
      color: var(--ink-black, #1f1a15);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      font-family: var(--font-serif, serif);
      cursor: pointer;
      user-select: none;
    }

    :host([active]) {
      border-color: var(--accent-red, #c4453c);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    :host([disabled]) {
      opacity: .55;
      pointer-events: none;
    }

    .label { font-size: 0.92rem; }
  `;

  constructor() {
    super();
    this.label = 'p-context-menu';
    this.value = '';
    this.active = false;
    this.disabled = false;
    this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'button');
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._toggleActive);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._toggleActive);
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  _toggleActive = () => {
    if (this.disabled) return;
    this.active = !this.active;
    this.emit('change', { active: this.active, value: this.value || this.label });
  };

  _handleKeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._toggleActive();
    }
  };

  render() {
    return html`<span class="label">${this.label}</span><slot></slot>`;
  }
}

customElements.define('p-context-menu', PContextMenu);
