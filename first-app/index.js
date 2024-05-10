// 1. import electron objects
const { app, BrowserWindow } = require('electron');
// 2. reserve a reference to window object
let window;
// 3. wait till application started
app.on('ready', () => {
    // 4. create a new window
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // 5. load window content
    window.loadFile('index.html');
});