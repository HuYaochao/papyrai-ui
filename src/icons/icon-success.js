// IconSuccess - 成功图标
import { PapyraiIcon } from './papyrai-icon.js';
export class IconSuccess extends PapyraiIcon {
  render() { return html`<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>`; }
}
customElements.define('icon-success', IconSuccess);
