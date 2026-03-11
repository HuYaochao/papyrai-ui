// IconStar - 星形
import { PapyraiIcon } from './papyrai-icon.js';
export class IconStar extends PapyraiIcon {
  render() { return html`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>`; }
}
customElements.define('icon-star', IconStar);
