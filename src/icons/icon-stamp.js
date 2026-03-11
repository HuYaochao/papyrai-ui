// IconStamp - 印章图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconStamp extends PapyraiIcon {
  render() {
    return html`
      <path d="M5 14h14v5H5z"></path>
      <path d="M9 14V9h6v5"></path>
      <path d="M12 9V5h2v4"></path>
      <path d="M7 11h10v2H7z"></path>
    `;
  }
}

customElements.define('icon-stamp', IconStamp);
