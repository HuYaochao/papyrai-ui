// IconPaper - 纸张图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconPaper extends PapyraiIcon {
  render() {
    return html`
      <path d="M6 2h10l4 4v14H4V2z"></path>
      <path d="M6 2v18"></path>
      <line x1="9" y1="7" x2="17" y2="7"></line>
      <line x1="9" y1="11" x2="17" y2="11"></line>
      <line x1="9" y1="15" x2="14" y2="15"></line>
    `;
  }
}

customElements.define('icon-paper', IconPaper);
