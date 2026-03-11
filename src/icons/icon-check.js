// IconCheck - 对勾图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconCheck extends PapyraiIcon {
  render() {
    return html`<polyline points="20 6 9 17 4 12"></polyline>`;
  }
}

customElements.define('icon-check', IconCheck);
