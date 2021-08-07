const path = require("path");

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  target: ["web"],
  mode: process.env.NODE_ENV || "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};