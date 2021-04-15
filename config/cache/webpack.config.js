const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
  entry: {
    index: { import: './src/index.js', dependOn: ['share', 'react'] },
    other: { import: './src/other.js', dependOn: ['share', 'react'] },
    share: 'lodash',
    react: 'react'
  },
  output: {
    filename: '[name].[chunkhash:6].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: true,
    }),
    new MiniCssPlugin({
      filename: 'index.[chunkhash:6].css',
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
}
