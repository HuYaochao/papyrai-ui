// IconScissors - 剪刀图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconScissors extends PapyraiIcon {
  render() {
    return html`
      <circle cx="6" cy="6" r="3"></circle>
      <circle cx="6" cy="18" r="3"></circle>
      <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
      <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
      <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
    `;
  }
}

customElements.define('icon-scissors', IconScissors);
