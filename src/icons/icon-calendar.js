// IconCalendar - 日历
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCalendar extends PapyraiIcon {
  render() { return html`<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>`; }
}
customElements.define('icon-calendar', IconCalendar);
