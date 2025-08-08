<form id="scheduleForm">
  <input type="text" id="name" placeholder="名前" required>
  <input type="date" id="date" required>
  <select id="time">
    <option value="morning">朝</option>
    <option value="afternoon">昼</option>
    <option value="night">夜</option>
  </select>
  <button type="submit">追加</button>
</form>

<ul id="scheduleList"></ul>
