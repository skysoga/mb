// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')

config.build.index = path.resolve(__dirname, '../testdist/index.html')
//测试服务器的静态文件地址还是用这个地址
config.build.assetsPublicPath = "/"
//测试服务器的前端文件另起一个文件夹放
config.build.assetsRoot = path.resolve(__dirname, '../testdist')


var ora = require('ora')          // 一个很好看的 loading 插件
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')


webpackConfig.output.path = config.build.assetsRoot


console.log(      //  输出提示信息 ～ 提示用户请在 http 服务下查看本页面，否则为空白页
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')  // 使用 ora 打印出 loading + log
spinner.start()                                  // 开始 loading 动画

/* 拼接编译输出文件路径 */
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
/* 删除这个文件夹 （递归删除） */
rm('-rf', assetsPath)
/* 创建此文件夹 */
mkdir('-p', assetsPath)
/* 复制 static 文件夹到我们的编译输出目录 */
cp('-R', 'static/*', assetsPath)

//  开始 webpack 的编译
webpack(webpackConfig, function (err, stats) {
  // 编译成功的回调函数
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
