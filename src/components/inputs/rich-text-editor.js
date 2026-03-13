// Rich Text Editor - Basic WYSIWYG editor
// Props: value(String), placeholder(String), disabled(Boolean), readonly(Boolean)
// Events: change, input

import { PapyraiElement, html, css } from '../../core/base.js';

export class PRichTextEditor extends PapyraiElement {
  static properties = {
    value: { type: String },
    placeholder: { type: String },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
    }

    .editor-container {
      display: flex;
      flex-direction: column;
      border: 2px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      overflow: hidden;
      background: var(--paper-white, #fffef8);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      transition: border-color 0.2s ease;
    }

    .editor-container:focus-within {
      border-color: var(--accent-red, #c4453c);
      box-shadow: var(--elevation-2, 0 6px 14px rgba(0,0,0,.14));
    }

    :host([disabled]) .editor-container {
      opacity: 0.55;
      pointer-events: none;
    }

    :host-context([data-theme="dark"]) .editor-container {
      background: var(--paper-dark, #1a1815);
      border-color: var(--paper-border-dark, #3d3832);
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs, 4px);
      padding: var(--spacing-sm, 8px);
      background: var(--paper-cream, #f8f1e5);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    :host-context([data-theme="dark"]) .toolbar {
      background: var(--paper-dark-alt, #252220);
      border-color: var(--paper-border-dark, #3d3832);
    }

    .toolbar-group {
      display: flex;
      gap: 2px;
    }

    .toolbar-divider {
      width: 1px;
      height: 24px;
      background: var(--paper-border, #d9ccb8);
      margin: 0 var(--spacing-xs, 4px);
    }

    :host-context([data-theme="dark"]) .toolbar-divider {
      background: var(--paper-border-dark, #3d3832);
    }

    .toolbar-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: var(--radius-sm, 6px);
      cursor: pointer;
      color: var(--ink-black, #1f1a15);
      transition: all 0.15s ease;
    }

    .toolbar-btn:hover {
      background: var(--paper-white, #fffef8);
    }

    .toolbar-btn.active {
      background: var(--accent-red, #c4453c);
      color: white;
    }

    .toolbar-btn svg {
      width: 18px;
      height: 18px;
      stroke: currentColor;
      stroke-width: 1.5;
    }

    :host-context([data-theme="dark"]) .toolbar-btn {
      color: var(--ink-white, #f5f0e8);
    }

    :host-context([data-theme="dark"]) .toolbar-btn:hover {
      background: var(--paper-dark, #1a1815);
    }

    .editor-content {
      min-height: 150px;
      max-height: 400px;
      overflow-y: auto;
      padding: var(--spacing-md, 14px);
      outline: none;
      font-family: var(--font-serif, serif);
      font-size: 1rem;
      line-height: 1.6;
      color: var(--ink-black, #1f1a15);
    }

    .editor-content:empty::before {
      content: attr(data-placeholder);
      color: var(--ink-light, #8b8070);
      pointer-events: none;
    }

    .editor-content ul, .editor-content ol {
      padding-left: 24px;
    }

    .editor-content a {
      color: var(--accent-red, #c4453c);
      text-decoration: underline;
    }

    :host-context([data-theme="dark"]) .editor-content {
      color: var(--ink-white, #f5f0e8);
    }

    :host-context([data-theme="dark"]) .editor-content a {
      color: var(--accent-red-dark, #e55b50);
    }

    /* Link dialog */
    .link-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: var(--spacing-md, 16px);
      background: var(--paper-white, #fffef8);
      border: 2px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      box-shadow: var(--elevation-3, 0 12px 24px rgba(0,0,0,.2));
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 8px);
      min-width: 300px;
    }

    :host-context([data-theme="dark"]) .link-dialog {
      background: var(--paper-dark, #1a1815);
      border-color: var(--paper-border-dark, #3d3832);
    }

    .link-dialog input {
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      border: 2px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 6px);
      font-family: var(--font-serif, serif);
      font-size: 0.95rem;
      background: var(--paper-white, #fffef8);
      color: var(--ink-black, #1f1a15);
    }

    :host-context([data-theme="dark"]) .link-dialog input {
      background: var(--paper-dark-alt, #252220);
      border-color: var(--paper-border-dark, #3d3832);
      color: var(--ink-white, #f5f0e8);
    }

    .link-dialog-buttons {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-sm, 8px);
    }

    .dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 999;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.placeholder = 'Start typing...';
    this.disabled = false;
    this.readonly = false;
    this._showLinkDialog = false;
    this._linkUrl = '';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _execCommand(command, value = null) {
    document.execCommand(command, false, value);
    this._emitChange();
    this._updateContent();
  }

  _handleBold = () => this._execCommand('bold');
  _handleItalic = () => this._execCommand('italic');
  _handleUnderline = () => this._execCommand('underline');
  _handleStrike = () => this._execCommand('strikeThrough');
  
  _handleBulletList = () => this._execCommand('insertUnorderedList');
  _handleNumberList = () => this._execCommand('insertOrderedList');

  _handleLink = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
      this._linkUrl = '';
      this._showLinkDialog = true;
    }
  };

  _handleLinkConfirm = () => {
    if (this._linkUrl) {
      this._execCommand('createLink', this._linkUrl);
    }
    this._showLinkDialog = false;
    this._linkUrl = '';
  };

  _handleLinkCancel = () => {
    this._showLinkDialog = false;
    this._linkUrl = '';
  };

  _handleInput = () => {
    this._updateContent();
  };

  _handleKeydown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          this._handleBold();
          break;
        case 'i':
          e.preventDefault();
          this._handleItalic();
          break;
        case 'u':
          e.preventDefault();
          this._handleUnderline();
          break;
      }
    }
  };

  _updateContent() {
    const editor = this.shadowRoot.querySelector('.editor-content');
    if (editor) {
      this.value = editor.innerHTML;
    }
  }

  _emitChange() {
    const editor = this.shadowRoot.querySelector('.editor-content');
    if (editor) {
      this.value = editor.innerHTML;
      this.emit('change', { value: this.value });
      this.emit('input', { value: this.value });
    }
  }

  _checkActiveState(command) {
    return document.queryCommandState(command);
  }

  render() {
    return html`
      <div class="editor-container">
        <div class="toolbar" role="toolbar">
          <div class="toolbar-group">
            <button 
              class="toolbar-btn" 
              @click="${this._handleBold}"
              title="Bold (Ctrl+B)"
              aria-label="Bold"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button 
              class="toolbar-btn" 
              @click="${this._handleItalic}"
              title="Italic (Ctrl+I)"
              aria-label="Italic"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <line x1="19" y1="4" x2="10" y2="4" stroke-linecap="round"/>
                <line x1="14" y1="20" x2="5" y2="20" stroke-linecap="round"/>
                <line x1="15" y1="4" x2="9" y2="20" stroke-linecap="round"/>
              </svg>
            </button>
            <button 
              class="toolbar-btn" 
              @click="${this._handleUnderline}"
              title="Underline (Ctrl+U)"
              aria-label="Underline"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="4" y1="21" x2="20" y2="21" stroke-linecap="round"/>
              </svg>
            </button>
            <button 
              class="toolbar-btn" 
              @click="${this._handleStrike}"
              title="Strikethrough"
              aria-label="Strikethrough"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 3.6 3.9" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.7 19.1c2.3.6 4.4 1 6.2.9 2.7 0 5.3-.7 5.3-3.6 0-1.5-1.8-3.3-3.6-3.9" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="4" y1="12" x2="20" y2="12" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <div class="toolbar-divider"></div>
          
          <div class="toolbar-group">
            <button 
              class="toolbar-btn" 
              @click="${this._handleBulletList}"
              title="Bullet List"
              aria-label="Bullet list"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <line x1="9" y1="6" x2="20" y2="6" stroke-linecap="round"/>
                <line x1="9" y1="12" x2="20" y2="12" stroke-linecap="round"/>
                <line x1="9" y1="18" x2="20" y2="18" stroke-linecap="round"/>
                <circle cx="4" cy="6" r="1.5" fill="currentColor"/>
                <circle cx="4" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="4" cy="18" r="1.5" fill="currentColor"/>
              </svg>
            </button>
            <button 
              class="toolbar-btn" 
              @click="${this._handleNumberList}"
              title="Numbered List"
              aria-label="Numbered list"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <line x1="10" y1="6" x2="21" y2="6" stroke-linecap="round"/>
                <line x1="10" y1="12" x2="21" y2="12" stroke-linecap="round"/>
                <line x1="10" y1="18" x2="21" y2="18" stroke-linecap="round"/>
                <text x="3" y="8" font-size="8" fill="currentColor">1</text>
                <text x="3" y="14" font-size="8" fill="currentColor">2</text>
                <text x="3" y="20" font-size="8" fill="currentColor">3</text>
              </svg>
            </button>
          </div>
          
          <div class="toolbar-divider"></div>
          
          <div class="toolbar-group">
            <button 
              class="toolbar-btn" 
              @click="${this._handleLink}"
              title="Insert Link"
              aria-label="Insert link"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div 
          class="editor-content"
          contenteditable="${!this.disabled && !this.readonly}"
          data-placeholder="${this.placeholder}"
          @input="${this._handleInput}"
          @keydown="${this._handleKeydown}"
          role="textbox"
          aria-multiline="true"
          aria-label="${this.placeholder}"
        ></div>
      </div>
      
      ${this._showLinkDialog ? html`
        <div class="dialog-backdrop" @click="${this._handleLinkCancel}"></div>
        <div class="link-dialog">
          <input 
            type="url" 
            placeholder="Enter URL"
            .value="${this._linkUrl}"
            @input="${(e) => this._linkUrl = e.target.value}"
            @keydown="${(e) => e.key === 'Enter' && this._handleLinkConfirm()}"
          />
          <div class="link-dialog-buttons">
            <button class="toolbar-btn" @click="${this._handleLinkCancel}">Cancel</button>
            <button class="toolbar-btn active" @click="${this._handleLinkConfirm}">Insert</button>
          </div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('p-rich-text-editor', PRichTextEditor);
