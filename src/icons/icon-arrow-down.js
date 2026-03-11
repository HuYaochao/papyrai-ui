// IconArrowDown - 下箭头
import { PapyraiIcon } from './papyrai-icon.js';
export class IconArrowDown extends PapyraiIcon {
  render() {
    return html`<line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>`;
  }
}
customElements.define('icon-arrow-down', IconArrowDown);
