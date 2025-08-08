import React, { useEffect, useState } from 'react';
import Calendar from './components/Calendar';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchGitHubEvents = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/【ユーザー名】/【リポジトリ名】/issues', {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error('GitHub APIリクエスト失敗');
        }

        const data = await response.json();

        // issue をスケジュールイベント形式に変換
        const parsedEvents = data.map((issue) => ({
          id: issue.id,
          title: issue.title,
          date: issue.created_at.slice(0, 10), // 例: "2025-08-08"
        }));

        setEvents(parsedEvents);
      } catch (error) {
        console.error('エラー:', error);
      }
    };

    fetchGitHubEvents();
  }, []);

  return (
    <div className="App">
      <h1>GitHub スケジュール</h1>
      <Calendar events={events} />
    </div>
  );
}

export default App;
