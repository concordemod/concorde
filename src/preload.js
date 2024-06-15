import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import electron from "electron";

function rendererLoad() {
  electron.webFrame.executeJavaScript(readFileSync(join(__dirname, "renderer.js"), "utf-8"));
};

function pluginsLoad() {
  const pluginPath = join(homedir(), ".concorde/plugins/");
  readdirSync(pluginPath).forEach(folder => {
    electron.webFrame.executeJavaScript(readFileSync(join(pluginPath, folder, "plugin.js"), "utf-8"));
  });
};

function loadAll() {
  rendererLoad();
  pluginsLoad();
  console.log("Concorde fully loaded!");
};

if (document.readyState === "complete") {
  loadAll();
} else {
  document.addEventListener("DOMContentLoaded", () => loadAll(), {
    once: true
  });
};

require(process.env.DISCORD_PRELOAD);
