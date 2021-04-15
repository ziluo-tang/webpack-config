const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.config')
module.exports = merge(base, {
  mode: 'development',
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    open: true,
    historyApiFallback: true
  },
  devtool: 'source-map',
})
