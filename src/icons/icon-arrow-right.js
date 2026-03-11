// IconArrowRight - 右箭头
import { PapyraiIcon } from './papyrai-icon.js';
export class IconArrowRight extends PapyraiIcon {
  render() {
    return html`<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>`;
  }
}
customElements.define('icon-arrow-right', IconArrowRight);
