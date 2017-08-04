const { resolve } = require("path")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }]
  },
  resolve: {
    alias: {
      Images: resolve(__dirname, "src/assets")
    },
    extensions: [".js", ".ts", ".tsx"]
  },
  devtool: "source-map"
}