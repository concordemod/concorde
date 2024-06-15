import esbuild from "esbuild";

const common = {
  bundle: true,
  minify: true,
  logLevel: "info",
};

const nodeCommon = {
  ...common,
  format: "cjs",
  platform: "node",
  external: ["electron", "original-fs"],
  target: "esnext",
};

await Promise.all([
  esbuild.build({
    ...nodeCommon,
    entryPoints: ["src/injector.js"],
    outfile: "build/injector.js",
  }),
  esbuild.build({
    ...common,
    entryPoints: ["src/renderer.js"],
    platform: "browser",
    format: "iife",
    outfile: "build/renderer.js",
  }),
  esbuild.build({
    ...nodeCommon,
    entryPoints: ["src/preload.js"],
    outfile: "build/preload.js",
  })
]).catch((e) => {
  console.error("An error occured and the build has been stopped:");
  console.error(e.message);
  process.exitCode = 1;
});
