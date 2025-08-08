document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scheduleForm');
  const list = document.getElementById('scheduleList');

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

    // 日付表示を日本語っぽくフォーマット (例: 2025-08-08 → 2025年08月08日)
    const dateFormatted = date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日');

    // テキストと時間帯ラベルを分けて作る
    const textSpan = document.createElement('span');
    textSpan.textContent = `${dateFormatted} - ${name} さんの予定`;

    const timeSpan = document.createElement('span');
    timeSpan.textContent = time;
    timeSpan.className = `schedule-time-${time}`;

    li.appendChild(textSpan);
    li.appendChild(timeSpan);

    list.appendChild(li);

    form.reset();
  });
});
