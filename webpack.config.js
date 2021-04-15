const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Happypack = require('happypack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
module.exports = {
  mode: 'production',
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-withimg-loader',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'Happypack/loader?id=js',
      },
      {
        test: /\.less$/,
        use: 'Happypack/loader?id=style',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              limit: 1024,
              esModule: false,
              // publicPath: 'www.txx.com',
            },
          },
          // 'image-webpack-loader'
        ],
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
    new Happypack({
      id: 'js',
      loaders: ['babel-loader'],
    }),
    new Happypack({
      id: 'style',
      use: ['style-loader', 'css-loader', 'less-loader'],
    }),
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production',
      // test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '95-100'
      },
      // minFileSize: 5120,
      // externalImages: {
      //   context: 'static',
      //   destination: 'dist/static/imagemin/',
      // },
    }),
  ],
}
