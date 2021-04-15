const express = require('express')
const webpack = require('webpack')
const devMiddleWare = require('webpack-dev-middleware')

const app = express()

const config = require('./webpack.config.js')
const compiler = webpack(config)
//服务端加载webpack执行，前后端部署在同一个端口下，不存在跨域
app.use(devMiddleWare(compiler))

app.get('/user', (req, res) => {
  res.json({name: 'user', age: 2000})
  res.end()
})
app.listen(8888)
console.log('server running 8888');