// IconError - 错误图标
import { PapyraiIcon } from './papyrai-icon.js';
export class IconError extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>`; }
}
customElements.define('icon-error', IconError);
