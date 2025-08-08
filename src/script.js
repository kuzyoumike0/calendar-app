async function fetchSchedules() {
  try {
    const res = await fetch('/api/schedules');
    if (!res.ok) throw new Error('予定の取得に失敗しました');
    const data = await res.json();
    const list = document.getElementById('scheduleList');
    list.innerHTML = '';
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.date} ${item.time} - ${item.name}`;
      list.appendChild(li);
    });
  } catch (err) {
    alert(err.message);
  }
}

document.getElementById('scheduleForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!name || !date) {
    alert('名前と日付を入力してください');
    return;
  }

  try {
    const res = await fetch('/api/schedules', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, date, time }),
    });
    if (!res.ok) throw new Error('予定の追加に失敗しました');

    alert('予定を追加しました');
    document.getElementById('scheduleForm').reset();
    fetchSchedules();
  } catch (err) {
    alert(err.message);
  }
});

// 初期表示で予定取得
fetchSchedules();
