// IconArrowLeft - 左箭头
import { PapyraiIcon } from './papyrai-icon.js';
export class IconArrowLeft extends PapyraiIcon {
  render() {
    return html`<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>`;
  }
}
customElements.define('icon-arrow-left', IconArrowLeft);
