// IconWaxSeal - 蜡封印章图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconWaxSeal extends PapyraiIcon {
  render() {
    return html`
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 6v2M12 16v2M6 12h2M16 12h2"></path>
      <circle cx="12" cy="12" r="4"></circle>
    `;
  }
}

customElements.define('icon-wax-seal', IconWaxSeal);
