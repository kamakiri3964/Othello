const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.join(__dirname, 'docs'),
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.wasm'],
  },
  target: ["web"],
  mode: process.env.NODE_ENV || "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'docs')
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: 'index.html',
      title: 'Othello',
      template: 'src/index.html'
    }),
    new WasmPackPlugin({
      crateDirectory: path.join(__dirname, './wasm-agent'),
      outDir: path.join(__dirname, "pkg")
    })
  ],
  experiments: {
    asyncWebAssembly: true,
  }
};