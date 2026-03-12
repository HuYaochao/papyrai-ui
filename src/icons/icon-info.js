// IconInfo - 信息图标
import { PapyraiIcon } from './papyrai-icon.js';
export class IconInfo extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>`; }
}
customElements.define('icon-info', IconInfo);
