// Password Indicator - Password strength meter
// Props: value(String), rules(Object), showRules(Boolean), disabled(Boolean)
// Events: strength-change

import { PapyraiElement, html, css } from '../../core/base.js';

const DEFAULT_RULES = [
  { id: 'length', label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { id: 'lowercase', label: 'Contains lowercase letter', test: (v) => /[a-z]/.test(v) },
  { id: 'uppercase', label: 'Contains uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { id: 'number', label: 'Contains number', test: (v) => /\d/.test(v) },
  { id: 'special', label: 'Contains special character', test: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) }
];

export class PPasswordIndicator extends PapyraiElement {
  static properties = {
    value: { type: String },
    rules: { type: Array },
    showRules: { type: Boolean },
    disabled: { type: Boolean, reflect: true },
    strength: { type: Number }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 8px);
    }

    .strength-bar-container {
      display: flex;
      gap: var(--spacing-xs, 4px);
      height: 6px;
    }

    .strength-segment {
      flex: 1;
      background: var(--paper-border, #d9ccb8);
      border-radius: 3px;
      transition: background 0.2s ease;
    }

    .strength-segment.active.weak {
      background: var(--status-error, #dc2626);
    }

    .strength-segment.active.fair {
      background: var(--status-warning, #f59e0b);
    }

    .strength-segment.active.strong {
      background: var(--status-success, #22c55e);
    }

    .strength-segment.active.very-strong {
      background: var(--accent-green, #10b981);
    }

    :host-context([data-theme="dark"]) .strength-segment {
      background: var(--paper-border-dark, #3d3832);
    }

    :host-context([data-theme="dark"]) .strength-segment.active.weak {
      background: var(--status-error-light, #ef4444);
    }

    :host-context([data-theme="dark"]) .strength-segment.active.fair {
      background: var(--status-warning-light, #fbbf24);
    }

    :host-context([data-theme="dark"]) .strength-segment.active.strong {
      background: var(--status-success-light, #34d399);
    }

    .strength-label {
      font-family: var(--font-serif, serif);
      font-size: 0.85rem;
      font-weight: 500;
      text-align: right;
      transition: color 0.2s ease;
    }

    .strength-label.weak {
      color: var(--status-error, #dc2626);
    }

    .strength-label.fair {
      color: var(--status-warning, #f59e0b);
    }

    .strength-label.strong {
      color: var(--status-success, #22c55e);
    }

    .strength-label.very-strong {
      color: var(--accent-green, #10b981);
    }

    .strength-label.none {
      color: var(--ink-light, #8b8070);
    }

    :host-context([data-theme="dark"]) .strength-label.none {
      color: var(--ink-dark, #6b6050);
    }

    .rules-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs, 4px);
      margin-top: var(--spacing-xs, 4px);
    }

    .rule-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 6px);
      font-family: var(--font-serif, serif);
      font-size: 0.8rem;
      color: var(--ink-light, #8b8070);
      transition: color 0.2s ease;
    }

    .rule-item.valid {
      color: var(--status-success, #22c55e);
    }

    .rule-item.invalid {
      color: var(--ink-light, #8b8070);
    }

    :host-context([data-theme="dark"]) .rule-item {
      color: var(--ink-dark, #6b6050);
    }

    :host-context([data-theme="dark"]) .rule-item.valid {
      color: var(--status-success-light, #34d399);
    }

    .rule-icon {
      width: 14px;
      height: 14px;
      stroke: currentColor;
      stroke-width: 2;
      flex-shrink: 0;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.rules = DEFAULT_RULES;
    this.showRules = true;
    this.disabled = false;
    this.strength = 0;
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this._calculateStrength();
    }
  }

  _calculateStrength() {
    if (!this.value) {
      this.strength = 0;
      this.emit('strength-change', { strength: 0, label: 'none' });
      return;
    }

    const results = this.rules.map(rule => rule.test(this.value));
    const passedCount = results.filter(r => r).length;
    const totalRules = this.rules.length;
    const ratio = passedCount / totalRules;

    let strength = 0;
    if (ratio > 0) strength = 1;
    if (ratio >= 0.4) strength = 2;
    if (ratio >= 0.7) strength = 3;
    if (ratio >= 1) strength = 4;

    // Additional check for length beyond 12 chars
    if (this.value.length >= 12 && strength < 4) {
      strength = Math.min(4, strength + 1);
    }

    this.strength = strength;
    this.emit('strength-change', { 
      strength: this.strength, 
      label: this._getStrengthLabel(this.strength),
      results: this.rules.map((rule, i) => ({
        id: rule.id,
        label: rule.label,
        valid: results[i]
      }))
    });
  }

  _getStrengthLabel(strength) {
    const labels = ['none', 'weak', 'fair', 'strong', 'very-strong'];
    return labels[strength] || 'none';
  }

  _renderRule(rule) {
    const valid = rule.test(this.value);
    return html`
      <div class="rule-item ${valid ? 'valid' : 'invalid'}">
        <svg class="rule-icon" viewBox="0 0 24 24" fill="none">
          ${valid 
            ? html`<path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>`
            : html`<circle cx="12" cy="12" r="10" stroke-dasharray="4 2"/>`
          }
        </svg>
        <span>${rule.label}</span>
      </div>
    `;
  }

  render() {
    const strengthLabel = this._getStrengthLabel(this.strength);
    
    return html`
      <div class="container">
        <div class="strength-bar-container" role="progressbar" aria-valuenow="${this.strength}" aria-valuemin="0" aria-valuemax="4">
          ${[1, 2, 3, 4].map(i => html`
            <div 
              class="strength-segment ${i <= this.strength ? 'active' : ''} ${strengthLabel}"
            ></div>
          `)}
        </div>
        
        <span class="strength-label ${strengthLabel}">
          ${this.strength === 0 ? 'Enter password' : 
            this.strength === 1 ? 'Weak' :
            this.strength === 2 ? 'Fair' :
            this.strength === 3 ? 'Strong' : 'Very Strong'}
        </span>

        ${this.showRules ? html`
          <div class="rules-list">
            ${this.rules.map(rule => this._renderRule(rule))}
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('p-password-indicator', PPasswordIndicator);
