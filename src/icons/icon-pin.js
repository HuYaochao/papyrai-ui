// IconPin - 图钉图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconPin extends PapyraiIcon {
  render() {
    return html`
      <path d="M12 2v6l6 6v4h-4l-2-2H8l-2 2H2v-4l6-6V2a2 2 0 0 1 4 0z"></path>
      <circle cx="12" cy="10" r="2.5"></circle>
    `;
  }
}

customElements.define('icon-pin', IconPin);
