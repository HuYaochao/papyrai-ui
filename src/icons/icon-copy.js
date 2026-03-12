// IconCopy - 复制图标
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCopy extends PapyraiIcon {
  render() { return html`<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>`; }
}
customElements.define('icon-copy', IconCopy);
