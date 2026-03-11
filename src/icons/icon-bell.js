// IconBell - 铃铛
import { PapyraiIcon } from './papyrai-icon.js';
export class IconBell extends PapyraiIcon {
  render() { return html`<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>`; }
}
customElements.define('icon-bell', IconBell);
