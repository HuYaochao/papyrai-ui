// IconEraser - 橡皮擦图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconEraser extends PapyraiIcon {
  render() {
    return html`
      <path d="M7 21h10l4-4-8-8-8 8 4 4z"></path>
      <line x1="11" y1="17" x2="7" y2="13"></line>
      <line x1="17" y1="11" x2="13" y2="7"></line>
    `;
  }
}

customElements.define('icon-eraser', IconEraser);
