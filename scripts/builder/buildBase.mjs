import esbuild from "esbuild"

const commonOpts = {
  bundle: true,
  sourcemap: "external",
  minify: true
}

const nodeCommonOpts = {
  ...commonOpts,
  format: "cjs",
  platform: "node",
  target: ["esnext"],
  external: ["electron", "original-fs"]
}

await Promise.all([
  esbuild.build({
    ...nodeCommonOpts,
    entryPoints: ["src/injector.js"],
    outfile: "build/injector.js"
  }),
  esbuild.build({
    ...commonOpts,
    entryPoints: ["src/renderer.js"],
    format: "iife",
    outfile: "build/renderer.js"
  }),
  esbuild.build({
    ...nodeCommonOpts,
    entryPoints: ["src/preload.js"],
    outfile: "build/preload.js"
  })
]).catch((e) => {
  console.error("An error occured and the build has been stopped:")
  console.error(e.message)
  process.exitCode = 1
})
