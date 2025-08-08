const form = document.getElementById('schedule-form');
const list = document.getElementById('schedule-list');

const schedules = JSON.parse(localStorage.getItem('schedules')) || [];

function renderSchedules() {
  list.innerHTML = '';
  schedules.forEach((s) => {
    const li = document.createElement('li');
    li.className = 'schedule-item';
    li.innerHTML = `<span>${s.name}</span> さんが <strong>${s.date}</strong> の <strong>${s.time}</strong> に予定を追加しました`;
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!name || !date || !time) return;

  schedules.push({ name, date, time });
  localStorage.setItem('schedules', JSON.stringify(schedules));

  renderSchedules();
  form.reset();
});

renderSchedules();
