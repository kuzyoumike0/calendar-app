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
                calendarHTML += `<td class="mute">${prevDayCount}</td>`;
                prevDayCount++;
            } else if (dayCount > daysInMonth) {
                let nextMonthDayCount = dayCount - daysInMonth;
                calendarHTML += `<td class="mute">${nextMonthDayCount}</td>`;
                dayCount++;
            } else {
                const fullDate = `${year}-${month + 1}-${dayCount}`;
                const eventText = scheduleData[fullDate] || "";
                const extraClass = (dayCount === today && month === currentMonth && year === currentYear) ? 'today' : (j === 1 ? 'off' : '');
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
    calendarContainer.innerHTML =
        createCalendar(currentMonth, currentYear) +
        createCalendar(currentMonth + 1, currentYear);
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
                renderCalendars();
            }
        });
    });
}

renderCalendars();
