import { BuildConfig } from "happywork-node-builder";

const config: BuildConfig = {
  input: {
    index: "src/index.ts"
  },
  output: [
    {
      dir: "lib",
      file: "index.js",
      format: "cjs"
    }
  ],
  mini: false
};

export default config;
