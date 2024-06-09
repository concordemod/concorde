import { dirname, join } from "path"
import electron, { app } from "electron"

console.log("Welcome to Concorde!")

app.whenReady().then(() => {
  electron.session.defaultSession.webRequest.onHeadersReceived(({ responseHeaders }, callback) => {
    const csp = Object.keys(responseHeaders).find((header) => header.toLowerCase() === "content-security-policy")
    delete responseHeaders[csp]
    callback({ cancel: false, responseHeaders })
  })
})

const injectorPath = require.main.filename

const asarPath = join(dirname(injectorPath), "..", "pre.asar")

const discordPkg = require(join(asarPath, "package.json"))

require.main.filename = join(asarPath, discordPkg.main)

app.setAppPath(asarPath)

const ipcManager = (window) => { }

class BrowserWindow extends electron.BrowserWindow {
  constructor(options) {
    const original = options.webPreferences.preload
    options.webPreferences.preload = join(__dirname, "preload.js")
    options.webPreferences.sandbox = false
    process.env.DISCORD_PRELOAD = original
    super(options)
    ipcManager(this)
  }
}

Object.assign(BrowserWindow, electron.BrowserWindow);

const electronPath = require.resolve("electron");

delete require.cache[electronPath].exports

require.cache[electronPath].exports = {
  ...electron,
  BrowserWindow
}

console.log("Concorde loaded! Starting Discord...")

require(require.main.filename)
