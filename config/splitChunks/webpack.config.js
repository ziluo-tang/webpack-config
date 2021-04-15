const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    other: './src/other.js',
  },
  output: {
    filename: '[name][hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
          filename: 'common.js',
        },
        vendor: {
          priority: 1,
          chunks: 'initial',
          test: /node_module/,
          minSize: 0,
          minChunks: 1,
          filename: 'vendor.js',
        },
      },
    },
  },
  resolve: {
    extensions: ['.jsx', '.mjs', '.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new CleanWebpackPlugin(),
  ],
}
