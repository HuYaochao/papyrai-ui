// IconEnvelope - 信封图标
import { PapyraiIcon } from './papyrai-icon.js';

export class IconEnvelope extends PapyraiIcon {
  render() {
    return html`
      <path d="M2 6h20v12H2z"></path>
      <path d="M2 8l10 6 10-6"></path>
    `;
  }
}

customElements.define('icon-envelope', IconEnvelope);
