// AI Diff - AI 红笔批改风格 (Myers diff algorithm)
// 属性: before(String), after(String), mode('inline'|'side-by-side'), language(String)

import { PapyraiElement, html, css } from '../core/base.js';

// ============================================================
// Myers diff algorithm — O((N+M)D) for line-level diffing
// ============================================================

function myersDiff(a, b) {
  const N = a.length;
  const M = b.length;
  const MAX = N + M;

  if (MAX === 0) return [];

  // Fast path: identical
  if (N === M) {
    let same = true;
    for (let i = 0; i < N; i++) {
      if (a[i] !== b[i]) { same = false; break; }
    }
    if (same) return a.map(line => ({ type: 'equal', value: line }));
  }

  // Fast path: one side empty
  if (N === 0) return b.map(line => ({ type: 'insert', value: line }));
  if (M === 0) return a.map(line => ({ type: 'delete', value: line }));

  // Myers shortest edit script
  const vSize = 2 * MAX + 1;
  const v = new Int32Array(vSize);
  v.fill(-1);
  const trace = [];

  for (let d = 0; d <= MAX; d++) {
    const snapshot = new Int32Array(vSize);
    snapshot.set(v);
    trace.push(snapshot);

    for (let k = -d; k <= d; k += 2) {
      const kIdx = k + MAX;
      let x;
      if (k === -d || (k !== d && v[kIdx - 1] < v[kIdx + 1])) {
        x = v[kIdx + 1]; // move down
      } else {
        x = v[kIdx - 1] + 1; // move right
      }
      let y = x - k;

      // Follow diagonal (equal elements)
      while (x < N && y < M && a[x] === b[y]) {
        x++;
        y++;
      }

      v[kIdx] = x;

      if (x >= N && y >= M) {
        // Backtrack to build edit script
        return backtrack(trace, a, b, d, MAX);
      }
    }
  }

  // Should not reach here
  return a.map(line => ({ type: 'delete', value: line }))
    .concat(b.map(line => ({ type: 'insert', value: line })));
}

function backtrack(trace, a, b, dFinal, MAX) {
  const edits = [];
  let x = a.length;
  let y = b.length;

  for (let d = dFinal; d > 0; d--) {
    const v = trace[d - 1];
    const k = x - y;
    const kIdx = k + MAX;

    let prevK;
    if (k === -d || (k !== d && v[kIdx - 1] < v[kIdx + 1])) {
      prevK = k + 1; // came from down
    } else {
      prevK = k - 1; // came from right
    }

    const prevX = v[prevK + MAX];
    const prevY = prevX - prevK;

    // Diagonal moves (equal)
    while (x > prevX + (prevK < k ? 1 : 0) && y > prevY + (prevK >= k ? 1 : 0)) {
      x--;
      y--;
      edits.push({ type: 'equal', value: a[x] });
    }

    if (d > 0) {
      if (prevK < k) {
        // Right move = delete from a
        x--;
        edits.push({ type: 'delete', value: a[x] });
      } else {
        // Down move = insert from b
        y--;
        edits.push({ type: 'insert', value: b[y] });
      }
    }
  }

  // Remaining diagonal
  while (x > 0 && y > 0) {
    x--;
    y--;
    edits.push({ type: 'equal', value: a[x] });
  }

  edits.reverse();
  return edits;
}

// ============================================================
// Character-level diff within a changed line pair
// ============================================================

function charDiff(oldStr, newStr) {
  const oldChars = [...oldStr];
  const newChars = [...newStr];
  return myersDiff(oldChars, newChars);
}

// Group consecutive delete+insert pairs for char-level diffing
function groupEdits(edits) {
  const groups = [];
  let i = 0;
  while (i < edits.length) {
    if (edits[i].type === 'equal') {
      groups.push(edits[i]);
      i++;
    } else {
      // Collect consecutive deletes then inserts
      const deletes = [];
      const inserts = [];
      while (i < edits.length && edits[i].type === 'delete') {
        deletes.push(edits[i]);
        i++;
      }
      while (i < edits.length && edits[i].type === 'insert') {
        inserts.push(edits[i]);
        i++;
      }
      // Pair them up for char-level diffing
      const maxPairs = Math.min(deletes.length, inserts.length);
      for (let j = 0; j < maxPairs; j++) {
        const chars = charDiff(deletes[j].value, inserts[j].value);
        groups.push({
          type: 'changed',
          oldValue: deletes[j].value,
          newValue: inserts[j].value,
          charDiff: chars
        });
      }
      // Remaining unpaired
      for (let j = maxPairs; j < deletes.length; j++) {
        groups.push(deletes[j]);
      }
      for (let j = maxPairs; j < inserts.length; j++) {
        groups.push(inserts[j]);
      }
    }
  }
  return groups;
}

// ============================================================
// Simple syntax token classification for code highlighting
// ============================================================

const KEYWORDS = new Set([
  // JS/TS
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'class', 'extends', 'import', 'export', 'from', 'default', 'new', 'this',
  'async', 'await', 'try', 'catch', 'throw', 'switch', 'case', 'break',
  'continue', 'typeof', 'instanceof', 'in', 'of', 'yield', 'static',
  // Python
  'def', 'class', 'import', 'from', 'return', 'if', 'elif', 'else', 'for',
  'while', 'try', 'except', 'finally', 'raise', 'with', 'as', 'pass',
  'lambda', 'yield', 'and', 'or', 'not', 'is', 'True', 'False', 'None',
  // General
  'true', 'false', 'null', 'undefined', 'void', 'super', 'delete',
]);

function tokenizeLine(line) {
  const tokens = [];
  let i = 0;
  while (i < line.length) {
    // Whitespace
    if (/\s/.test(line[i])) {
      let j = i;
      while (j < line.length && /\s/.test(line[j])) j++;
      tokens.push({ type: 'text', value: line.slice(i, j) });
      i = j;
      continue;
    }
    // String (single or double quote)
    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++;
        j++;
      }
      if (j < line.length) j++;
      tokens.push({ type: 'string', value: line.slice(i, j) });
      i = j;
      continue;
    }
    // Template literal
    if (line[i] === '`') {
      let j = i + 1;
      while (j < line.length && line[j] !== '`') {
        if (line[j] === '\\') j++;
        j++;
      }
      if (j < line.length) j++;
      tokens.push({ type: 'string', value: line.slice(i, j) });
      i = j;
      continue;
    }
    // Single-line comment
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      i = line.length;
      continue;
    }
    // Hash comment (Python, shell)
    if (line[i] === '#') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      i = line.length;
      continue;
    }
    // Number
    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\d.xXa-fA-FeEbBoO_]/.test(line[j])) j++;
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }
    // Word (keyword or identifier)
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      tokens.push({ type: KEYWORDS.has(word) ? 'keyword' : 'text', value: word });
      i = j;
      continue;
    }
    // Punctuation / operators
    tokens.push({ type: 'punctuation', value: line[i] });
    i++;
  }
  return tokens;
}


// ============================================================
// <ai-diff> component
// ============================================================

export class AIDiff extends PapyraiElement {
  static properties = {
    before: { type: String },
    after: { type: String },
    mode: { type: String },       // 'inline' | 'side-by-side'
    language: { type: String },   // optional language hint for syntax highlighting
    _diffResult: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-mono, monospace);
      font-size: 0.85rem;
      line-height: 1.7;
      color: var(--ink-black, #1a1612);
    }

    /* ---- Header ---- */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-sm, 8px);
      margin-bottom: var(--spacing-sm, 8px);
      font-size: 0.75rem;
      color: var(--accent-red, #c4453c);
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
    }
    .header-icon {
      font-size: 1.1rem;
      font-family: var(--font-handwrite, cursive);
    }
    .header-label {
      font-family: var(--font-handwrite, cursive);
      font-size: 0.9rem;
    }

    /* ---- Stats ---- */
    .stats {
      display: flex;
      gap: var(--spacing-sm, 8px);
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
    }
    .stat-added { color: var(--accent-green, #5a8a5a); }
    .stat-removed { color: var(--accent-red, #c4453c); }
    .stat-changed { color: var(--accent-amber, #c49a3c); }

    /* ---- Mode Toggle ---- */
    .mode-toggle {
      display: inline-flex;
      gap: 2px;
      border: 1px solid var(--ink-faint, #d9d5d0);
      border-radius: var(--radius-sm, 4px);
      overflow: hidden;
      font-size: 0.65rem;
      margin-left: var(--spacing-sm, 8px);
    }
    .mode-btn {
      padding: 2px 8px;
      border: none;
      background: transparent;
      color: var(--ink-mid, #6a6560);
      cursor: pointer;
      font-family: var(--font-mono, monospace);
      font-size: 0.65rem;
      transition: background var(--transition-fast, 150ms ease);
    }
    .mode-btn:hover {
      background: var(--paper-cream, #f7f3e8);
    }
    .mode-btn.active {
      background: var(--accent-red, #c4453c);
      color: var(--paper-white, #fdfbf7);
    }

    /* ---- Diff Container ---- */
    .diff-container {
      border: 1px solid var(--ink-faint, #d9d5d0);
      border-radius: var(--radius-md, 8px);
      overflow: hidden;
      background: var(--paper-white, #fdfbf7);
    }

    /* ---- Inline Mode ---- */
    .diff-line {
      display: flex;
      align-items: stretch;
      min-height: 1.7em;
      border-bottom: 1px solid var(--paper-border, #d9d0be);
    }
    .diff-line:last-child {
      border-bottom: none;
    }

    .line-num {
      flex: 0 0 40px;
      padding: 0 6px;
      text-align: right;
      color: var(--ink-light, #aaa5a0);
      font-size: 0.7rem;
      background: var(--paper-cream, #f7f3e8);
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .line-num-pair {
      flex: 0 0 80px;
      display: flex;
    }
    .line-num-pair .line-num {
      flex: 1;
    }

    .line-sign {
      flex: 0 0 20px;
      text-align: center;
      font-weight: bold;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .line-content {
      flex: 1;
      padding: 0 8px;
      white-space: pre-wrap;
      word-break: break-all;
      overflow-wrap: break-word;
      display: flex;
      align-items: center;
    }

    /* ---- Margin Annotation ---- */
    .margin-annotation {
      flex: 0 0 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-handwrite, cursive);
      font-size: 0.9rem;
      user-select: none;
    }

    /* ---- Line Types ---- */
    .diff-line.equal {
      background: transparent;
    }
    .diff-line.equal .line-sign {
      color: transparent;
    }

    .diff-line.delete {
      background: color-mix(in srgb, var(--accent-red, #c4453c) 8%, transparent);
    }
    .diff-line.delete .line-sign {
      color: var(--accent-red, #c4453c);
    }
    .diff-line.delete .line-content {
      text-decoration: line-through;
      text-decoration-color: var(--accent-red, #c4453c);
      color: var(--accent-red, #c4453c);
    }
    .diff-line.delete .margin-annotation {
      color: var(--accent-red, #c4453c);
    }

    .diff-line.insert {
      background: color-mix(in srgb, var(--accent-green, #5a8a5a) 8%, transparent);
    }
    .diff-line.insert .line-sign {
      color: var(--accent-green, #5a8a5a);
    }
    .diff-line.insert .line-content {
      color: var(--accent-green, #5a8a5a);
      text-decoration: underline;
      text-decoration-style: wavy;
      text-decoration-color: var(--accent-green, #5a8a5a);
      text-underline-offset: 3px;
    }
    .diff-line.insert .margin-annotation {
      color: var(--accent-green, #5a8a5a);
    }

    .diff-line.changed-old {
      background: color-mix(in srgb, var(--accent-red, #c4453c) 8%, transparent);
    }
    .diff-line.changed-old .line-sign {
      color: var(--accent-red, #c4453c);
    }
    .diff-line.changed-old .margin-annotation {
      color: var(--accent-amber, #c49a3c);
    }

    .diff-line.changed-new {
      background: color-mix(in srgb, var(--accent-green, #5a8a5a) 8%, transparent);
    }
    .diff-line.changed-new .line-sign {
      color: var(--accent-green, #5a8a5a);
    }

    /* ---- Char-level highlights ---- */
    .char-del {
      background: color-mix(in srgb, var(--accent-red, #c4453c) 25%, transparent);
      text-decoration: line-through;
      text-decoration-color: var(--accent-red, #c4453c);
      border-radius: 2px;
      padding: 0 1px;
    }
    .char-ins {
      background: color-mix(in srgb, var(--accent-green, #5a8a5a) 25%, transparent);
      text-decoration: underline;
      text-decoration-color: var(--accent-green, #5a8a5a);
      text-decoration-style: wavy;
      text-underline-offset: 2px;
      border-radius: 2px;
      padding: 0 1px;
    }

    /* ---- Side-by-side mode ---- */
    .side-by-side {
      display: flex;
      width: 100%;
    }
    .side-panel {
      flex: 1;
      min-width: 0;
      overflow: auto;
    }
    .side-panel + .side-panel {
      border-left: 2px solid var(--ink-faint, #d9d5d0);
    }
    .side-panel-header {
      padding: 4px 8px;
      font-size: 0.7rem;
      font-family: var(--font-handwrite, cursive);
      color: var(--ink-mid, #6a6560);
      background: var(--paper-cream, #f7f3e8);
      border-bottom: 1px solid var(--paper-border, #d9d0be);
      text-align: center;
    }

    .side-line {
      display: flex;
      align-items: stretch;
      min-height: 1.7em;
      border-bottom: 1px solid var(--paper-border, #d9d0be);
    }
    .side-line:last-child {
      border-bottom: none;
    }
    .side-line .line-num {
      flex: 0 0 36px;
    }
    .side-line .line-content {
      flex: 1;
      padding: 0 6px;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .side-line.empty {
      background: var(--paper-cream, #f7f3e8);
      opacity: 0.5;
    }
    .side-line.delete {
      background: color-mix(in srgb, var(--accent-red, #c4453c) 8%, transparent);
    }
    .side-line.delete .line-content {
      text-decoration: line-through;
      text-decoration-color: var(--accent-red, #c4453c);
      color: var(--accent-red, #c4453c);
    }
    .side-line.insert {
      background: color-mix(in srgb, var(--accent-green, #5a8a5a) 8%, transparent);
    }
    .side-line.insert .line-content {
      color: var(--accent-green, #5a8a5a);
      text-decoration: underline;
      text-decoration-style: wavy;
      text-decoration-color: var(--accent-green, #5a8a5a);
      text-underline-offset: 3px;
    }

    /* ---- Syntax highlighting ---- */
    .syn-keyword { color: var(--accent-blue, #4a7c9b); font-weight: 600; }
    .syn-string { color: var(--accent-green, #5a8a5a); }
    .syn-number { color: var(--accent-amber, #c49a3c); }
    .syn-comment { color: var(--ink-light, #aaa5a0); font-style: italic; }
    .syn-punctuation { color: var(--ink-mid, #6a6560); }
  `;

  constructor() {
    super();
    this.before = '';
    this.after = '';
    this.mode = 'inline';
    this.language = '';
    this._diffResult = null;
  }

  willUpdate(changed) {
    if (changed.has('before') || changed.has('after')) {
      this._computeDiff();
    }
  }

  _computeDiff() {
    const beforeLines = this.before.split('\n');
    const afterLines = this.after.split('\n');

    // Run Myers diff
    const rawEdits = myersDiff(beforeLines, afterLines);

    // Group consecutive delete/insert for char-level diffing
    const grouped = groupEdits(rawEdits);

    // Compute stats
    let added = 0, removed = 0, changed = 0;
    for (const g of grouped) {
      if (g.type === 'insert') added++;
      else if (g.type === 'delete') removed++;
      else if (g.type === 'changed') changed++;
    }

    this._diffResult = { grouped, stats: { added, removed, changed } };

    // Emit event
    this.updateComplete.then(() => {
      this.emit('diff-computed', {
        added,
        removed,
        changed,
        totalLines: beforeLines.length + afterLines.length
      });
    });
  }

  _toggleMode(newMode) {
    this.mode = newMode;
  }

  // Render syntax-highlighted line content
  _renderSyntaxLine(text) {
    if (!this.language && !this._looksLikeCode()) {
      return text || '\u00A0';
    }
    const tokens = tokenizeLine(text || '');
    if (tokens.length === 0) return '\u00A0';
    return tokens.map(t => {
      switch (t.type) {
        case 'keyword': return html`<span class="syn-keyword">${t.value}</span>`;
        case 'string': return html`<span class="syn-string">${t.value}</span>`;
        case 'number': return html`<span class="syn-number">${t.value}</span>`;
        case 'comment': return html`<span class="syn-comment">${t.value}</span>`;
        case 'punctuation': return html`<span class="syn-punctuation">${t.value}</span>`;
        default: return t.value;
      }
    });
  }

  _looksLikeCode() {
    const sample = (this.before + this.after).slice(0, 500);
    return /[{};()=]|function |const |let |var |import |def |class /.test(sample);
  }

  // Render character-level diff for changed lines
  _renderCharDiff(charEdits, side) {
    const parts = [];
    for (const c of charEdits) {
      if (c.type === 'equal') {
        parts.push(c.value);
      } else if (c.type === 'delete' && side === 'old') {
        parts.push(html`<span class="char-del">${c.value}</span>`);
      } else if (c.type === 'insert' && side === 'new') {
        parts.push(html`<span class="char-ins">${c.value}</span>`);
      }
    }
    return parts.length > 0 ? parts : '\u00A0';
  }

  // ---- Inline render ----
  _renderInline() {
    if (!this._diffResult) return '';
    const { grouped } = this._diffResult;
    const rows = [];
    let oldNum = 0;
    let newNum = 0;

    for (const item of grouped) {
      if (item.type === 'equal') {
        oldNum++;
        newNum++;
        rows.push(html`
          <div class="diff-line equal">
            <div class="line-num-pair">
              <div class="line-num">${oldNum}</div>
              <div class="line-num">${newNum}</div>
            </div>
            <div class="line-sign">&nbsp;</div>
            <div class="line-content">${this._renderSyntaxLine(item.value)}</div>
            <div class="margin-annotation"></div>
          </div>
        `);
      } else if (item.type === 'delete') {
        oldNum++;
        rows.push(html`
          <div class="diff-line delete">
            <div class="line-num-pair">
              <div class="line-num">${oldNum}</div>
              <div class="line-num"></div>
            </div>
            <div class="line-sign">−</div>
            <div class="line-content">${this._renderSyntaxLine(item.value)}</div>
            <div class="margin-annotation">✗</div>
          </div>
        `);
      } else if (item.type === 'insert') {
        newNum++;
        rows.push(html`
          <div class="diff-line insert">
            <div class="line-num-pair">
              <div class="line-num"></div>
              <div class="line-num">${newNum}</div>
            </div>
            <div class="line-sign">+</div>
            <div class="line-content">${this._renderSyntaxLine(item.value)}</div>
            <div class="margin-annotation">✎</div>
          </div>
        `);
      } else if (item.type === 'changed') {
        oldNum++;
        newNum++;
        // Old line with char-level highlight
        rows.push(html`
          <div class="diff-line changed-old">
            <div class="line-num-pair">
              <div class="line-num">${oldNum}</div>
              <div class="line-num"></div>
            </div>
            <div class="line-sign">−</div>
            <div class="line-content">${this._renderCharDiff(item.charDiff, 'old')}</div>
            <div class="margin-annotation">✎</div>
          </div>
        `);
        // New line with char-level highlight
        rows.push(html`
          <div class="diff-line changed-new">
            <div class="line-num-pair">
              <div class="line-num"></div>
              <div class="line-num">${newNum}</div>
            </div>
            <div class="line-sign">+</div>
            <div class="line-content">${this._renderCharDiff(item.charDiff, 'new')}</div>
            <div class="margin-annotation"></div>
          </div>
        `);
      }
    }
    return rows;
  }

  // ---- Side-by-side render ----
  _renderSideBySide() {
    if (!this._diffResult) return '';
    const { grouped } = this._diffResult;

    const leftRows = [];
    const rightRows = [];
    let oldNum = 0;
    let newNum = 0;

    for (const item of grouped) {
      if (item.type === 'equal') {
        oldNum++;
        newNum++;
        leftRows.push({ num: oldNum, type: 'equal', content: item.value });
        rightRows.push({ num: newNum, type: 'equal', content: item.value });
      } else if (item.type === 'delete') {
        oldNum++;
        leftRows.push({ num: oldNum, type: 'delete', content: item.value });
        rightRows.push({ num: null, type: 'empty', content: '' });
      } else if (item.type === 'insert') {
        newNum++;
        leftRows.push({ num: null, type: 'empty', content: '' });
        rightRows.push({ num: newNum, type: 'insert', content: item.value });
      } else if (item.type === 'changed') {
        oldNum++;
        newNum++;
        leftRows.push({ num: oldNum, type: 'delete', content: item.oldValue, charDiff: item.charDiff });
        rightRows.push({ num: newNum, type: 'insert', content: item.newValue, charDiff: item.charDiff });
      }
    }

    const renderSideRow = (row, side) => {
      const cls = row.type;
      let content;
      if (row.type === 'empty') {
        content = '\u00A0';
      } else if (row.charDiff) {
        content = this._renderCharDiff(row.charDiff, side === 'left' ? 'old' : 'new');
      } else {
        content = this._renderSyntaxLine(row.content);
      }
      return html`
        <div class="side-line ${cls}">
          <div class="line-num">${row.num ?? ''}</div>
          <div class="line-content">${content}</div>
        </div>
      `;
    };

    return html`
      <div class="side-by-side">
        <div class="side-panel">
          <div class="side-panel-header">Before</div>
          ${leftRows.map(r => renderSideRow(r, 'left'))}
        </div>
        <div class="side-panel">
          <div class="side-panel-header">After</div>
          ${rightRows.map(r => renderSideRow(r, 'right'))}
        </div>
      </div>
    `;
  }

  render() {
    const stats = this._diffResult?.stats;
    return html`
      <div class="header">
        <div class="header-left">
          <span class="header-icon">✎</span>
          <span class="header-label">AI 红笔批改</span>
          ${stats ? html`
            <div class="stats">
              ${stats.added > 0 ? html`<span class="stat-added">+${stats.added}</span>` : ''}
              ${stats.removed > 0 ? html`<span class="stat-removed">−${stats.removed}</span>` : ''}
              ${stats.changed > 0 ? html`<span class="stat-changed">~${stats.changed}</span>` : ''}
            </div>
          ` : ''}
        </div>
        <div class="mode-toggle">
          <button class="mode-btn ${this.mode === 'inline' ? 'active' : ''}"
                  @click=${() => this._toggleMode('inline')}
                  aria-pressed=${this.mode === 'inline'}>
            Inline
          </button>
          <button class="mode-btn ${this.mode === 'side-by-side' ? 'active' : ''}"
                  @click=${() => this._toggleMode('side-by-side')}
                  aria-pressed=${this.mode === 'side-by-side'}>
            Side
          </button>
        </div>
      </div>
      <div class="diff-container" role="region" aria-label="Diff comparison">
        ${this.mode === 'side-by-side' ? this._renderSideBySide() : this._renderInline()}
      </div>
    `;
  }
}

customElements.define('ai-diff', AIDiff);
