document.getElementById('schedule-form').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const list = document.getElementById('schedule-list');

  const div = document.createElement('div');
  div.textContent = `${date} - ${title}`;
  list.appendChild(div);

  e.target.reset();
});
<body>
  ...
  <script src="script.js"></script>
</body>
