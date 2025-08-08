import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [schedules, setSchedules] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("全日");

  // データ取得
  useEffect(() => {
    fetch("http://localhost:3001/schedules")
      .then((res) => res.json())
      .then((data) => setSchedules(data))
      .catch((err) => console.error("取得エラー:", err));
  }, []);

  // フォーム送信
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSchedule = {
      name,
      schedule_date: date,
      time_slot: time,
    };

    try {
      const res = await fetch("http://localhost:3001/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchedule),
      });

      if (res.ok) {
        const saved = await res.json();
        setSchedules([...schedules, saved]);
        setName("");
        setDate("");
        setTime("全日");
      }
    } catch (err) {
      console.error("送信エラー:", err);
    }
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
            {s.name} - {s.schedule_date} - {s.time_slot}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
