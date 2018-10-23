import { BuildConfig } from "happywork-node-builder";

const config: BuildConfig = {
  input: "src/index.ts",
  output: {
    dir: "bin",
    file: "index.js",
    format: "cjs",
    banner: "#!/usr/bin/env node"
  },
  external: ["archive-dir"],
  mini: false
};

export default config;
