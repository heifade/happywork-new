// import { BuildConfig } from "happywork-node-builder";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    file: "index.js",
    mini: true,
    format: "cjs"
  }
} ;
