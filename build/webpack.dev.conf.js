var config = require('../config')   //使用了config/index.js
var webpack = require('webpack')    //使用webpack
var merge = require('webpack-merge')  //使用webpack配置合并插件
var utils = require('./utils')        //使用一些小工具
var baseWebpackConfig = require('./webpack.base.conf')  //加载webpack.base.conf
//使用html-webpack-plugin插件，这个插件可以帮我们自动生成html并且注入到.html文件中
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
// 将 Hol-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

/* 将我们 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置合并 */
module.exports = merge(baseWebpackConfig, {
  module: {
    // 使用 styleLoaders
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    /* definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串 */
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    // HotModule 插件在页面进行变更的时候只会重回对应的页面模块，不会重绘整个 html
    new webpack.HotModuleReplacementPlugin(),
    //使用了 NoErrorsPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //将 index.html 作为入口，注入 html 代码后生成 index.html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})
