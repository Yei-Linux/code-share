import { build } from "esbuild";
import dts from "npm-dts";

new dts.Generator({
  entry: "index.ts",
  output: "dist/index.d.ts",
}).generate();

const sharedConfig = {
  entryPoints: ["index.ts"],
  bundle: true,
  minify: true,
};

build({
  ...sharedConfig,
  platform: "node", // for CJS
  outfile: "dist/index.cjs",
});

build({
  ...sharedConfig,
  outfile: "dist/index.esm.js",
  platform: "node", // for ESM
  format: "esm",
});
