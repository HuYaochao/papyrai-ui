// IconLink - 链接图标
import { PapyraiIcon } from './papyrai-icon.js';
export class IconLink extends PapyraiIcon {
  render() { return html`<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>`; }
}
customElements.define('icon-link', IconLink);
