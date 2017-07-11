
//Requiring node.js modules and Electron

const electron = require("electron")
const path = require("path")
const url = require("url")

//Requiring own modules

//Creating a new browserwindow and loading index.html into it
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({width: 1024, height: 768})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true
  }))

mainWindow.webContents.openDevTools()
  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

//App functions
const app = electron.app

app.on("ready",createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})
