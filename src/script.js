document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scheduleForm');
  const list = document.getElementById('scheduleList');

  form.addEventListener('submit', event => {
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
