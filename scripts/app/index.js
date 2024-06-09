const { homedir } = require("os")
const { join } = require("path")

require(join(homedir(), "/concorde/build/injector.js"))
