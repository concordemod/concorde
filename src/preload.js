import { readFileSync } from "fs"
import { join } from "path"
import electron from "electron"

function rendererLoad() {
  console.log("%cWelcome to Concorde!", "color: white; padding: 15px; font-size: 25px; background-color: black; border-radius: 10px;", "\n\n Go to https://github.com/concordemod/concorde/issues to report any issues you may have.")
  electron.webFrame.executeJavaScript(readFileSync(join(__dirname, "renderer.js"), "utf-8"))
}

if (document.readyState === "complete") {
  rendererLoad()
} else {
  document.addEventListener("DOMContentLoaded", () => rendererLoad(), {
    once: true
  })
}

require(process.env.DISCORD_PRELOAD)
