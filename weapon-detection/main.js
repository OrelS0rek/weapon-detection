const { app, BrowserWindow } = require('electron')
const path = require('path')


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('client/index.html')
  
  // Add this to help diagnose issues
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)