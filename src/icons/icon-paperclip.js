// IconPaperclip - 回形针图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconPaperclip extends PapyraiIcon {
  render() {
    return html`
      <path d="M9 4v14a3 3 0 006 0V8"></path>
      <path d="M13 8v10a3 3 0 006 0V4"></path>
    `;
  }
}

customElements.define('icon-paperclip', IconPaperclip);
