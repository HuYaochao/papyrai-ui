// papyrai-ui Core Base Class
// All components extend from PapyraiElement

import { LitElement, html, svg, css } from 'lit';
import { tokens, fontFaces } from './tokens.js';

export class PapyraiElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    *, *::before, *::after {
      box-sizing: inherit;
    }
  `;

  constructor() {
    super();
    this._initTheme();
  }

  connectedCallback() {
    super.connectedCallback();
    this._injectTokens();
    this._setupThemeObserver();
  }

  _injectTokens() {
    if (typeof document === 'undefined') return;

    // Inject font faces first
    let fontStyle = document.getElementById('papyrai-fonts');
    if (!fontStyle) {
      fontStyle = document.createElement('style');
      fontStyle.id = 'papyrai-fonts';
      fontStyle.textContent = fontFaces;
      document.head.appendChild(fontStyle);
    }

    // Then inject tokens
    let style = document.getElementById('papyrai-tokens');
    if (!style) {
      style = document.createElement('style');
      style.id = 'papyrai-tokens';
      style.textContent = tokens;
      document.head.appendChild(style);
    }
  }

  _initTheme() {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  _setupThemeObserver() {
    if (typeof MutationObserver === 'undefined') return;
    const observer = new MutationObserver(() => {
      this.requestUpdate();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  // Convenience method to get CSS variable value
  getVar(name) {
    return getComputedStyle(this).getPropertyValue(name).trim();
  }

  // Convenience method to check if dark theme
  get isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  // Emit custom event
  emit(name, detail = {}, options = {}) {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      ...options,
      detail
    }));
  }
}

// Export for convenience
export { html, svg, css };
