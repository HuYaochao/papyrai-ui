// DatePicker Component - 日历风格的日期选择器
// Features: calendar grid, month/year navigation, range selection, min/max date, keyboard navigation

import { PapyraiElement, html, css } from '../../core/base.js';

export class PDatePicker extends PapyraiElement {
  static properties = {
    value: { type: String },
    min: { type: String },
    max: { type: String },
    mode: { type: String }, // 'single' | 'range'
    placeholder: { type: String },
    disabled: { type: Boolean, reflect: true },
    open: { type: Boolean, reflect: true },
    locale: { type: String }
  };

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--font-serif, serif);
    }

    .trigger {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 10px) var(--spacing-md, 14px);
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      cursor: pointer;
      min-width: 180px;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    :host([disabled]) .trigger {
      opacity: 0.55;
      pointer-events: none;
    }

    .trigger:hover:not(:disabled) {
      border-color: var(--ink-faint, #b5b0a8);
    }

    .trigger:focus {
      outline: none;
      border-color: var(--accent-blue, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    :host([dark]) .trigger {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    :host([dark]) .trigger:hover:not(:disabled) {
      border-color: var(--ink-light, #7a7570);
    }

    .trigger-icon {
      width: 18px;
      height: 18px;
      color: var(--ink-faint, #9a9590);
    }

    .trigger-value {
      flex: 1;
      font-size: 0.95rem;
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .trigger-value {
      color: var(--paper-white, #f5f0e8);
    }

    .trigger-placeholder {
      color: var(--ink-faint, #9a9590);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: var(--spacing-xs, 6px);
      background: var(--paper-cream, #f8f1e5);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      box-shadow: var(--elevation-3, 0 12px 32px rgba(0, 0, 0, 0.15));
      z-index: 100;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: opacity 0.15s, transform 0.15s, visibility 0.15s;
    }

    :host([open]) .dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    :host([dark]) .dropdown {
      background: var(--paper-aged, #3a3530);
      border-color: var(--ink-faint, #5a5550);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-md, 16px);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    :host([dark]) .header {
      border-color: var(--ink-faint, #5a5550);
    }

    .nav-btn {
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm, 6px);
      color: var(--ink-faint, #9a9590);
      transition: background 0.15s, color 0.15s;
    }

    .nav-btn:hover {
      background: var(--ink-faint, #e8e5e0);
      color: var(--ink-black, #1f1a15);
    }

    :host([dark]) .nav-btn:hover {
      background: var(--ink-dark, #4a4540);
      color: var(--paper-white, #f5f0e8);
    }

    .nav-btn svg {
      width: 16px;
      height: 16px;
    }

    .month-year {
      font-weight: 600;
      color: var(--ink-black, #1f1a15);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: var(--radius-sm, 6px);
      transition: background 0.15s;
    }

    .month-year:hover {
      background: var(--ink-faint, #e8e5e0);
    }

    :host([dark]) .month-year {
      color: var(--paper-white, #f5f0e8);
    }

    :host([dark]) .month-year:hover {
      background: var(--ink-dark, #4a4540);
    }

    .calendar {
      padding: var(--spacing-sm, 12px);
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      margin-bottom: var(--spacing-xs, 6px);
    }

    .weekday {
      text-align: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--ink-faint, #9a9590);
      padding: var(--spacing-xs, 6px);
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
    }

    .day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: var(--radius-sm, 6px);
      color: var(--ink-black, #1f1a15);
      transition: background 0.1s, color 0.1s;
      position: relative;
    }

    .day:hover:not(:disabled) {
      background: var(--ink-faint, #e8e5e0);
    }

    .day:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .day.other-month {
      color: var(--ink-faint, #9a9590);
    }

    .day.today {
      font-weight: 700;
    }

    .day.today::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: var(--accent-red, #c4453c);
      border-radius: 50%;
    }

    :host([dark]) .day.today::after {
      background: var(--accent-red, #f87171);
    }

    .day.selected {
      background: var(--accent-blue, #3b82f6) !important;
      color: white !important;
    }

    .day.in-range {
      background: rgba(59, 130, 246, 0.15);
      border-radius: 0;
    }

    .day.range-start {
      border-radius: var(--radius-sm, 6px) 0 0 var(--radius-sm, 6px);
    }

    .day.range-end {
      border-radius: 0 var(--radius-sm, 6px) var(--radius-sm, 6px) 0;
    }

    :host([dark]) .day {
      color: var(--paper-white, #f5f0e8);
    }

    :host([dark]) .day:hover:not(:disabled) {
      background: var(--ink-dark, #4a4540);
    }

    :host([dark]) .day.other-month {
      color: var(--ink-faint, #6a6560);
    }

    :host([dark]) .day.in-range {
      background: rgba(59, 130, 246, 0.25);
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-sm, 12px) var(--spacing-md, 16px);
      border-top: 1px solid var(--paper-border, #d9ccb8);
    }

    :host([dark]) .footer {
      border-color: var(--ink-faint, #5a5550);
    }

    .today-btn {
      padding: 6px 12px;
      font-size: 0.8rem;
      border: 1px solid var(--paper-border, #d9ccb8);
      background: transparent;
      border-radius: var(--radius-sm, 6px);
      cursor: pointer;
      color: var(--ink-black, #1f1a15);
      transition: background 0.15s;
    }

    .today-btn:hover {
      background: var(--ink-faint, #e8e5e0);
    }

    :host([dark]) .today-btn {
      border-color: var(--ink-faint, #5a5550);
      color: var(--paper-white, #f5f0e8);
    }

    :host([dark]) .today-btn:hover {
      background: var(--ink-dark, #4a4540);
    }

    .clear-btn {
      padding: 6px 12px;
      font-size: 0.8rem;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--accent-red, #c4453c);
      transition: opacity 0.15s;
    }

    .clear-btn:hover {
      opacity: 0.7;
    }

    /* Month/Year picker view */
    .picker-view {
      display: none;
      padding: var(--spacing-md, 16px);
    }

    .picker-view.active {
      display: block;
    }

    .picker-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--spacing-xs, 6px);
    }

    .picker-item {
      padding: var(--spacing-sm, 10px);
      text-align: center;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: var(--radius-sm, 6px);
      font-size: 0.9rem;
      color: var(--ink-black, #1f1a15);
      transition: background 0.15s;
    }

    .picker-item:hover {
      background: var(--ink-faint, #e8e5e0);
    }

    .picker-item.selected {
      background: var(--accent-blue, #3b82f6);
      color: white;
    }

    :host([dark]) .picker-item {
      color: var(--paper-white, #f5f0e8);
    }

    :host([dark]) .picker-item:hover {
      background: var(--ink-dark, #4a4540);
    }

    [hidden] {
      display: none !important;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.min = '';
    this.max = '';
    this.mode = 'single';
    this.placeholder = 'Select date';
    this.disabled = false;
    this.open = false;
    this.locale = 'en';
    
    this._currentDate = new Date();
    this._viewDate = new Date();
    this._selectedDate = null;
    this._rangeStart = null;
    this._rangeEnd = null;
    this._pickerView = 'days'; // 'days' | 'months' | 'years'
    
    this._handleClickOutside = this._handleClickOutside.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  updated(changedProperties) {
    if (changedProperties.has('value') && this.value) {
      this._parseValue();
    }
  }

  _parseValue() {
    if (this.mode === 'range') {
      const [start, end] = this.value.split('|');
      this._rangeStart = start ? new Date(start) : null;
      this._rangeEnd = end ? new Date(end) : null;
    } else {
      this._selectedDate = this.value ? new Date(this.value) : null;
    }
  }

  _handleClickOutside(e) {
    if (this.open && !this.contains(e.target)) {
      this.open = false;
    }
  }

  _handleKeydown(e) {
    if (!this.open) return;
    
    if (e.key === 'Escape') {
      this.open = false;
      e.preventDefault();
    } else if (e.key === 'Tab') {
      this.open = false;
    }
  }

  _toggleOpen(e) {
    e.stopPropagation();
    if (this.disabled) return;
    this.open = !this.open;
    if (this.open) {
      if (this._selectedDate || this._rangeStart) {
        const d = this._selectedDate || this._rangeStart;
        this._viewDate = new Date(d);
      }
      this.requestUpdate();
    }
  }

  _getMonthName(month) {
    const names = {
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    };
    return names[this.locale]?.[month] || names.en[month];
  }

  _getWeekdayName(day) {
    const names = {
      en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      zh: ['日', '一', '二', '三', '四', '五', '六']
    };
    return names[this.locale]?.[day] || names.en[day];
  }

  _formatDate(date) {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  _formatDisplayDate(date) {
    if (!date) return '';
    const m = this._getMonthName(date.getMonth());
    const d = date.getDate();
    const y = date.getFullYear();
    return this.locale === 'zh' ? `${y}年${m}${d}日` : `${m} ${d}, ${y}`;
  }

  _getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  _getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  _isDateDisabled(date) {
    if (!date) return false;
    const time = date.getTime();
    if (this.min) {
      const minDate = new Date(this.min);
      minDate.setHours(0, 0, 0, 0);
      if (time < minDate.getTime()) return true;
    }
    if (this.max) {
      const maxDate = new Date(this.max);
      maxDate.setHours(23, 59, 59, 999);
      if (time > maxDate.getTime()) return true;
    }
    return false;
  }

  _isToday(date) {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  _isSelected(date) {
    if (!date) return false;
    const dateStr = this._formatDate(date);
    if (this.mode === 'range') {
      const startStr = this._rangeStart ? this._formatDate(this._rangeStart) : null;
      const endStr = this._rangeEnd ? this._formatDate(this._rangeEnd) : null;
      return dateStr === startStr || dateStr === endStr;
    }
    return dateStr === this.value;
  }

  _isInRange(date) {
    if (this.mode !== 'range' || !date || !this._rangeStart || !this._rangeEnd) return false;
    const time = date.getTime();
    return time > this._rangeStart.getTime() && time < this._rangeEnd.getTime();
  }

  _prevMonth() {
    this._viewDate.setMonth(this._viewDate.getMonth() - 1);
    this.requestUpdate();
  }

  _nextMonth() {
    this._viewDate.setMonth(this._viewDate.getMonth() + 1);
    this.requestUpdate();
  }

  _showMonthPicker() {
    this._pickerView = 'months';
    this.requestUpdate();
  }

  _showYearPicker() {
    this._pickerView = 'years';
    this.requestUpdate();
  }

  _selectMonth(month) {
    this._viewDate.setMonth(month);
    this._pickerView = 'days';
    this.requestUpdate();
  }

  _selectYear(year) {
    this._viewDate.setFullYear(year);
    this._pickerView = 'months';
    this.requestUpdate();
  }

  _selectDate(date) {
    if (this._isDateDisabled(date)) return;

    if (this.mode === 'single') {
      this._selectedDate = date;
      this.value = this._formatDate(date);
      this.open = false;
      this.emit('change', { value: this.value, date });
    } else {
      if (!this._rangeStart || (this._rangeStart && this._rangeEnd)) {
        this._rangeStart = date;
        this._rangeEnd = null;
      } else {
        if (date < this._rangeStart) {
          this._rangeEnd = this._rangeStart;
          this._rangeStart = date;
        } else {
          this._rangeEnd = date;
        }
        this.value = `${this._formatDate(this._rangeStart)}|${this._formatDate(this._rangeEnd)}`;
        this.emit('change', { value: this.value, start: this._rangeStart, end: this._rangeEnd });
      }
      this.requestUpdate();
    }
  }

  _selectToday() {
    const today = new Date();
    this._selectDate(today);
  }

  _clear() {
    this._selectedDate = null;
    this._rangeStart = null;
    this._rangeEnd = null;
    this.value = '';
    this.open = false;
    this.emit('change', { value: '', date: null });
  }

  _renderDays() {
    const year = this._viewDate.getFullYear();
    const month = this._viewDate.getMonth();
    const daysInMonth = this._getDaysInMonth(year, month);
    const firstDay = this._getFirstDayOfMonth(year, month);
    const daysInPrevMonth = this._getDaysInMonth(year, month - 1);
    
    const days = [];
    const today = new Date();
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date,
        day: daysInPrevMonth - i,
        otherMonth: true
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        day: i,
        otherMonth: false
      });
    }
    
    // Next month days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        day: i,
        otherMonth: true
      });
    }

    return days.map(d => {
      const disabled = this._isDateDisabled(d.date);
      const selected = this._isSelected(d.date);
      const inRange = this._isInRange(d.date);
      const isToday = this._isToday(d.date);
      const isStart = this._rangeStart && this._formatDate(d.date) === this._formatDate(this._rangeStart);
      const isEnd = this._rangeEnd && this._formatDate(d.date) === this._formatDate(this._rangeEnd);
      
      let classes = 'day';
      if (d.otherMonth) classes += ' other-month';
      if (disabled) classes += ' disabled';
      if (selected) classes += ' selected';
      if (inRange) classes += ' in-range';
      if (isToday) classes += ' today';
      if (isStart) classes += ' range-start';
      if (isEnd) classes += ' range-end';
      
      return html`
        <button 
          class=${classes}
          ?disabled=${disabled}
          @click=${() => this._selectDate(d.date)}
        >${d.day}</button>
      `;
    });
  }

  _renderMonths() {
    const months = [];
    const currentMonth = this._viewDate.getMonth();
    
    for (let i = 0; i < 12; i++) {
      const selected = i === currentMonth;
      months.push(html`
        <button 
          class="picker-item ${selected ? 'selected' : ''}"
          @click=${() => this._selectMonth(i)}
        >${this._getMonthName(i).slice(0, 3)}</button>
      `);
    }
    return months;
  }

  _renderYears() {
    const currentYear = this._viewDate.getFullYear();
    const years = [];
    const startYear = Math.floor(currentYear / 10) * 10 - 1;
    
    for (let i = 0; i < 12; i++) {
      const year = startYear + i;
      const selected = year === currentYear;
      years.push(html`
        <button 
          class="picker-item ${selected ? 'selected' : ''}"
          @click=${() => this._selectYear(year)}
        >${year}</button>
      `);
    }
    return years;
  }

  _getDisplayValue() {
    if (this.mode === 'range') {
      if (this._rangeStart && this._rangeEnd) {
        return `${this._formatDisplayDate(this._rangeStart)} - ${this._formatDisplayDate(this._rangeEnd)}`;
      } else if (this._rangeStart) {
        return `${this._formatDisplayDate(this._rangeStart)} - ...`;
      }
    } else {
      if (this._selectedDate) {
        return this._formatDisplayDate(this._selectedDate);
      }
    }
    return '';
  }

  render() {
    const year = this._viewDate.getFullYear();
    const month = this._viewDate.getMonth();
    
    return html`
      <div class="trigger" @click=${this._toggleOpen} tabindex="0" role="combobox" aria-expanded="${this.open}" aria-haspopup="dialog">
        <svg class="trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span class="trigger-value ${!this.value ? 'trigger-placeholder' : ''}">
          ${this._getDisplayValue() || this.placeholder}
        </span>
      </div>

      <div class="dropdown">
        <div class="header">
          <button class="nav-btn" @click=${this._prevMonth}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div class="month-year" @click=${this._pickerView === 'days' ? this._showMonthPicker : (this._pickerView === 'months' ? this._showYearPicker : () => {})}>
            ${this._pickerView === 'days' ? `${this._getMonthName(month)} ${year}` : ''}
            ${this._pickerView === 'months' ? `${year}` : ''}
            ${this._pickerView === 'years' ? `${Math.floor(year / 10) * 10}s` : ''}
          </div>
          
          <button class="nav-btn" @click=${this._nextMonth}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div class="calendar ${this._pickerView !== 'days' ? 'hidden' : ''}">
          <div class="weekdays">
            ${[0,1,2,3,4,5,6].map(d => html`<div class="weekday">${this._getWeekdayName(d)}</div>`)}
          </div>
          <div class="days">
            ${this._renderDays()}
          </div>
        </div>

        <div class="picker-view ${this._pickerView === 'months' ? 'active' : ''}">
          <div class="picker-grid">
            ${this._renderMonths()}
          </div>
        </div>

        <div class="picker-view ${this._pickerView === 'years' ? 'active' : ''}">
          <div class="picker-grid">
            ${this._renderYears()}
          </div>
        </div>

        <div class="footer">
          <button class="today-btn" @click=${this._selectToday}>Today</button>
          ${this.value ? html`<button class="clear-btn" @click=${this._clear}>Clear</button>` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('p-date-picker', PDatePicker);
