const cssLoader = document.createElement("style")
cssLoader.id = "css-loader"
cssLoader.textContent = "@import url('https://catppuccin.github.io/discord/dist/catppuccin-mocha.theme.css');"
document.documentElement.append(cssLoader)
console.log("All Concorde plugins loaded!")
