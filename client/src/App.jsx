// src/App.jsx
import React, { useEffect, useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const date = e.target.date.value;
    const time = e.target.time.value;

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, date, time }),
    })
      .then(res => res.json())
      .then(newEvent => {
        setEvents(prev => [...prev, newEvent]);
        e.target.reset();
      })
      .catch(console.error);
  };

  return (
    <div>
      <h1>スケジュール登録</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="名前" required />
        <input type="date" name="date" required />
        <select name="time" required>
          <option value="全日">全日</option>
          <option value="昼">昼</option>
          <option value="夜">夜</option>
        </select>
        <button type="submit">追加</button>
      </form>

      <h2>登録済みスケジュール</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name} さんの予定: {event.date} - {event.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
