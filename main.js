const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Enable Node.js integration
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  ipcMain.on('run-script', (event, filePath) => {
    // Spawn the Python script with stdio set to 'pipe'
    pythonProcess = spawn('python', [filePath], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    // Send the stdout of the Python script to the renderer process
    pythonProcess.stdout.on('data', (data) => {
      mainWindow.webContents.send('script-output', data.toString());
    });

    // Send the stderr of the Python script to the renderer process
    pythonProcess.stderr.on('data', (data) => {
      mainWindow.webContents.send('script-output', data.toString());
    });

    // Send the exit code of the Python script to the renderer process
    pythonProcess.on('close', (code) => {
      mainWindow.webContents.send('script-exit', code);
    });

    // Handle messages from the renderer process (user input)
    ipcMain.on('user-input', (event, input) => {
      pythonProcess.stdin.write(input + '\n');
    });
  });
});