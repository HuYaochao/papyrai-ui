// IconScroll - 卷轴图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconScroll extends PapyraiIcon {
  render() {
    return html`
      <path d="M5 8h14v8H5z"></path>
      <circle cx="5" cy="12" r="2"></circle>
      <circle cx="19" cy="12" r="2"></circle>
      <line x1="8" y1="11" x2="16" y2="11"></line>
      <line x1="8" y1="14" x2="16" y2="14"></line>
    `;
  }
}

customElements.define('icon-scroll', IconScroll);
