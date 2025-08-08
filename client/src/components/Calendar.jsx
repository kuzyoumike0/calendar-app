import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [sharedData, setSharedData] = useState([]);

  useEffect(() => {
    fetch(`/api/shared/${date.toISOString().split("T")[0]}`)
      .then((res) => res.json())
      .then((data) => setSharedData(data))
      .catch((err) => console.error(err));
  }, [date]);

  return (
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date} />
      <h3>{date.toDateString()} の予定</h3>
      <ul>
        {sharedData.map((slot) => (
          <li key={slot.time_slot}>
            {slot.time_slot}: {slot.participant_count}人
          </li>
        ))}
      </ul>
    </div>
  );
}
