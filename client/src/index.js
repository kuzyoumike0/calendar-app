// ==============================
// index.js
// Reactアプリのエントリーポイント
// ==============================

// Reactの本体
import React from 'react';

// ReactDOM: Reactコンポーネントを実際のHTMLに描画するためのライブラリ
import ReactDOM from 'react-dom/client';

// アプリ全体のルートコンポーネント（ここから全てが始まる）
import App from './App';

// ==============================
// HTML内の <div id="root"> を取得
// public/index.html にある root 要素をターゲットにする
// ==============================
const rootElement = document.getElementById('root');

// React 18 からは createRoot() を使う
const root = ReactDOM.createRoot(rootElement);

// ==============================
// StrictMode は開発用の安全チェックモード
// 本番環境では影響なし
// ==============================
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ==============================
// この index.js は「起動スイッチ」のような役割
// public/index.html の <div id="root"> に
// Appコンポーネントを描画するだけ
// ==============================
