import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // グローバルCSSを使う場合

// React 18 の新しい root API を使用
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
