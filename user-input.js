// user-input.js

const { ipcRenderer } = require('electron');

const userInput = document.getElementById('userInput');
const submitInput = document.getElementById('submitInput');

submitInput.addEventListener('click', () => {
  const input = userInput.value;
  ipcRenderer.send('user-input-submitted', input);
  window.close();
});
