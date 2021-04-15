const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Happypack = require('happypack')
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
        use: 'Happypack/loader?id=js',
      },
      {
        test: /\.less$/,
        use: 'Happypack/loader?id=style',
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
    new CleanWebpackPlugin(),
    new Happypack({
      id: 'js',
      loaders: ['babel-loader'],
    }),
    new Happypack({
      id: 'style',
      use: ['style-loader', 'css-loader', 'less-loader'],
    }),
  ],
}
