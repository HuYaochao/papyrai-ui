// IconEye - 眼睛图标
import { PapyraiIcon } from './papyrai-icon.js';
export class IconEye extends PapyraiIcon {
  render() { return html`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`; }
}
customElements.define('icon-eye', IconEye);
