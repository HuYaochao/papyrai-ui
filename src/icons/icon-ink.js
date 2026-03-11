// IconInk - 墨水图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconInk extends PapyraiIcon {
  render() {
    return html`
      <line x1="12" y1="2" x2="12" y2="10"></line>
      <circle cx="12" cy="15" r="3.5"></circle>
    `;
  }
}

customElements.define('icon-ink', IconInk);
