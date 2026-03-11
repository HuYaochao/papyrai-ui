// IconUser - 用户
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUser extends PapyraiIcon {
  render() { return html`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>`; }
}
customElements.define('icon-user', IconUser);
