// IconBookmark - 书签
import { PapyraiIcon } from './papyrai-icon.js';
export class IconBookmark extends PapyraiIcon {
  render() { return html`<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>`; }
}
customElements.define('icon-bookmark', IconBookmark);

// IconBook - 书本
import { PapyraiIcon } from './papyrai-icon.js';
export class IconBook extends PapyraiIcon {
  render() { return html`<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>`; }
}
customElements.define('icon-book', IconBook);

// IconBookOpen - 打开的书
import { PapyraiIcon } from './papyrai-icon.js';
export class IconBookOpen extends PapyraiIcon {
  render() { return html`<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>`; }
}
customElements.define('icon-book-open', IconBookOpen);

// IconFile - 文件
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFile extends PapyraiIcon {
  render() { return html`<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>`; }
}
customElements.define('icon-file', IconFile);

// IconFileText - 文本文档
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFileText extends PapyraiIcon {
  render() { return html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>`; }
}
customElements.define('icon-file-text', IconFileText);

// IconFilePlus - 新建文件
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFilePlus extends PapyraiIcon {
  render() { return html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line>`; }
}
customElements.define('icon-file-plus', IconFilePlus);

// IconFileMinus - 删除文件
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFileMinus extends PapyraiIcon {
  render() { return html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line>`; }
}
customElements.define('icon-file-minus', IconFileMinus);

// IconFolderPlus - 新建文件夹
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFolderPlus extends PapyraiIcon {
  render() { return html`<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line>`; }
}
customElements.define('icon-folder-plus', IconFolderPlus);

// IconFolderMinus - 删除文件夹
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFolderMinus extends PapyraiIcon {
  render() { return html`<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="9" y1="14" x2="15" y2="14"></line>`; }
}
customElements.define('icon-folder-minus', IconFolderMinus);

// IconArchive - 归档
import { PapyraiIcon } from './papyrai-icon.js';
export class IconArchive extends PapyraiIcon {
  render() { return html`<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>`; }
}
customElements.define('icon-archive', IconArchive);

// IconInbox - 收件箱
import { PapyraiIcon } from './papyrai-icon.js';
export class IconInbox extends PapyraiIcon {
  render() { return html`<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>`; }
}
customElements.define('icon-inbox', IconInbox);

// IconSend - 发送
import { PapyraiIcon } from './papyrai-icon.js';
export class IconSend extends PapyraiIcon {
  render() { return html`<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>`; }
}
customElements.define('icon-send', IconSend);

// IconMessageCircle - 消息/评论
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMessageCircle extends PapyraiIcon {
  render() { return html`<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>`; }
}
customElements.define('icon-message-circle', IconMessageCircle);

// IconMessageSquare - 方形消息
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMessageSquare extends PapyraiIcon {
  render() { return html`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>`; }
}
customElements.define('icon-message-square', IconMessageSquare);

// IconUsers - 用户组
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUsers extends PapyraiIcon {
  render() { return html`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`; }
}
customElements.define('icon-users', IconUsers);

// IconUserPlus - 添加用户
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUserPlus extends PapyraiIcon {
  render() { return html`<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>`; }
}
customElements.define('icon-user-plus', IconUserPlus);

// IconUserMinus - 删除用户
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUserMinus extends PapyraiIcon {
  render() { return html`<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line>`; }
}
customElements.define('icon-user-minus', IconUserMinus);

// IconUserCheck - 用户确认
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUserCheck extends PapyraiIcon {
  render() { return html`<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>`; }
}
customElements.define('icon-user-check', IconUserCheck);

// IconUserX - 用户拒绝
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUserX extends PapyraiIcon {
  render() { return html`<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line>`; }
}
customElements.define('icon-user-x', IconUserX);

// IconShield - 盾牌
import { PapyraiIcon } from './papyrai-icon.js';
export class IconShield extends PapyraiIcon {
  render() { return html`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>`; }
}
customElements.define('icon-shield', IconShield);

// IconShieldCheck - 盾牌检查
import { PapyraiIcon } from './papyrai-icon.js';
export class IconShieldCheck extends PapyraiIcon {
  render() { return html`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 12 15 16 10"></polyline>`; }
}
customElements.define('icon-shield-check', IconShieldCheck);

// IconShieldOff - 盾牌关闭
import { PapyraiIcon } from './papyrai-icon.js';
export class IconShieldOff extends PapyraiIcon {
  render() { return html`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="4" y1="4" x2="20" y2="20"></line>`; }
}
customElements.define('icon-shield-off', IconShieldOff);

// IconLock - 锁（已在前面定义，重新导出）
import { PapyraiIcon } from './papyrai-icon.js';
export class IconLock extends PapyraiIcon {
  render() { return html`<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>`; }
}
customElements.define('icon-lock', IconLock);

// IconUnlock - 开锁
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUnlock extends PapyraiIcon {
  render() { return html`<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>`; }
}
customElements.define('icon-unlock', IconUnlock);

// IconKey - 钥匙
import { PapyraiIcon } from './papyrai-icon.js';
export class IconKey extends PapyraiIcon {
  render() { return html`<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>`; }
}
customElements.define('icon-key', IconKey);

// IconCreditCard - 信用卡
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCreditCard extends PapyraiIcon {
  render() { return html`<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>`; }
}
customElements.define('icon-credit-card', IconCreditCard);

// IconDollarSign - 美元
import { PapyraiIcon } from './papyrai-icon.js';
export class IconDollarSign extends PapyraiIcon {
  render() { return html`<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>`; }
}
customElements.define('icon-dollar-sign', IconDollarSign);

// IconShoppingCart - 购物车
import { PapyraiIcon } from './papyrai-icon.js';
export class IconShoppingCart extends PapyraiIcon {
  render() { return html`<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>`; }
}
customElements.define('icon-shopping-cart', IconShoppingCart);

// IconTag - 标签
import { PapyraiIcon } from './papyrai-icon.js';
export class IconTag extends PapyraiIcon {
  render() { return html`<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>`; }
}
customElements.define('icon-tag', IconTag);

// IconTags - 多个标签
import { PapyraiIcon } from './papyrai-icon.js';
export class IconTags extends PapyraiIcon {
  render() { return html`<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line><path d="M6.52 5.5l7.17 7.17"></path>`; }
}
customElements.define('icon-tags', IconTags);

// IconShoppingBag - 购物袋
import { PapyraiIcon } from './papyrai-icon.js';
export class IconShoppingBag extends PapyraiIcon {
  render() { return html`<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>`; }
}
customElements.define('icon-shopping-bag', IconShoppingBag);

// IconBarChart - 柱状图
import { PapyraiIcon } from './papyrai-icon.js';
export class IconBarChart extends PapyraiIcon {
  render() { return html`<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>`; }
}
customElements.define('icon-bar-chart', IconBarChart);

// IconPieChart - 饼图
import { PapyraiIcon } from './papyrai-icon.js';
export class IconPieChart extends PapyraiIcon {
  render() { return html`<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>`; }
}
customElements.define('icon-pie-chart', IconPieChart);

// IconTrendingUp - 已在前面定义

// IconTrendingDown - 已在前面定义

// IconBarChart2 - 双向柱状图
import { PapyraiIcon } from './papyrai-icon.js';
export class IconBarChart2 extends PapyraiIcon {
  render() { return html`<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>`; }
}
customElements.define('icon-bar-chart-2', IconBarChart2);

// IconBox - 盒子
import { PapyraiIcon } from './papyrai-icon.js';
export class IconBox extends PapyraiIcon {
  render() { return html`<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>`; }
}
customElements.define('icon-box', IconBox);

// IconPackage - 包裹
import { PapyraiIcon } from './papyrai-icon.js';
export class IconPackage extends PapyraiIcon {
  render() { return html`<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>`; }
}
customElements.define('icon-package', IconPackage);

// IconTruck - 卡车
import { PapyraiIcon } from './papyrai-icon.js';
export class IconTruck extends PapyraiIcon {
  render() { return html`<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>`; }
}
customElements.define('icon-truck', IconTruck);

// IconBike - 自行车
import { PapyraiIcon } from './papyrai-icon.js';
export class IconBike extends PapyraiIcon {
  render() { return html`<path d="M5.5 16a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"></path><path d="M18.3 9.7a2.5 2.5 0 1 1 0-4.4 2.5 2.5 0 0 1 0 4.4z"></path><path d="M17 16l-4-2"></path><path d="M21 16l-4-2"></path><path d="M7 16l-4 2"></path><path d="M3.3 7l2.7-1"></path><path d="M21 7l-2.7-1"></path>`; }
}
customElements.define('icon-bike', IconBike);

// IconCar - 汽车
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCar extends PapyraiIcon {
  render() { return html`<path d="M16 3h3l2 5v7h-5l-2-5H5a2 2 0 0 0-2 2v2"></path><circle cx="7.5" cy="15.5" r="2.5"></circle><circle cx="17.5" cy="15.5" r="2.5"></circle>`; }
}
customElements.define('icon-car', IconCar);

// IconPlane - 飞机
import { PapyraiIcon } from './papyrai-icon.js';
export class IconPlane extends PapyraiIcon {
  render() { return html`<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>`; }
}
customElements.define('icon-plane', IconPlane);

// IconRocket - 火箭
import { PapyraiIcon } from './papyrai-icon.js';
export class IconRocket extends PapyraiIcon {
  render() { return html`<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>`; }
}
customElements.define('icon-rocket', IconRocket);

// IconFeather - 羽毛
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFeather extends PapyraiIcon {
  render() { return html`<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>`; }
}
customElements.define('icon-feather', IconFeather);

// IconScissors - 剪刀（已在前面定义）
// IconPaperclip - 回形针（已在前面定义）

// IconPaperPlane - 纸飞机
import { PapyraiIcon } from './papyrai-icon.js';
export class IconPaperPlane extends PapyraiIcon {
  render() { return html`<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>`; }
}
customElements.define('icon-paper-plane', IconPaperPlane);

// IconAperture - 光圈
import { PapyraiIcon } from './papyrai-icon.js';
export class IconAperture extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>`; }
}
customElements.define('icon-aperture', IconAperture);

// IconSparkles - 闪光
import { PapyraiIcon } from './papyrai-icon.js';
export class IconSparkles extends PapyraiIcon {
  render() { return html`<path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287z"></path>`; }
}
customElements.define('icon-sparkles', IconSparkles);

// IconWand - 魔杖
import { PapyraiIcon } from './papyrai-icon.js';
export class IconWand extends PapyraiIcon {
  render() { return html`<path d="m15 4 4.5 4.5"></path><path d="m15 12 4.5-4.5"></path><circle cx="8" cy="15" r="3"></circle><path d="m18 12-4.5-4.5"></path><path d="m12 18 1.5 1.5"></path><path d="m18 18-1.5 1.5"></path>`; }
}
customElements.define('icon-wand', IconWand);
