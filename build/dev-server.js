var config = require('../config')  //获取 config/index.js的默认配置
//如果 Node 的环境无法判断当前是 dev / product 环境使用 config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env
var path = require('path')         //使用 NodeJS 自带的文件路径工具
var express = require('express')   //使用express
var webpack = require('webpack')   //使用webpack
var opn = require('opn')           // 一个可以强制打开浏览器并跳转到指定 url 的插件
var proxyMiddleware = require('http-proxy-middleware')  // 使用 proxyTable
var webpackConfig = require('./webpack.dev.conf')       // 使用 dev 环境的 webpack 配置

// default port where dev server listens for incoming traffic
var localIP = process.env.localIP || config.dev.localIP
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware

/* 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置 */
var proxyTable = config.dev.proxyTable

var app = express()   //使用express启动一个服务
var compiler = webpack(webpackConfig)  //启动webpack进行编译

//启动webpack-dev-middleware,将编译后的文件暂存到内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

//启动webpack-hot-middleware，就是我们常说的Hot-reload
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
//将proxyTable中的请求配置挂在启动的express服务上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 将 Hot-reload 挂在到 express 服务上
app.use(hotMiddleware)

// serve pure static assets
//拼接static文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
//为静态资源提供相应服务
app.use(staticPath, express.static('./static'))

//让我们这个express服务监听port的请求, 并且将此服务作为dev-server.js的接口暴露
module.exports = app.listen(port, localIP,function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://' + localIP + ':' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})
