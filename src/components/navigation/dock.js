// Dock - macOS风格停靠栏
// Features: 放大效果, 图标插槽, 提示文字

import { PapyraiElement, html, css } from '../../core/base.js';

export class PDock extends PapyraiElement {
  static properties = {
    magnification: { type: Boolean },
    iconSize: { type: Number },
    position: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-serif, serif);
    }

    .dock {
      position: fixed;
      bottom: var(--spacing-sm, 8px);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: flex-end;
      gap: var(--spacing-xs, 4px);
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-lg, 16px);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0, 0, 0, 0.12));
      z-index: 1000;
    }

    :host([position="left"]) .dock {
      left: var(--spacing-sm, 8px);
      transform: none;
    }

    :host([position="right"]) .dock {
      right: var(--spacing-sm, 8px);
      left: auto;
      transform: none;
    }

    :host([dark]) .dock {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .dock-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: transform 0.15s ease;
      position: relative;
    }

    .dock-item:hover {
      transform: translateY(-8px) scale(1.2);
    }

    .dock-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md, 10px);
      background: var(--ink-faint, #e8e5e0);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: width 0.15s ease, height 0.15s ease;
    }

    :host([dark]) .dock-icon {
      background: var(--ink-dark, #4a4540);
    }

    .dock-item:hover .dock-icon {
      width: 56px;
      height: 56px;
    }

    .dock-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
      background: var(--ink-black, #1f1a15);
      color: var(--paper-white, #f5f0e8);
      font-size: 0.75rem;
      border-radius: var(--radius-sm, 4px);
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease;
      margin-bottom: var(--spacing-xs, 4px);
    }

    .dock-item:hover .dock-tooltip {
      opacity: 1;
    }

    :host([magnification]) .dock-item:hover {
      transform: translateY(-20px) scale(1.5);
    }

    :host([magnification]) .dock-item:hover .dock-icon {
      width: 64px;
      height: 64px;
    }
  `;

  constructor() {
    super();
    this.magnification = true;
    this.iconSize = 48;
    this.position = 'bottom';
  }

  render() {
    return html`
      <div class="dock">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('p-dock', PDock);
