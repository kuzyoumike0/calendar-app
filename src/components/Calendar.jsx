import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const sampleEvents = [
  {
    id: '1',
    title: '全日イベント',
    start: '2025-08-10',
    allDay: true,
    color: '#ff9f89',
  },
  {
    id: '2',
    title: '昼のイベント',
    start: '2025-08-12T13:00:00',
    end: '2025-08-12T18:00:00',
    color: '#89c2ff',
  },
  {
    id: '3',
    title: '夜のイベント',
    start: '2025-08-15T21:00:00',
    end: '2025-08-16T00:00:00',
    color: '#5d3a00',
  },
];

export default function Calendar() {
  const [events, setEvents] = useState(sampleEvents);

  return (
    <div>
      <h2>月間カレンダー</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        eventDisplay="block"
      />
    </div>
  );
}
