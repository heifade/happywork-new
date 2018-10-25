import { BuildConfig } from "happywork-node-builder";

const config: BuildConfig = {
  input: {
    index: "src/index.ts"
  },
  output: {
    dir: "bin",
    file: "index.js",
    format: "cjs",
    banner: "#!/usr/bin/env node"
  },
  external: ["archive-dir"],
  mini: true
};

export default config;
