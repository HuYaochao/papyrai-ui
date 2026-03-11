// IconArrowUp - 上箭头
import { PapyraiIcon } from './papyrai-icon.js';
export class IconArrowUp extends PapyraiIcon {
  render() {
    return html`<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>`;
  }
}
customElements.define('icon-arrow-up', IconArrowUp);
