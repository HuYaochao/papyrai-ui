// IconCross - 叉号图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconCross extends PapyraiIcon {
  render() {
    return html`
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    `;
  }
}

customElements.define('icon-cross', IconCross);
