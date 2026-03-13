// Tour - 步骤式产品导览
// Features: 步骤高亮目标元素, 弹出提示, 上一步/下一步/跳过, 遮罩

import { PapyraiElement, html, css } from '../../core/base.js';

export class PTour extends PapyraiElement {
  static properties = {
    steps: { type: Array },
    currentStep: { type: Number },
    open: { type: Boolean, reflect: true },
    showProgress: { type: Boolean },
    showSkip: { type: Boolean }
  };

  static styles = css`
    :host {
      display: contents;
    }

    .tour-backdrop {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
    }

    .tour-highlight {
      position: absolute;
      border: 2px solid var(--accent-red, #c4453c);
      border-radius: var(--radius-md, 8px);
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
      pointer-events: none;
      transition: all 0.3s ease;
      z-index: 10000;
    }

    .tour-popover {
      position: absolute;
      z-index: 10001;
      width: 320px;
      max-width: 90vw;
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-lg, 12px);
      box-shadow: var(--elevation-3, 0 12px 32px rgba(0, 0, 0, 0.2));
      overflow: hidden;
      transition: all 0.3s ease;
    }

    :host([dark]) .tour-popover {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    /* Paper texture */
    .tour-popover::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
    }

    .tour-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-md, 16px);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    :host([dark]) .tour-header {
      border-color: var(--ink-faint, #5a5550);
    }

    .tour-step-count {
      font-size: 0.75rem;
      font-family: var(--font-mono, monospace);
      color: var(--ink-faint, #9a9590);
    }

    .tour-close {
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm, 4px);
      color: var(--ink-faint, #9a9590);
      transition: all 0.15s ease;
    }

    .tour-close:hover {
      background: var(--ink-faint, #e8e5e0);
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .tour-close:hover {
      background: var(--ink-dark, #4a4540);
      color: var(--paper-white, #f5f0e8);
    }

    .tour-body {
      padding: var(--spacing-md, 16px);
    }

    .tour-title {
      font-family: var(--font-serif, serif);
      font-size: 1rem;
      font-weight: 600;
      color: var(--ink-black, #1f1a15);
      margin: 0 0 var(--spacing-sm, 8px) 0;
    }

    :host([dark]) .tour-title {
      color: var(--paper-white, #f5f0e8);
    }

    .tour-content {
      font-family: var(--font-serif, serif);
      font-size: 0.875rem;
      color: var(--ink-black, #1f1a15);
      line-height: 1.5;
    }

    :host([dark]) .tour-content {
      color: var(--paper-white, #f5f0e8);
    }

    .tour-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-sm, 8px) var(--spacing-md, 16px);
      border-top: 1px solid var(--paper-border, #d9ccb8);
    }

    :host([dark]) .tour-footer {
      border-color: var(--ink-faint, #5a5550);
    }

    .tour-progress {
      display: flex;
      gap: var(--spacing-xs, 4px);
    }

    .tour-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--ink-faint, #d9d5d0);
      transition: background 0.15s ease;
    }

    .tour-dot.active {
      background: var(--accent-red, #c4453c);
    }

    .tour-actions {
      display: flex;
      gap: var(--spacing-sm, 8px);
    }

    .tour-btn {
      padding: var(--spacing-xs, 6px) var(--spacing-sm, 12px);
      border: 1px solid var(--paper-border, #d9ccb8);
      background: var(--paper-cream, #f8f1e5);
      border-radius: var(--radius-sm, 6px);
      font-family: var(--font-serif, serif);
      font-size: 0.8rem;
      color: var(--ink-black, #1f1a15);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .tour-btn:hover {
      background: var(--ink-faint, #e8e5e0);
    }

    :host([dark]) .tour-btn {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
      color: var(--paper-white, #f5f0e8);
    }

    :host([dark]) .tour-btn:hover {
      background: var(--ink-dark, #4a4540);
    }

    .tour-btn.primary {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
      color: white;
    }

    .tour-btn.primary:hover {
      background: #a33a33;
      border-color: #a33a33;
    }

    .tour-btn.skip {
      color: var(--ink-faint, #9a9590);
      background: transparent;
      border-color: transparent;
    }

    .tour-btn.skip:hover {
      color: var(--ink-black, #1f1a15);
      background: var(--ink-faint, #e8e5e0);
    }

    :host([dark]) .tour-btn.skip:hover {
      color: var(--paper-white, #f5f0e8);
      background: var(--ink-dark, #4a4540);
    }
  `;

  constructor() {
    super();
    this.steps = [];
    this.currentStep = 0;
    this.open = false;
    this.showProgress = true;
    this.showSkip = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleKeydown = this._handleKeydown.bind(this);
    document.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeydown);
  }

  updated(changedProperties) {
    if (changedProperties.has('currentStep') || changedProperties.has('open')) {
      if (this.open && this.steps[this.currentStep]) {
        this._positionPopover();
      }
    }
  }

  _handleKeydown(e) {
    if (!this.open) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.next();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.prev();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }
  }

  _positionPopover() {
    requestAnimationFrame(() => {
      const step = this.steps[this.currentStep];
      if (!step || !step.target) return;

      const targetEl = document.querySelector(step.target);
      if (!targetEl) return;

      const rect = targetEl.getBoundingClientRect();
      const popover = this.shadowRoot?.querySelector('.tour-popover');
      if (!popover) return;

      const popoverRect = popover.getBoundingClientRect();
      let top = rect.bottom + 12;
      let left = rect.left;

      if (left + popoverRect.width > window.innerWidth - 20) {
        left = window.innerWidth - popoverRect.width - 20;
      }

      if (top + popoverRect.height > window.innerHeight - 20) {
        top = rect.top - popoverRect.height - 12;
      }

      popover.style.top = `${top}px`;
      popover.style.left = `${left}px`;

      const highlight = this.shadowRoot?.querySelector('.tour-highlight');
      if (highlight) {
        highlight.style.top = `${rect.top - 4}px`;
        highlight.style.left = `${rect.left - 4}px`;
        highlight.style.width = `${rect.width + 8}px`;
        highlight.style.height = `${rect.height + 8}px`;
      }
    });
  }

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.emit('step-change', { step: this.currentStep, total: this.steps.length });
    } else {
      this.complete();
    }
  }

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.emit('step-change', { step: this.currentStep, total: this.steps.length });
    }
  }

  skip() {
    this.emit('skip', { step: this.currentStep });
    this.close();
  }

  complete() {
    this.emit('complete', { totalSteps: this.steps.length });
    this.close();
  }

  start() {
    this.currentStep = 0;
    this.open = true;
    this.emit('start');
  }

  close() {
    this.open = false;
    this.emit('close');
  }

  render() {
    if (!this.open) return html``;

    const step = this.steps[this.currentStep];
    if (!step) return html``;

    return html`
      <div class="tour-backdrop"></div>
      <div class="tour-highlight"></div>
      <div class="tour-popover">
        <header class="tour-header">
          <span class="tour-step-count">${this.currentStep + 1} / ${this.steps.length}</span>
          <button class="tour-close" @click=${this.close} aria-label="Close tour">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>
        <div class="tour-body">
          <h3 class="tour-title">${step.title}</h3>
          <p class="tour-content">${step.content}</p>
        </div>
        <footer class="tour-footer">
          <div class="tour-progress">
            ${this.showProgress ? this.steps.map((_, i) => html`
              <div class="tour-dot" ?active=${i === this.currentStep}></div>
            `) : ''}
          </div>
          <div class="tour-actions">
            ${this.showSkip ? html`
              <button class="tour-btn skip" @click=${this.skip}>Skip</button>
            ` : ''}
            ${this.currentStep > 0 ? html`
              <button class="tour-btn" @click=${this.prev}>Back</button>
            ` : ''}
            <button class="tour-btn primary" @click=${this.next}>
              ${this.currentStep === this.steps.length - 1 ? 'Done' : 'Next'}
            </button>
          </div>
        </footer>
      </div>
    `;
  }
}

customElements.define('p-tour', PTour);
