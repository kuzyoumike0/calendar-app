const date = new Date();
const today = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

function createCalendar(year, month) {
    const monthDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let calendarHTML = `<table class="calendar"><thead><tr>`;

    for (let i = 0; i < 7; i++) {
        if (i === 0) {
            calendarHTML += `<th class="sun">${monthDays[i]}</th>`;
        } else if (i === 6) {
            calendarHTML += `<th class="sat">${monthDays[i]}</th>`;
        } else {
            calendarHTML += `<th>${monthDays[i]}</th>`;
        }
    }

    calendarHTML += `</tr></thead><tbody>`;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let dayCount = 1;
    let prevDayCount = daysInPrevMonth - firstDay + 1;

    for (let i = 0; i < 6; i++) {
        calendarHTML += `<tr>`;

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                // 前月の日付（薄グレー）
                calendarHTML += `<td class="mute">${prevDayCount}</td>`;
                prevDayCount++;
            } else if (dayCount > daysInMonth) {
                // 来月の日付（薄グレー）
                let nextMonthDayCount = dayCount - daysInMonth;
                calendarHTML += `<td class="mute">${nextMonthDayCount}</td>`;
                dayCount++;
            } else {
                // 今月の日付
                if (dayCount === today && month === currentMonth && year === currentYear) {
                    calendarHTML += `<td class="today">${dayCount}</td>`;
                } else if (j === 1) {
                    calendarHTML += `<td class="off">${dayCount}</td>`;
                } else if (j === 0) {
                    calendarHTML += `<td class="sun">${dayCount}</td>`;
                } else if (j === 6) {
                    calendarHTML += `<td class="sat">${dayCount}</td>`;
                } else {
                    calendarHTML += `<td>${dayCount}</td>`;
                }
                dayCount++;
            }
        }

        calendarHTML += `</tr>`;

        // 6週目以降の日付が全て来月なら終了
        if (dayCount - daysInMonth > 7) {
            break;
        }
    }

    calendarHTML += `</tbody></table>`;

    return calendarHTML;
}

// 2ヶ月分表示（現在月と翌月）
const calendarContainer = document.getElementById('calendar');
calendarContainer.innerHTML =
    createCalendar(currentYear, currentMonth) +
    createCalendar(currentYear, (currentMonth + 1) % 12);
