const fs = require("fs")
const electron = require('electron')
const path = require('path')
const url = require('url')
const filenames = fs.readdirSync("./sounds")
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({width: 1024, height: 768})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

//mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready',createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})



console.log(filenames)
