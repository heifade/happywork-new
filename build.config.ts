import { BuildConfig } from "happywork-node-builder";

const config: BuildConfig = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    file: "index.js",
    format: "cjs"
  },
  external: ["archive-dir"],
  mini: false
};

export default config;
