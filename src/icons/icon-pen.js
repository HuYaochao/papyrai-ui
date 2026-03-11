// IconPen - 钢笔图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconPen extends PapyraiIcon {
  render() {
    return html`
      <path d="M4 20L20 4"></path>
      <path d="M20 4l-2 2 2 2 2-2-2-2z"></path>
      <path d="M4 20l4-4"></path>
    `;
  }
}

customElements.define('icon-pen', IconPen);
