// IconMinus - 减号图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconMinus extends PapyraiIcon {
  render() {
    return html`<line x1="5" y1="12" x2="19" y2="12"></line>`;
  }
}

customElements.define('icon-minus', IconMinus);
