const { merge } = require('webpack-merge')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const base = require('./webpack.base.config')
module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new OptimizeCss(),
      new UglifyjsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
})
