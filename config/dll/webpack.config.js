const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    // before(app) {
    //   app.get('/api/user', function(req, res) {
    //     res.json({text: 'aibfk'})
    //     res.end()
    //   })
    // },
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  entry: { index: './src/index.js' },
  output: {
    filename: '[name][hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
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
    // new CleanWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist/manifest'),
    }),
  ],
}
