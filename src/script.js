const scheduleForm = document.getElementById('scheduleForm');
const scheduleList = document.getElementById('scheduleList');
const calendarDiv = document.getElementById('calendar');

let schedules = []; // 予定を保存する配列

// 今日の日付など初期情報取得
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth(); // 0-11

// カレンダーを作成する関数
function createCalendar(year, month) {
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  let html = '<table class="calendar"><thead><tr>';

  // 曜日ヘッダー
  daysOfWeek.forEach((day, i) => {
    html += `<th${i === 0 ? ' class="sun"' : i === 6 ? ' class="sat"' : ''}>${day}</th>`;
  });
  html += '</tr></thead><tbody>';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let dayCount = 1;
  let rows = 6;

  for (let i = 0; i < rows; i++) {
    html += '<tr>';
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        html += '<td class="mute"></td>';
      } else if (dayCount > daysInMonth) {
        html += '<td class="mute"></td>';
      } else {
        // 予定を取得
        const daySchedules = schedules.filter(sch => {
          const d = new Date(sch.date);
          return d.getFullYear() === year && d.getMonth() === month && d.getDate() === dayCount;
        });

        let scheduleHTML = '';
        daySchedules.forEach(sch => {
          scheduleHTML += `<div class="schedule-item schedule-${sch.time}">${sch.name} (${sch.time})</div>`;
        });

        const isToday = year === today.getFullYear() && month === today.getMonth() && dayCount === today.getDate();

        html += `<td${isToday ? ' class="today"' : ''}><div>${dayCount}</div>${scheduleHTML}</td>`;
        dayCount++;
      }
    }
    html += '</tr>';
  }

  html += '</tbody></table>';

  calendarDiv.innerHTML = html;
}

// 予定一覧を表示
function updateScheduleList() {
  scheduleList.innerHTML = '';
  schedules.forEach((sch, i) => {
    const li = document.createElement('li');
    li.textContent = `${sch.date} - ${sch.name} (${sch.time})`;
    scheduleList.appendChild(li);
  });
}

// フォーム送信時の処理
scheduleForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!name || !date) return;

  schedules.push({ name, date, time });

  updateScheduleList();
  createCalendar(currentYear, currentMonth);

  scheduleForm.reset();
});

// 初回表示
createCalendar(currentYear, currentMonth);
