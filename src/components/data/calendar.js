// Calendar - 纸张风格日历组件
// 属性: value(Date), min(Date), max(Date), locale(String), 
//       view(String: month/week/day), events(Array)
// 事件: date-select({date}), event-click({event}), event-create({date, event})

import { PapyraiElement, html, css } from '../../core/base.js';

export class PCalendar extends PapyraiElement {
  static properties = {
    value: { type: Object },
    min: { type: Object },
    max: { type: Object },
    locale: { type: String },
    view: { type: String },
    events: { type: Array },
    _currentMonth: { state: true },
    _currentView: { state: true },
    _selectedDate: { state: true },
    _draggingEvent: { state: true },
    _dragStartDate: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: var(--font-serif, serif);
    }

    .calendar {
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-md, 10px);
      background: var(--paper-white, #fffef8);
      box-shadow: var(--elevation-1, 0 2px 8px rgba(0,0,0,.08));
      overflow: hidden;
    }

    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-md, 16px);
      background: var(--paper-cream, #f8f1e5);
      border-bottom: 1.5px solid var(--paper-border, #d9ccb8);
    }

    .calendar-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--ink-black, #1f1a15);
    }

    .calendar-nav {
      display: flex;
      gap: var(--spacing-xs, 4px);
    }

    .nav-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: var(--radius-sm, 6px);
      background: var(--paper-white, #fffef8);
      color: var(--ink-black, #1f1a15);
      cursor: pointer;
      transition: all 0.2s;
    }

    .nav-btn:hover {
      background: var(--accent-red, #c4453c);
      color: #fff;
    }

    .nav-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .calendar-views {
      display: flex;
      gap: var(--spacing-xs, 4px);
    }

    .view-btn {
      padding: var(--spacing-xs, 6px) var(--spacing-sm, 12px);
      border: 1.5px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 6px);
      background: var(--paper-white, #fffef8);
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .view-btn:hover {
      border-color: var(--accent-red, #c4453c);
    }

    .view-btn.active {
      background: var(--accent-red, #c4453c);
      border-color: var(--accent-red, #c4453c);
      color: #fff;
    }

    .calendar-body {
      padding: var(--spacing-sm, 12px);
    }

    .weekday-row {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      margin-bottom: var(--spacing-xs, 8px);
    }

    .weekday {
      padding: var(--spacing-xs, 8px);
      text-align: center;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--ink-faint, #999);
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
    }

    .day-cell {
      min-height: 80px;
      padding: var(--spacing-xs, 6px);
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 4px);
      background: var(--paper-white, #fffef8);
      cursor: pointer;
      transition: all 0.15s;
    }

    .day-cell:hover {
      background: var(--paper-cream, #f8f1e5);
    }

    .day-cell.other-month {
      opacity: 0.4;
    }

    .day-cell.today {
      border-color: var(--accent-red, #c4453c);
      border-width: 2px;
    }

    .day-cell.selected {
      background: rgba(196, 69, 60, 0.15);
      border-color: var(--accent-red, #c4453c);
    }

    .day-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      margin-bottom: var(--spacing-xs, 4px);
      border-radius: 50%;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .day-cell.today .day-number {
      background: var(--accent-red, #c4453c);
      color: #fff;
    }

    .day-cell.selected .day-number {
      background: var(--accent-red, #c4453c);
      color: #fff;
    }

    .day-events {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
    }

    .event-item {
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 0.75rem;
      background: rgba(196, 69, 60, 0.2);
      color: var(--accent-red, #c4453c);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      transition: all 0.15s;
    }

    .event-item:hover {
      background: rgba(196, 69, 60, 0.3);
    }

    .event-item.more {
      font-style: italic;
      color: var(--ink-faint, #999);
      background: transparent;
    }

    .event-item.dragging {
      opacity: 0.5;
    }

    .event-item.drop-target {
      border: 2px dashed var(--accent-red, #c4453c);
    }

    .week-view {
      display: flex;
      gap: 2px;
      overflow-x: auto;
    }

    .week-column {
      flex: 1;
      min-width: 100px;
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 4px);
      background: var(--paper-white, #fffef8);
    }

    .week-header {
      padding: var(--spacing-xs, 8px);
      text-align: center;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--ink-faint, #999);
      background: var(--paper-cream, #f8f1e5);
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    .week-days {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: var(--spacing-xs, 4px);
    }

    .week-time-slot {
      height: 48px;
      padding: 2px 4px;
      border: 1px solid var(--paper-border, #d9ccb8);
      border-radius: 3px;
      background: var(--paper-white, #fffef8);
      font-size: 0.75rem;
    }

    .week-time-slot:hover {
      background: var(--paper-cream, #f8f1e5);
    }

    .week-time-slot.drop-target {
      border: 2px dashed var(--accent-red, #c4453c);
    }

    .day-view {
      display: flex;
      flex-direction: column;
      height: 500px;
    }

    .day-view-header {
      padding: var(--spacing-sm, 12px);
      text-align: center;
      font-size: 1rem;
      font-weight: 500;
      background: var(--paper-cream, #f8f1e5);
      border-bottom: 1.5px solid var(--paper-border, #d9ccb8);
    }

    .day-view-timeline {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-xs, 8px);
    }

    .time-slot {
      display: flex;
      height: 60px;
      border-bottom: 1px solid var(--paper-border, #d9ccb8);
    }

    .time-label {
      width: 60px;
      font-size: 0.8rem;
      color: var(--ink-faint, #999);
      padding-right: var(--spacing-xs, 8px);
    }

    .time-content {
      flex: 1;
      position: relative;
    }

    .time-content-slot {
      position: absolute;
      left: 0;
      right: 0;
      height: 60px;
      border: 1px dashed var(--paper-border, #d9ccb8);
      border-radius: var(--radius-sm, 4px);
      cursor: pointer;
    }

    .time-content-slot:hover {
      background: var(--paper-cream, #f8f1e5);
    }

    .time-content-slot.drop-target {
      border: 2px dashed var(--accent-red, #c4453c);
      background: rgba(196, 69, 60, 0.1);
    }

    .event-block {
      position: absolute;
      left: 2px;
      right: 2px;
      padding: 4px 6px;
      border-radius: var(--radius-sm, 4px);
      background: rgba(196, 69, 60, 0.2);
      color: var(--accent-red, #c4453c);
      font-size: 0.8rem;
      overflow: hidden;
      cursor: pointer;
      z-index: 1;
    }

    .event-block:hover {
      background: rgba(196, 69, 60, 0.3);
    }

    .event-block.dragging {
      opacity: 0.5;
      z-index: 2;
    }

    .empty-state {
      padding: var(--spacing-xl, 48px);
      text-align: center;
      color: var(--ink-faint, #999);
      font-style: italic;
    }
  `;

  constructor() {
    super();
    this.value = new Date();
    this.min = null;
    this.max = null;
    this.locale = 'zh-CN';
    this.view = 'month';
    this.events = [];
    this._currentMonth = new Date();
    this._currentView = 'month';
    this._selectedDate = null;
    this._draggingEvent = null;
    this._dragStartDate = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.value) {
      this._currentMonth = new Date(this.value);
      this._selectedDate = new Date(this.value);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('view')) {
      this._currentView = this.view;
    }
  }

  _getWeekdays() {
    const weekdays = {
      'zh-CN': ['日', '一', '二', '三', '四', '五', '六'],
      'en-US': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    };
    return weekdays[this.locale] || weekdays['zh-CN'];
  }

  _getMonthDays() {
    const year = this._currentMonth.getFullYear();
    const month = this._currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const days = [];
    const current = new Date(startDate);
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }

  _isSameDay(date1, date2) {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  _isToday(date) {
    return this._isSameDay(date, new Date());
  }

  _isSelected(date) {
    return this._isSameDay(date, this._selectedDate);
  }

  _isDisabled(date) {
    if (this.min && date < this.min) return true;
    if (this.max && date > this.max) return true;
    return false;
  }

  _isOtherMonth(date) {
    return date.getMonth() !== this._currentMonth.getMonth();
  }

  _getEventsForDate(date) {
    return this.events.filter(event => this._isSameDay(new Date(event.start), date));
  }

  _formatMonthYear() {
    const months = {
      'zh-CN': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      'en-US': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
    const monthNames = months[this.locale] || months['zh-CN'];
    return `${monthNames[this._currentMonth.getMonth()]} ${this._currentMonth.getFullYear()}`;
  }

  _formatWeekHeader(date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  _prevMonth = () => {
    this._currentMonth = new Date(this._currentMonth.getFullYear(), this._currentMonth.getMonth() - 1, 1);
  };

  _nextMonth = () => {
    this._currentMonth = new Date(this._currentMonth.getFullYear(), this._currentMonth.getMonth() + 1, 1);
  };

  _goToToday = () => {
    this._currentMonth = new Date();
    this._selectedDate = new Date();
  };

  _handleDateClick = (date) => {
    if (this._isDisabled(date)) return;
    this._selectedDate = date;
    this.emit('date-select', { date });
  };

  _handleEventClick = (event, e) => {
    e.stopPropagation();
    this.emit('event-click', { event });
  };

  _handlePrevView = () => {
    if (this._currentView === 'month') {
      this._prevMonth();
    } else if (this._currentView === 'week') {
      const newDate = new Date(this._currentMonth);
      newDate.setDate(newDate.getDate() - 7);
      this._currentMonth = newDate;
    } else {
      const newDate = new Date(this._currentMonth);
      newDate.setDate(newDate.getDate() - 1);
      this._currentMonth = newDate;
    }
  };

  _handleNextView = () => {
    if (this._currentView === 'month') {
      this._nextMonth();
    } else if (this._currentView === 'week') {
      const newDate = new Date(this._currentMonth);
      newDate.setDate(newDate.getDate() + 7);
      this._currentMonth = newDate;
    } else {
      const newDate = new Date(this._currentMonth);
      newDate.setDate(newDate.getDate() + 1);
      this._currentMonth = newDate;
    }
  };

  _handleViewChange = (view) => {
    this._currentView = view;
  };

  _handleDragStart = (event, date) => {
    this._draggingEvent = event;
    this._dragStartDate = date;
  };

  _handleDragOver = (e) => {
    e.preventDefault();
  };

  _handleDrop = (date, e) => {
    e.preventDefault();
    if (this._draggingEvent && !this._isDisabled(date)) {
      const updatedEvent = {
        ...this._draggingEvent,
        start: date.toISOString(),
        end: new Date(date.getTime() + (new Date(this._draggingEvent.end) - new Date(this._draggingEvent.start))).toISOString()
      };
      this.emit('event-change', { event: updatedEvent, originalEvent: this._draggingEvent });
    }
    this._draggingEvent = null;
    this._dragStartDate = null;
  };

  _handleDoubleClick = (date) => {
    if (!this._isDisabled(date)) {
      const newEvent = {
        id: Date.now().toString(),
        title: '新建事件',
        start: date.toISOString(),
        end: new Date(date.getTime() + 3600000).toISOString(),
        color: '#c4453c'
      };
      this.emit('event-create', { date, event: newEvent });
    }
  };

  _renderMonthView() {
    const days = this._getMonthDays();
    const weekdays = this._getWeekdays();

    return html`
      <div class="weekday-row">
        ${weekdays.map(day => html`<div class="weekday">${day}</div>`)}
      </div>
      <div class="days-grid">
        ${days.map(date => {
          const events = this._getEventsForDate(date);
          const isOtherMonth = this._isOtherMonth(date);
          const isToday = this._isToday(date);
          const isSelected = this._isSelected(date);
          const isDisabled = this._isDisabled(date);

          return html`
            <div
              class="day-cell ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}"
              @click="${() => this._handleDateClick(date)}"
              @dblclick="${() => this._handleDoubleClick(date)}"
              role="gridcell"
              aria-label="${date.toDateString()}"
            >
              <div class="day-number">${date.getDate()}</div>
              <div class="day-events">
                ${events.slice(0, 3).map(event => html`
                  <div
                    class="event-item ${this._draggingEvent?.id === event.id ? 'dragging' : ''}"
                    @click="${(e) => this._handleEventClick(event, e)}"
                    @dragstart="${() => this._handleDragStart(event, date)}"
                    draggable="true"
                  >
                    ${event.title}
                  </div>
                `)}
                ${events.length > 3 ? html`
                  <div class="event-item more">+${events.length - 3} 更多</div>
                ` : ''}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  _renderWeekView() {
    const startOfWeek = new Date(this._currentMonth);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      return date;
    });
    const weekdays = this._getWeekdays();
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return html`
      <div class="week-view">
        <div class="week-column">
          <div class="week-header"></div>
          <div class="week-days">
            ${hours.map(hour => html`
              <div class="week-time-slot"></div>
            `)}
          </div>
        </div>
        ${weekDays.map((date, index) => {
          const events = this._getEventsForDate(date);
          return html`
            <div class="week-column">
              <div class="week-header">${weekdays[index]} ${date.getDate()}</div>
              <div class="week-days">
                ${hours.map(hour => {
                  const slotDate = new Date(date);
                  slotDate.setHours(hour, 0, 0, 0);
                  return html`
                    <div
                      class="week-time-slot"
                      @click="${() => this._handleDateClick(date)}"
                      @dragover="${this._handleDragOver}"
                      @drop="${(e) => this._handleDrop(date, e)}"
                    >
                    </div>
                  `;
                })}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  _renderDayView() {
    const date = this._currentMonth;
    const events = this._getEventsForDate(date);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const monthNames = {
      'zh-CN': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      'en-US': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
    const monthNamesDisplay = monthNames[this.locale] || monthNames['zh-CN'];

    const weekdayNames = {
      'zh-CN': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      'en-US': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
    const weekdayDisplay = weekdayNames[this.locale] || weekdayNames['zh-CN'];

    return html`
      <div class="day-view">
        <div class="day-view-header">
          ${monthNamesDisplay[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${weekdayDisplay[date.getDay()]}
        </div>
        <div class="day-view-timeline">
          ${hours.map(hour => {
            const slotDate = new Date(date);
            slotDate.setHours(hour, 0, 0, 0);
            const hourEvents = events.filter(event => {
              const eventStart = new Date(event.start);
              return eventStart.getHours() === hour;
            });

            return html`
              <div class="time-slot">
                <div class="time-label">${hour.toString().padStart(2, '0')}:00</div>
                <div class="time-content">
                  ${hourEvents.map(event => {
                    const start = new Date(event.start);
                    const end = new Date(event.end);
                    const duration = (end - start) / 3600000;
                    const height = duration * 60;
                    return html`
                      <div
                        class="event-block"
                        style="top: 0; height: ${height}px;"
                        @click="${(e) => this._handleEventClick(event, e)}"
                        @dragstart="${() => this._handleDragStart(event, slotDate)}"
                        draggable="true"
                      >
                        ${event.title}
                      </div>
                    `;
                  })}
                  <div
                    class="time-content-slot"
                    @click="${() => this._handleDateClick(slotDate)}"
                    @dragover="${this._handleDragOver}"
                    @drop="${(e) => this._handleDrop(slotDate, e)}"
                    @dblclick="${() => this._handleDoubleClick(slotDate)}"
                  ></div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="calendar">
        <div class="calendar-header">
          <div class="calendar-title">${this._formatMonthYear()}</div>
          <div class="calendar-nav">
            <button class="nav-btn" @click="${this._goToToday}">今天</button>
            <button class="nav-btn" @click="${this._handlePrevView}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button class="nav-btn" @click="${this._handleNextView}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
          <div class="calendar-views">
            <button class="view-btn ${this._currentView === 'month' ? 'active' : ''}" @click="${() => this._handleViewChange('month')}">月</button>
            <button class="view-btn ${this._currentView === 'week' ? 'active' : ''}" @click="${() => this._handleViewChange('week')}">周</button>
            <button class="view-btn ${this._currentView === 'day' ? 'active' : ''}" @click="${() => this._handleViewChange('day')}">日</button>
          </div>
        </div>
        <div class="calendar-body">
          ${this._currentView === 'month' ? this._renderMonthView() : ''}
          ${this._currentView === 'week' ? this._renderWeekView() : ''}
          ${this._currentView === 'day' ? this._renderDayView() : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('p-calendar', PCalendar);
