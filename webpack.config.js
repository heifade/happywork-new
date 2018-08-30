const path = require("path");
const babelConfig = require("./babel/babel.config");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: `./src/index.js`
  },
  output: {
    path: path.resolve(__dirname, `./dist`),
    filename: "[name].js",
    libraryTarget: "commonjs"
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: babelConfig()
      }
    ]
  },
  plugins: [
    // __dirname 保留原值
    new webpack.DefinePlugin({
      $dirname: "__dirname"
    })
  ]
};
