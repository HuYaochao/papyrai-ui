// IconChevronRight - 右双箭头
import { PapyraiIcon } from './papyrai-icon.js';
export class IconChevronRight extends PapyraiIcon {
  render() { return html`<polyline points="9 18 15 12 9 6"></polyline>`; }
}
customElements.define('icon-chevron-right', IconChevronRight);
