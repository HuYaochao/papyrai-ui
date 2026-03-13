// File Input - File upload with drag-and-drop
// Props: accept(String), multiple(Boolean), maxSize(Number), disabled(Boolean), label(String)
// Events: change, select, remove

import { PapyraiElement, html, css } from '../../core/base.js';

export class PFileInput extends PapyraiElement {
  static properties = {
    accept: { type: String },
    multiple: { type: Boolean, reflect: true },
    maxSize: { type: Number },
    disabled: { type: Boolean, reflect: true },
    label: { type: String },
    files: { type: Array },
    dragover: { type: Boolean }
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
    }

    .file-input-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm, 8px);
    }

    .dropzone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-lg, 24px);
      border: 2px dashed var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      background: var(--paper-white, #fffef8);
      cursor: pointer;
      transition: all 0.2s ease;
      min-height: 120px;
    }

    .dropzone:hover, .dropzone.dragover {
      border-color: var(--accent-red, #c4453c);
      background: var(--paper-cream, #f8f1e5);
    }

    :host([disabled]) .dropzone {
      opacity: 0.55;
      cursor: not-allowed;
      pointer-events: none;
    }

    :host-context([data-theme="dark"]) .dropzone {
      background: var(--paper-dark, #1a1815);
      border-color: var(--paper-border-dark, #3d3832);
    }

    :host-context([data-theme="dark"]) .dropzone:hover, 
    :host-context([data-theme="dark"]) .dropzone.dragover {
      background: var(--paper-dark-alt, #252220);
    }

    .dropzone-icon {
      width: 48px;
      height: 48px;
      color: var(--ink-light, #8b8070);
    }

    .dropzone-icon svg {
      width: 100%;
      height: 100%;
      stroke: currentColor;
      stroke-width: 1.5;
    }

    .dropzone-text {
      font-family: var(--font-serif, serif);
      font-size: 0.95rem;
      color: var(--ink-black, #1f1a15);
      text-align: center;
    }

    .dropzone-text span {
      color: var(--accent-red, #c4453c);
    }

    :host-context([data-theme="dark"]) .dropzone-text {
      color: var(--ink-white, #f5f0e8);
    }

    .file-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs, 6px);
    }

    .file-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px) var(--spacing-md, 12px);
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 6px);
      transition: all 0.2s ease;
    }

    :host-context([data-theme="dark"]) .file-item {
      background: var(--paper-dark-alt, #252220);
      border-color: var(--paper-border-dark, #3d3832);
    }

    .file-icon {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--paper-white, #fffef8);
      border-radius: var(--radius-sm, 6px);
      color: var(--accent-red, #c4453c);
    }

    .file-icon svg {
      width: 18px;
      height: 18px;
      stroke: currentColor;
      stroke-width: 1.5;
    }

    :host-context([data-theme="dark"]) .file-icon {
      background: var(--paper-dark, #1a1815);
    }

    .file-info {
      flex: 1;
      min-width: 0;
    }

    .file-name {
      font-family: var(--font-serif, serif);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .file-size {
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      color: var(--ink-light, #8b8070);
    }

    :host-context([data-theme="dark"]) .file-name {
      color: var(--ink-white, #f5f0e8);
    }

    .file-remove {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--ink-light, #8b8070);
      transition: all 0.15s ease;
      flex-shrink: 0;
    }

    .file-remove:hover {
      background: var(--status-error, #dc2626);
      color: white;
    }

    .file-remove svg {
      width: 14px;
      height: 14px;
      stroke: currentColor;
      stroke-width: 2;
    }

    input[type="file"] {
      display: none;
    }
  `;

  constructor() {
    super();
    this.accept = '';
    this.multiple = false;
    this.maxSize = 10 * 1024 * 1024; // 10MB default
    this.disabled = false;
    this.label = 'Drop files here or click to browse';
    this.files = [];
    this.dragover = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _handleDragOver(e) {
    e.preventDefault();
    if (!this.disabled) {
      this.dragover = true;
    }
  }

  _handleDragLeave() {
    this.dragover = false;
  }

  _handleDrop(e) {
    e.preventDefault();
    this.dragover = false;
    if (this.disabled) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    this._processFiles(droppedFiles);
  }

  _handleClick() {
    if (!this.disabled) {
      const input = this.shadowRoot.querySelector('input[type="file"]');
      input?.click();
    }
  }

  _handleInputChange(e) {
    const selectedFiles = Array.from(e.target.files);
    this._processFiles(selectedFiles);
    // Reset input to allow selecting same file again
    e.target.value = '';
  }

  _processFiles(newFiles) {
    let validFiles = [];
    
    for (const file of newFiles) {
      if (this.accept) {
        const acceptTypes = this.accept.split(',').map(t => t.trim());
        const fileType = file.type;
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        const matches = acceptTypes.some(type => {
          if (type.startsWith('.')) return ext === type.toLowerCase();
          if (type.includes('/')) return fileType.includes(type.split('/')[0]);
          return true;
        });
        if (!matches) continue;
      }
      
      if (this.maxSize && file.size > this.maxSize) continue;
      
      validFiles.push(file);
    }
    
    if (this.multiple) {
      this.files = [...this.files, ...validFiles];
    } else {
      this.files = validFiles.slice(0, 1);
    }
    
    this.emit('change', { files: this.files });
    this.emit('select', { files: validFiles });
  }

  _removeFile(index) {
    const removed = this.files[index];
    this.files = this.files.filter((_, i) => i !== index);
    this.emit('change', { files: this.files });
    this.emit('remove', { file: removed, index });
  }

  _formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  _getFileIcon() {
    return html`
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="14,2 14,8 20,8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  render() {
    return html`
      <div class="file-input-container">
        <div 
          class="dropzone ${this.dragover ? 'dragover' : ''}"
          @click="${this._handleClick}"
          @dragover="${this._handleDragOver}"
          @dragleave="${this._handleDragLeave}"
          @drop="${this._handleDrop}"
          role="button"
          tabindex="${this.disabled ? -1 : 0}"
          aria-label="${this.label}"
        >
          <div class="dropzone-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="dropzone-text">
            <span>${this.label}</span>
          </div>
        </div>
        
        <input 
          type="file" 
          accept="${this.accept}"
          ?multiple="${this.multiple}"
          ?disabled="${this.disabled}"
          @change="${this._handleInputChange}"
        />
        
        ${this.files.length > 0 ? html`
          <div class="file-list" role="list">
            ${this.files.map((file, index) => html`
              <div class="file-item" role="listitem">
                <div class="file-icon">
                  ${this._getFileIcon()}
                </div>
                <div class="file-info">
                  <div class="file-name">${file.name}</div>
                  <div class="file-size">${this._formatSize(file.size)}</div>
                </div>
                <button 
                  class="file-remove" 
                  @click="${() => this._removeFile(index)}"
                  aria-label="Remove ${file.name}"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('p-file-input', PFileInput);
