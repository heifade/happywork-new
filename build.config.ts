import { BuildConfig } from "happywork-node-builder";

const config: BuildConfig = {
  input: {
    index: "src/index.ts"
  },
  output: {
    dir: "dist",
    file: "index.js",
    format: "cjs"
  },
  external: ["archive-dir"],
  mini: true
};

export default config;
