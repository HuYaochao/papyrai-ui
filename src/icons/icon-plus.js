// IconPlus - 加号图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconPlus extends PapyraiIcon {
  render() {
    return html`
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    `;
  }
}

customElements.define('icon-plus', IconPlus);
