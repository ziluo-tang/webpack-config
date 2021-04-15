const express = require('express')
const webpack = require('webpack')
const devMiddleWare = require('webpack-dev-middleware')

const app = express()

const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(devMiddleWare(compiler))

app.get('/api/user', (req, res) => {
  res.json({name: 'user', age: 2000})
  res.end()
})
app.listen(8888)
console.log('server running 8888');