const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Happypack = require('happypack')
module.exports = {
  mode: 'production',
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    //devServer代理请求
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        pathRewrite: { '^/api': '' },
      },
    },
    //devServer本地mock数据，模拟服务端返回
    // before(app) {
    //   app.get('/user', (req, res) => {
    //     res.json({ name: 'user', age: 2000 })
    //     res.end()
    //   })
    // },
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
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
    }),
    new CleanWebpackPlugin(),
  ],
}
