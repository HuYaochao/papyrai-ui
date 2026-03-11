// IconClock - 时钟
import { PapyraiIcon } from './papyrai-icon.js';
export class IconClock extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>`; }
}
customElements.define('icon-clock', IconClock);

// IconHome - 房屋
import { PapyraiIcon } from './papyrai-icon.js';
export class IconHome extends PapyraiIcon {
  render() { return html`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>`; }
}
customElements.define('icon-home', IconHome);

// IconMail - 邮件
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMail extends PapyraiIcon {
  render() { return html`<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>`; }
}
customElements.define('icon-mail', IconMail);

// IconFolder - 文件夹
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFolder extends PapyraiIcon {
  render() { return html`<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>`; }
}
customElements.define('icon-folder', IconFolder);

// IconImage - 图片
import { PapyraiIcon } from './papyrai-icon.js';
export class IconImage extends PapyraiIcon {
  render() { return html`<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>`; }
}
customElements.define('icon-image', IconImage);

// IconLock - 锁
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

// IconEye - 眼睛
import { PapyraiIcon } from './papyrai-icon.js';
export class IconEye extends PapyraiIcon {
  render() { return html`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`; }
}
customElements.define('icon-eye', IconEye);

// IconEyeOff - 闭眼
import { PapyraiIcon } from './papyrai-icon.js';
export class IconEyeOff extends PapyraiIcon {
  render() { return html`<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`; }
}
customElements.define('icon-eye-off', IconEyeOff);

// IconTrash - 垃圾桶
import { PapyraiIcon } from './papyrai-icon.js';
export class IconTrash extends PapyraiIcon {
  render() { return html`<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>`; }
}
customElements.define('icon-trash', IconTrash);

// IconEdit - 编辑
import { PapyraiIcon } from './papyrai-icon.js';
export class IconEdit extends PapyraiIcon {
  render() { return html`<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>`; }
}
customElements.define('icon-edit', IconEdit);

// IconDownload - 下载
import { PapyraiIcon } from './papyrai-icon.js';
export class IconDownload extends PapyraiIcon {
  render() { return html`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>`; }
}
customElements.define('icon-download', IconDownload);

// IconUpload - 上传
import { PapyraiIcon } from './papyrai-icon.js';
export class IconUpload extends PapyraiIcon {
  render() { return html`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>`; }
}
customElements.define('icon-upload', IconUpload);

// IconLink - 链接
import { PapyraiIcon } from './papyrai-icon.js';
export class IconLink extends PapyraiIcon {
  render() { return html`<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>`; }
}
customElements.define('icon-link', IconLink);

// IconMenu - 菜单
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMenu extends PapyraiIcon {
  render() { return html`<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>`; }
}
customElements.define('icon-menu', IconMenu);

// IconMore - 更多
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMore extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>`; }
}
customElements.define('icon-more', IconMore);

// IconShare - 分享
import { PapyraiIcon } from './papyrai-icon.js';
export class IconShare extends PapyraiIcon {
  render() { return html`<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>`; }
}
customElements.define('icon-share', IconShare);

// IconRefresh - 刷新
import { PapyraiIcon } from './papyrai-icon.js';
export class IconRefresh extends PapyraiIcon {
  render() { return html`<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>`; }
}
customElements.define('icon-refresh', IconRefresh);

// IconMap - 地图
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMap extends PapyraiIcon {
  render() { return html`<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>`; }
}
customElements.define('icon-map', IconMap);

// IconMapPin - 地图标记
import { PapyraiIcon } from './papyrai-icon.js';
export class IconMapPin extends PapyraiIcon {
  render() { return html`<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>`; }
}
customElements.define('icon-map-pin', IconMapPin);

// IconGlobe - 地球
import { PapyraiIcon } from './papyrai-icon.js';
export class IconGlobe extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>`; }
}
customElements.define('icon-globe', IconGlobe);

// IconCloud - 云
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCloud extends PapyraiIcon {
  render() { return html`<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>`; }
}
customElements.define('icon-cloud', IconCloud);

// IconCloudOff - 云关闭
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCloudOff extends PapyraiIcon {
  render() { return html`<line x1="1" y1="1" x2="23" y2="23"></line><path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"></path>`; }
}
customElements.define('icon-cloud-off', IconCloudOff);

// IconFlag - 旗
import { PapyraiIcon } from './papyrai-icon.js';
export class IconFlag extends PapyraiIcon {
  render() { return html`<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>`; }
}
customElements.define('icon-flag', IconFlag);

// IconTarget - 靶心
import { PapyraiIcon } from './papyrai-icon.js';
export class IconTarget extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>`; }
}
customElements.define('icon-target', IconTarget);

// IconZap - 闪电
import { PapyraiIcon } from './papyrai-icon.js';
export class IconZap extends PapyraiIcon {
  render() { return html`<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>`; }
}
customElements.define('icon-zap', IconZap);

// IconActivity - 活动
import { PapyraiIcon } from './papyrai-icon.js';
export class IconActivity extends PapyraiIcon {
  render() { return html`<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>`; }
}
customElements.define('icon-activity', IconActivity);

// IconTrendingUp - 上升趋势
import { PapyraiIcon } from './papyrai-icon.js';
export class IconTrendingUp extends PapyraiIcon {
  render() { return html`<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>`; }
}
customElements.define('icon-trending-up', IconTrendingUp);

// IconTrendingDown - 下降趋势
import { PapyraiIcon } from './papyrai-icon.js';
export class IconTrendingDown extends PapyraiIcon {
  render() { return html`<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>`; }
}
customElements.define('icon-trending-down', IconTrendingDown);

// IconAward - 奖杯
import { PapyraiIcon } from './papyrai-icon.js';
export class IconAward extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>`; }
}
customElements.define('icon-award', IconAward);

// IconTool - 工具
import { PapyraiIcon } from './papyrai-icon.js';
export class IconTool extends PapyraiIcon {
  render() { return html`<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>`; }
}
customElements.define('icon-tool', IconTool);

// IconCompass - 指南针
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCompass extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>`; }
}
customElements.define('icon-compass', IconCompass);

// IconBattery - 电池
import { PapyraiIcon } from './papyrai-icon.js';
export class IconBattery extends PapyraiIcon {
  render() { return html`<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line>`; }
}
customElements.define('icon-battery', IconBattery);

// IconWifi - 无线网络
import { PapyraiIcon } from './papyrai-icon.js';
export class IconWifi extends PapyraiIcon {
  render() { return html`<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>`; }
}
customElements.define('icon-wifi', IconWifi);

// IconVolume - 音量
import { PapyraiIcon } from './papyrai-icon.js';
export class IconVolume extends PapyraiIcon {
  render() { return html`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`; }
}
customElements.define('icon-volume', IconVolume);

// IconVolumeX - 静音
import { PapyraiIcon } from './papyrai-icon.js';
export class IconVolumeX extends PapyraiIcon {
  render() { return html`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`; }
}
customElements.define('icon-volume-x', IconVolumeX);

// IconPlay - 播放
import { PapyraiIcon } from './papyrai-icon.js';
export class IconPlay extends PapyraiIcon {
  render() { return html`<polygon points="5 3 19 12 5 21 5 3"></polygon>`; }
}
customElements.define('icon-play', IconPlay);

// IconPause - 暂停
import { PapyraiIcon } from './papyrai-icon.js';
export class IconPause extends PapyraiIcon {
  render() { return html`<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`; }
}
customElements.define('icon-pause', IconPause);

// IconSkipBack - 后退
import { PapyraiIcon } from './papyrai-icon.js';
export class IconSkipBack extends PapyraiIcon {
  render() { return html`<polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>`; }
}
customElements.define('icon-skip-back', IconSkipBack);

// IconSkipForward - 前进
import { PapyraiIcon } from './papyrai-icon.js';
export class IconSkipForward extends PapyraiIcon {
  render() { return html`<polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>`; }
}
customElements.define('icon-skip-forward', IconSkipForward);

// IconRepeat - 循环
import { PapyraiIcon } from './papyrai-icon.js';
export class IconRepeat extends PapyraiIcon {
  render() { return html`<polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>`; }
}
customElements.define('icon-repeat', IconRepeat);

// IconShuffle - 随机
import { PapyraiIcon } from './papyrai-icon.js';
export class IconShuffle extends PapyraiIcon {
  render() { return html`<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>`; }
}
customElements.define('icon-shuffle', IconShuffle);

// IconSquare - 方形
import { PapyraiIcon } from './papyrai-icon.js';
export class IconSquare extends PapyraiIcon {
  render() { return html`<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>`; }
}
customElements.define('icon-square', IconSquare);

// IconCircle - 圆形
import { PapyraiIcon } from './papyrai-icon.js';
export class IconCircle extends PapyraiIcon {
  render() { return html`<circle cx="12" cy="12" r="10"></circle>`; }
}
customElements.define('icon-circle', IconCircle);

// IconTriangle - 三角形
import { PapyraiIcon } from './papyrai-icon.js';
export class IconTriangle extends PapyraiIcon {
  render() { return html`<polygon points="12 2 2 22 22 22"></polygon>`; }
}
customElements.define('icon-triangle', IconTriangle);

// IconHexagon - 六边形
import { PapyraiIcon } from './papyrai-icon.js';
export class IconHexagon extends PapyraiIcon {
  render() { return html`<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>`; }
}
customElements.define('icon-hexagon', IconHexagon);

// IconOctagon - 八边形
import { PapyraiIcon } from './papyrai-icon.js';
export class IconOctagon extends PapyraiIcon {
  render() { return html`<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>`; }
}
customElements.define('icon-octagon', IconOctagon);
