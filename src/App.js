import React, { useState } from "react";
import "./App.css";

function App() {
  const [schedules, setSchedules] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("全日");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchedule = { name, date, time };
    setSchedules([...schedules, newSchedule]);
    setName("");
    setDate("");
    setTime("全日");
  };

  return (
    <div className="container">
      <h1>予定追加テスト</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="名前"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="全日">全日</option>
          <option value="昼">昼</option>
          <option value="夜">夜</option>
        </select>
        <button type="submit">追加</button>
      </form>

      <h2>予定一覧</h2>
      <ul>
        {schedules.map((s, index) => (
          <li key={index}>
            {s.name} - {s.date} - {s.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
