import { BuildConfig } from "happywork-node-builder";

const config: BuildConfig = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    file: "index.js",
    format: "cjs"
  },
  mini: true
};

export default config;
