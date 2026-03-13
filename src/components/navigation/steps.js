// Steps - 纸张风格步骤条
// 属性: current(Number), status(String: 'wait'|'process'|'finish'|'error'), 
//       direction(String: 'horizontal'|'vertical'), clickable(Boolean)
// 插槽: default(包含p-step-item元素)
// 事件: change({current})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PSteps extends PapyraiElement {
  static properties = {
    current: { type: Number },
    status: { type: String },
    direction: { type: String },
    clickable: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .steps {
      display: flex;
    }

    :host([direction="vertical"]) .steps {
      flex-direction: column;
    }

    /* Horizontal line */
    :host(:not([direction="vertical"])) .step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 16px;
      left: calc(50% + 20px);
      width: calc(100% - 40px);
      height: 2px;
      background: var(--paper-border, #d9ccb8);
    }

    :host(:not([direction="vertical"])) .step.finish::after,
    :host(:not([direction="vertical"])) .step.process::after {
      background: var(--accent-red, #c4453c);
    }

    /* Vertical line */
    :host([direction="vertical"]) .step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 40px;
      left: 16px;
      width: 2px;
      height: calc(100% - 40px);
      background: var(--paper-border, #d9ccb8);
    }

    :host([direction="vertical"]) .step.finish::after,
    :host([direction="vertical"]) .step.process::after {
      background: var(--accent-red, #c4453c);
    }

    .step {
      position: relative;
      flex: 1;
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm, 8px);
      cursor: default;
    }

    :host([clickable]) .step {
      cursor: pointer;
    }

    .step-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 2px solid var(--paper-border, #d9ccb8);
      border-radius: 50%;
      background: var(--paper-white, #fffef8);
      font-family: var(--font-mono, monospace);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--ink-faint, #999);
      flex-shrink: 0;
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;
    }

    .step.finish .step-icon {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
      color: #fff;
    }

    .step.process .step-icon {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
      color: #fff;
    }

    .step.error .step-icon {
      background: var(--status-error, #dc2626);
      border-color: var(--status-error, #dc2626);
      color: #fff;
    }

    .step.wait .step-icon {
      color: var(--ink-faint, #999);
    }

    .step-content {
      flex: 1;
      padding-top: 4px;
    }

    .step-title {
      font-family: var(--font-serif, serif);
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--ink-black, #1f1a15);
    }

    .step.finish .step-title {
      color: var(--accent-red, #c4453c);
    }

    .step.error .step-title {
      color: var(--status-error, #dc2626);
    }

    .step-description {
      font-family: var(--font-mono, monospace);
      font-size: 0.8rem;
      color: var(--ink-faint, #999);
      margin-top: 2px;
    }

    :host([direction="vertical"]) .step {
      padding-bottom: var(--spacing-md, 16px);
    }
  `;

  constructor() {
    super();
    this.current = 0;
    this.status = 'process';
    this.direction = 'horizontal';
    this.clickable = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'navigation');
    this.addEventListener('click', this._handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    super.disconnectedCallback();
  }

  _getStepStatus(index) {
    if (index < this.current) return 'finish';
    if (index === this.current) return this.status || 'process';
    return 'wait';
  }

  _handleClick = (e) => {
    if (!this.clickable) return;
    const step = e.target.closest('.step');
    if (!step) return;
    const index = parseInt(step.dataset.index);
    if (index < this.current) {
      this.current = index;
      this.emit('change', { current: this.current });
    }
  };

  render() {
    const items = this._getStepItems();
    return html`
      <div class="steps">
        ${items.map((item, index) => html`
          <div 
            class="step ${this._getStepStatus(index)}"
            data-index="${index}"
          >
            <div class="step-icon">
              ${this._getStepStatus(index) === 'finish' ? html`
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              ` : this._getStepStatus(index) === 'error' ? html`
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              ` : index + 1}
            </div>
            <div class="step-content">
              <div class="step-title">${item.title}</div>
              ${item.description ? html`<div class="step-description">${item.description}</div>` : ''}
            </div>
          </div>
        `)}
      </div>
    `;
  }

  _getStepItems() {
    const slot = this.shadowRoot.querySelector('slot');
    if (!slot) return [];
    return Array.from(slot.assignedElements()).filter(el => el.tagName.toLowerCase() === 'p-step-item');
  }
}

export class PStepItem extends PapyraiElement {
  static properties = {
    title: { type: String },
    description: { type: String }
  };

  static styles = css`
    :host {
      display: none;
    }
  `;

  constructor() {
    super();
    this.title = '';
    this.description = '';
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('p-steps', PSteps);
customElements.define('p-step-item', PStepItem);
