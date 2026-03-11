// IconRuler - 尺子图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconRuler extends PapyraiIcon {
  render() {
    return html`
      <path d="M21.21 15.89A1 1 0 0 0 22 15V6a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 17 1H8a1 1 0 0 0-.71.29l-4 4A1 1 0 0 0 3 6v9a1 1 0 0 0 .79.98L17 21l4.21-4.11z"></path>
      <line x1="7" y1="4" x2="10" y2="7"></line>
      <line x1="11" y1="4" x2="14" y2="7"></line>
      <line x1="15" y1="4" x2="18" y2="7"></line>
    `;
  }
}

customElements.define('icon-ruler', IconRuler);
