console.log('script.jsが読み込まれました');

function createCalendar(month, year) {
  const monthDays = ["日", "月", "火", "水", "木", "金", "土"];
  let calendarHTML = '<table class="calendar"><thead><tr>';

  monthDays.forEach(day => {
    calendarHTML += `<th>${day}</th>`;
  });

  calendarHTML += '</tr></thead><tbody>';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let dayCount = 1;
  for (let i = 0; i < 6; i++) {
    calendarHTML += '<tr>';
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        calendarHTML += '<td></td>';
      } else if (dayCount > daysInMonth) {
        calendarHTML += '<td></td>';
      } else {
        calendarHTML += `<td>${dayCount}</td>`;
        dayCount++;
      }
    }
    calendarHTML += '</tr>';
    if (dayCount > daysInMonth) break;
  }

  calendarHTML += '</tbody></table>';
  return calendarHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scheduleForm');
  const list = document.getElementById('scheduleList');
  const calendarDiv = document.getElementById('calendar');

  // 今日の年月でカレンダー表示
  const today = new Date();
  calendarDiv.innerHTML = createCalendar(today.getMonth(), today.getFullYear());

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!name || !date) {
      alert('名前と日付は必須です');
      return;
    }

    const li = document.createElement('li');
    li.textContent = `${date} - ${name} さんの予定 (${time})`;
    list.appendChild(li);

    form.reset();
  });
});
