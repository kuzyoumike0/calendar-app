document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scheduleForm');
  const list = document.getElementById('scheduleList');

  if (!form || !list) {
    console.warn("フォームまたはスケジュールリストが見つかりません");
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');

    const name = nameInput?.value.trim();
    const date = dateInput?.value;
    const time = timeInput?.value;

    if (!name || !date) {
      alert('名前と日付は必須です');
      return;
    }

    const dateFormatted = date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日');

    const li = document.createElement('li');
    li.className = 'schedule-item';

    const textSpan = document.createElement('span');
    textSpan.className = 'schedule-name';
    textSpan.textContent = `${dateFormatted} - ${name} さんの予定`;

    const timeSpan = document.createElement('span');
    timeSpan.className = `schedule-time schedule-${time}`;
    timeSpan.textContent = `（${time === 'morning' ? '朝' : time === 'afternoon' ? '昼' : '夜'}）`;

    li.appendChild(textSpan);
    li.appendChild(timeSpan);

    list.appendChild(li);

    form.reset();
  });
});
