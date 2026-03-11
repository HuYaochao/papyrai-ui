// IconChevronUp - 上双箭头
import { PapyraiIcon } from './papyrai-icon.js';
export class IconChevronUp extends PapyraiIcon {
  render() { return html`<polyline points="18 15 12 9 6 15"></polyline>`; }
}
customElements.define('icon-chevron-up', IconChevronUp);
