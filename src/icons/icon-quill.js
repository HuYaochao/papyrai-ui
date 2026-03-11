// IconQuill - 羽毛笔图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconQuill extends PapyraiIcon {
  render() {
    return html`
      <path d="M8 19L20 5"></path>
      <path d="M20 5l-1 1 2 2 1-1-2-2z"></path>
      <path d="M8 19l3-3"></path>
      <path d="M11 16l2-2"></path>
    `;
  }
}

customElements.define('icon-quill', IconQuill);
