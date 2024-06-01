import { dirname, join } from 'path'
import electron, { app, BrowserWindowConstructorOptions } from 'electron'

const injectorPath = require.main!.filename

const asarPath = join(dirname(injectorPath), '..', '_app.asar')

const discordPkg = require(join(asarPath, 'package.json'))

require.main!.filename = join(asarPath, discordPkg.main)

// @ts-ignore
app.setAppPath(asarPath)

const initIpc = (window: electron.BrowserWindow) => { }

class BrowserWindow extends electron.BrowserWindow {
	constructor(options: BrowserWindowConstructorOptions) {
		options.webPreferences.zoomFactor = 3.0
		options.webPreferences.devTools = false
		super(options)
		initIpc(this)
	}
}

Object.assign(BrowserWindow, electron.BrowserWindow);

const electronPath = require.resolve("electron");

delete require.cache[electronPath]!.exports

require.cache[electronPath]!.exports = {
	...electron,
	BrowserWindow
}

require(require.main!.filename)
