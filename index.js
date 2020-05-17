let { BrowserWindow, app } = require('electron')

let win

let boot = () => {
    win = new BrowserWindow({
        width: 1600,
        height: 500,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
    win.webContents.openDevTools()

}

app.on('ready', boot)