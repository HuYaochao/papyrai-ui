// Toast Component - 便签风格的提示通知
// Features: static show() method, position variants, auto-dismiss, progress bar, swipe dismiss, stacking

import { PapyraiElement, html, css } from '../../core/base.js';

class ToastInstance {
  constructor(options, onClose) {
    this.options = { ...Toast.defaults, ...options };
    this.onClose = onClose;
    this.id = Date.now() + Math.random();
    this.dismissTimer = null;
    this.element = null;
  }

  mount() {
    const container = Toast._getContainer(this.options.position);
    this.element = this._render();
    container.appendChild(this.element);
    this._startDismissTimer();
    return this;
  }

  _render() {
    const el = document.createElement('div');
    el.className = `toast-item toast-${this.options.type} toast-${this.options.position}`;
    el.setAttribute('role', 'alert');
    el.innerHTML = `
      <div class="toast-icon">${this._getIcon()}</div>
      <div class="toast-content">
        ${this.options.title ? `<div class="toast-title">${this.options.title}</div>` : ''}
        <div class="toast-message">${this.options.message}</div>
      </div>
      <button class="toast-close" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      ${this.options.duration > 0 ? `<div class="toast-progress"><div class="toast-progress-bar"></div></div>` : ''}
    `;

    el.querySelector('.toast-close').addEventListener('click', () => this.close());
    
    if (this.options.dismissible) {
      let startX = 0;
      el.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
      el.addEventListener('touchend', (e) => {
        const deltaX = e.changedTouches[0].clientX - startX;
        if (Math.abs(deltaX) > 50) this.close();
      });
    }

    // Inject styles if not already
    if (!document.getElementById('papyrai-toast-styles')) {
      const style = document.createElement('style');
      style.id = 'papyrai-toast-styles';
      style.textContent = Toast.styles;
      document.head.appendChild(style);
    }

    return el;
  }

  _getIcon() {
    const icons = {
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
    };
    return icons[this.options.type] || icons.info;
  }

  _startDismissTimer() {
    if (this.options.duration > 0) {
      this.dismissTimer = setTimeout(() => this.close(), this.options.duration);
      const progressBar = this.element?.querySelector('.toast-progress-bar');
      if (progressBar) {
        progressBar.style.transition = `width ${this.options.duration}ms linear`;
        requestAnimationFrame(() => {
          progressBar.style.width = '0%';
        });
      }
    }
  }

  close() {
    if (this.dismissTimer) clearTimeout(this.dismissTimer);
    if (this.element) {
      this.element.classList.add('toast-exit');
      setTimeout(() => {
        this.element?.remove();
        this.onClose?.();
      }, 200);
    }
  }
}

export class PToast extends PapyraiElement {
  static properties = {
    position: { type: String },
    duration: { type: Number },
    maxCount: { type: Number },
    dismissible: { type: Boolean }
  };

  static defaults = {
    position: 'top-right',
    duration: 4000,
    maxCount: 5,
    dismissible: true
  };

  static styles = `
    .toast-container {
      position: fixed;
      z-index: 2000;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-md, 16px);
      max-width: 380px;
      width: 100%;
      pointer-events: none;
    }

    .toast-container.top-right { top: 0; right: 0; align-items: flex-end; }
    .toast-container.top-left { top: 0; left: 0; align-items: flex-start; }
    .toast-container.bottom-right { bottom: 0; right: 0; align-items: flex-end; }
    .toast-container.bottom-left { bottom: 0; left: 0; align-items: flex-start; }
    .toast-container.top-center { top: 0; left: 50%; transform: translateX(-50%); align-items: center; }
    .toast-container.bottom-center { bottom: 0; left: 50%; transform: translateX(-50%); align-items: center; }

    .toast-item {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm, 12px);
      padding: var(--spacing-md, 16px);
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,0.12));
      font-family: var(--font-serif, serif);
      color: var(--ink-black, #1f1a15);
      pointer-events: auto;
      position: relative;
      overflow: hidden;
      animation: toastIn 0.2s ease;
    }

    [data-theme="dark"] .toast-item {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
      color: var(--paper-white, #f5f0e8);
    }

    .toast-exit {
      animation: toastOut 0.2s ease forwards;
    }

    @keyframes toastIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes toastOut {
      from { opacity: 1; transform: translateX(0); }
      to { opacity: 0; transform: translateX(20px); }
    }

    .toast-item.toast-info { border-left: 4px solid var(--accent-blue, #3b82f6); }
    .toast-item.toast-success { border-left: 4px solid var(--accent-green, #22c55e); }
    .toast-item.toast-warning { border-left: 4px solid var(--accent-amber, #f59e0b); }
    .toast-item.toast-error { border-left: 4px solid var(--accent-red, #ef4444); }

    .toast-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }

    .toast-icon svg {
      width: 100%;
      height: 100%;
    }

    .toast-info .toast-icon { color: var(--accent-blue, #3b82f6); }
    .toast-success .toast-icon { color: var(--accent-green, #22c55e); }
    .toast-warning .toast-icon { color: var(--accent-amber, #f59e0b); }
    .toast-error .toast-icon { color: var(--accent-red, #ef4444); }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-title {
      font-weight: 600;
      margin-bottom: 2px;
    }

    .toast-message {
      font-size: 0.9rem;
      opacity: 0.85;
    }

    .toast-close {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--ink-faint, #9a9590);
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm, 4px);
      transition: color 0.15s, background 0.15s;
    }

    .toast-close:hover {
      color: var(--ink-black, #1f1a15);
      background: var(--ink-faint, #e8e5e0);
    }

    .toast-close svg {
      width: 14px;
      height: 14px;
    }

    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--ink-faint, #e8e5e0);
    }

    .toast-progress-bar {
      height: 100%;
      width: 100%;
      background: var(--accent-blue, #3b82f6);
    }

    .toast-info .toast-progress-bar { background: var(--accent-blue, #3b82f6); }
    .toast-success .toast-progress-bar { background: var(--accent-green, #22c55e); }
    .toast-warning .toast-progress-bar { background: var(--accent-amber, #f59e0b); }
    .toast-error .toast-progress-bar { background: var(--accent-red, #ef4444); }
  `;

  constructor() {
    super();
    this.position = 'top-right';
    this.duration = 4000;
    this.maxCount = 5;
    this.dismissible = true;
  }

  static show(options) {
    const mergedOptions = { ...PToast.defaults, ...options };
    const toast = new ToastInstance(mergedOptions, () => {
      PToast._removeFromQueue(toast);
    });
    PToast._addToQueue(toast);
    return toast;
  }

  static _containers = new Map();
  static _queue = [];
  static _maxCount = 5;

  static _getContainer(position) {
    if (!this._containers.has(position)) {
      const container = document.createElement('div');
      container.className = `toast-container ${position}`;
      document.body.appendChild(container);
      this._containers.set(position, container);
    }
    return this._containers.get(position);
  }

  static _addToQueue(toast) {
    this._queue.push(toast);
    this._enforceMaxCount();
    toast.mount();
  }

  static _removeFromQueue(toast) {
    const idx = this._queue.indexOf(toast);
    if (idx > -1) this._queue.splice(idx, 1);
  }

  static _enforceMaxCount() {
    while (this._queue.length > this._maxCount) {
      const oldest = this._queue[0];
      oldest?.close();
    }
  }

  static setDefaults(options) {
    Object.assign(PToast.defaults, options);
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('p-toast', PToast);
