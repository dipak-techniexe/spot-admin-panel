const { resolve } = require("path")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: resolve(__dirname, "dist"),
    historyApiFallback: true
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
            { test: /\.scss$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
        }]
  },
  resolve: {
    alias: {
      Images: resolve(__dirname, "src/assets")
    },
    extensions: [".js", ".ts", ".tsx"]
  },
  devtool: "eval-source-map"
}