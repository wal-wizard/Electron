const { app, Menu, shell } = require("electron");
const { ipcMain } = require('electron');
const { BrowserWindow } = require('electron');

const template = [
    {
        role: "help",
        submenu: [
            {
                label: "About Editor Component",
                click() {
                    shell.openExternal('https://simplemde.com/')
                }
            }
        ]
    },
    // {
    //     label: "Debugging",
    //     submenu: [
    //         {
    //             label: "Dev Tools",
    //             role: "toggleDevTools",
    //             accelerator: "Ctrl+Shift+i"
    //         },
    //         {type: 'separator'},
    //         {
    //             role: 'reload',
    //             accelerator: "Ctrl+R"

    //         }
    //     ]
    // }
    // {
    //     label: "Format",
    //     submenu: [
    //         {
    //             label: "Toggle Bold",
    //             click() {
    //                 const window = BrowserWindow.getFocusedWindow();
    //                 window.webContents.send(
    //                     "editor-event",
    //                     "toggle-bold"
    //                 )
    //             }
    //         }
    //     ]
    // }
]

if (process.platform === "linux") {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "quit" }
        ]
    })
}

if (process.env.DEBUG) {
    template.push({
        label: "Debugging",
        submenu: [
            {
                label: "Dev Tools",
                role: "toggleDevTools"
            },
            { type: "separator" },
            {
                role: "reload",
                accelerator: "Alt+R"
            }
        ]
    })
}

ipcMain.on('editor-reply', (event, arg) => {
    console.log(`Received reply from web page: ${arg}`);
});

// const window = BrowserWindow.getFocusedWindow();
// window.webContents.send('<channel>', args);

const menu = Menu.buildFromTemplate(template);
module.exports = menu;
