// Avatar — user avatar with image/initials/icon fallback
// Props: src, name, size('xs'|'sm'|'md'|'lg'|'xl'), status('online'|'offline'|'busy'|'away'), shape('circle'|'square')

import { PapyraiElement, html, css } from '../../core/base.js';

export class PAvatar extends PapyraiElement {
  static properties = {
    src:    { type: String },
    name:   { type: String },
    size:   { type: String, reflect: true },
    status: { type: String, reflect: true },
    shape:  { type: String, reflect: true },
    _imgError: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
      vertical-align: middle;
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: var(--paper-aged, #ede6d6);
      border: 2px solid var(--paper-border, #d9d0be);
      color: var(--ink-dark, #3a3530);
      font-family: var(--font-handwrite, cursive);
      font-weight: 600;
      user-select: none;
      box-shadow: var(--elevation-1, 0 1px 3px rgba(0,0,0,.08));
    }

    :host([shape="square"]) .avatar { border-radius: var(--radius-md, 8px); }
    :host(:not([shape="square"])) .avatar { border-radius: 50%; }

    /* Sizes */
    :host([size="xs"]) .avatar  { width: 24px; height: 24px; font-size: 0.6rem; }
    :host([size="sm"]) .avatar  { width: 32px; height: 32px; font-size: 0.75rem; }
    :host([size="md"]) .avatar  { width: 40px; height: 40px; font-size: 0.9rem; }
    :host([size="lg"]) .avatar  { width: 56px; height: 56px; font-size: 1.1rem; }
    :host([size="xl"]) .avatar  { width: 72px; height: 72px; font-size: 1.4rem; }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Status dot */
    .status-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid var(--paper-white, #fdfbf7);
    }

    :host([size="xs"]) .status-dot  { width: 6px; height: 6px; }
    :host([size="sm"]) .status-dot  { width: 8px; height: 8px; }
    :host([size="lg"]) .status-dot  { width: 12px; height: 12px; }
    :host([size="xl"]) .status-dot  { width: 14px; height: 14px; }

    :host([status="online"])  .status-dot { background: var(--accent-green, #5a8a5a); }
    :host([status="offline"]) .status-dot { background: var(--ink-light, #aaa5a0); }
    :host([status="busy"])    .status-dot { background: var(--accent-red, #c4453c); }
    :host([status="away"])    .status-dot { background: var(--accent-amber, #c49a3c); }
  `;

  constructor() {
    super();
    this.src = '';
    this.name = '';
    this.size = 'md';
    this.status = '';
    this.shape = 'circle';
    this._imgError = false;
  }

  _getInitials() {
    if (!this.name) return '?';
    const parts = this.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  _onImgError() {
    this._imgError = true;
  }

  render() {
    const showImg = this.src && !this._imgError;
    return html`
      <div class="avatar" part="avatar" title=${this.name || ''}>
        ${showImg
          ? html`<img src=${this.src} alt=${this.name || 'avatar'} @error=${this._onImgError}/>`
          : this.name
            ? html`<span>${this._getInitials()}</span>`
            : html`
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                     style="width:55%;height:55%">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
                </svg>
              `
        }
      </div>
      ${this.status ? html`<span class="status-dot" aria-label=${this.status}></span>` : ''}
    `;
  }
}

customElements.define('p-avatar', PAvatar);
