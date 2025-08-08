<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>スケジュール管理カレンダー</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>🌸 スケジュール管理</h1>
    <form id="schedule-form">
      <input type="text" id="title" placeholder="予定名を入力" required>
      <input type="date" id="date" required>
      <button type="submit">追加</button>
    </form>

    <div id="schedule-list" class="schedule-list">
      <!-- ここに予定が追加されます -->
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
