const date = new Date();
const today = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

const scheduleData = {}; // 日程を保存するオブジェクト

function createCalendar(month, year) {
  const monthDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let calendarHTML = '<table class="calendar"><thead><tr>';

  for (let i = 0; i < 7; i++) {
    if (i === 0) {
      calendarHTML += `<th class="sun">${monthDays[i]}</th>`;
    } else if (i === 6) {
      calendarHTML += `<th class="sat">${monthDays[i]}</th>`;
    } else {
      calendarHTML += `<th>${monthDays[i]}</th>`;
    }
  }

  calendarHTML += '</tr></thead><tbody>';

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let dayCount = 1;
  let prevDayCount = daysInPrevMonth - firstDay + 1;

  for (let i = 0; i < 6; i++) {
    calendarHTML += '<tr>';

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        // 前月の日付
        calendarHTML += `<td class="mute">${prevDayCount}</td>`;
        prevDayCount++;
      } else if (dayCount > daysInMonth) {
        // 次月の日付
        const nextMonthDay = dayCount - daysInMonth;
        calendarHTML += `<td class="mute">${nextMonthDay}</td>`;
        dayCount++;
      } else {
        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayCount).padStart(2, '0')}`;
        const eventText = scheduleData[fullDate] || '';
        let extraClass = '';

        if (dayCount === today && month === currentMonth && year === currentYear) {
          extraClass = 'today';
        } else if (j === 1) {
          extraClass = 'off';
        }

        calendarHTML += `<td class="${extraClass}" data-date="${fullDate}">
            <div class="day-number">${dayCount}</div>
            <div class="event-text">${eventText}</div>
          </td>`;
        dayCount++;
      }
    }

    calendarHTML += '</tr>';

    if (dayCount > daysInMonth) break;
  }

  calendarHTML += '</tbody></table>';
  return calendarHTML;
}

function renderCalendars() {
  const calendarContainer = document.getElementById('calendar');
  if (!calendarContainer) {
    console.error('Error: #calendar 要素が見つかりません。index.html に <div id="calendar"></div> を追加してください。');
    return;
  }

  // 現在の月と来月を表示
  const nextMonth = (currentMonth + 1) % 12;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  calendarContainer.innerHTML =
    `<h2>${currentYear}年${currentMonth + 1}月</h2>` +
    createCalendar(currentMonth, currentYear) +
    `<h2>${nextYear}年${nextMonth + 1}月</h2>` +
    createCalendar(nextMonth, nextYear);

  setupClickEvents();
}

function setupClickEvents() {
  document.querySelectorAll('td[data-date]').forEach(cell => {
    cell.addEventListener('click', () => {
      const selectedDate = cell.getAttribute('data-date');
      const currentEvent = scheduleData[selectedDate] || '';
      const newEvent = prompt(`${selectedDate} の予定を入力してください:`, currentEvent);
      if (newEvent !== null) {
        scheduleData[selectedDate] = newEvent;
        renderCalendars(); // 再描画
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCalendars();
});
