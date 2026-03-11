// IconChevronDown - 下双箭头
import { PapyraiIcon } from './papyrai-icon.js';
export class IconChevronDown extends PapyraiIcon {
  render() { return html`<polyline points="6 9 12 15 18 9"></polyline>`; }
}
customElements.define('icon-chevron-down', IconChevronDown);
