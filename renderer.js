const { ipcRenderer } = require('electron');

const scriptInput = document.getElementById('scriptInput');
const userInput = document.getElementById('userInput');
const runButton = document.getElementById('runButton');
const output = document.getElementById('output');
const cont = document.getElementById('Container');
const submit = document.getElementById('Submit');
runButton.addEventListener('click', () => {
  const filePath = scriptInput.files[0].path;
  ipcRenderer.send('run-script', filePath);
});

ipcRenderer.on('script-output', (event, data) => {
  cont.style.visibility='visible';
  output.textContent += data;

});

ipcRenderer.on('script-exit', (event, code) => {
  output.textContent += `Script exited with code ${code}\n`;
});

// Listen for user input and send it to the main process
Submit.addEventListener('click', (event) => {
  console.log('hoooo')
    const input = userInput.value;
    userInput.value = ''; // Clear the input field
    ipcRenderer.send('user-input', input);



});
