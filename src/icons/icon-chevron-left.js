// IconChevronLeft - 左双箭头
import { PapyraiIcon } from './papyrai-icon.js';
export class IconChevronLeft extends PapyraiIcon {
  render() { return html`<polyline points="15 18 9 12 15 6"></polyline>`; }
}
customElements.define('icon-chevron-left', IconChevronLeft);
