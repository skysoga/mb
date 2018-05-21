'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')    // 使用 NodeJS 自带的文件路径插件
const Usercfg = require('./usercfg.js')

module.exports = {
  build: { // production 环境

    index: path.resolve(__dirname, '../MB/index.html'),  // 编译输入的 index.html 文件

    // Path
    assetsRoot: path.resolve(__dirname, '../MB'),  // 编译输出的静态资源路径
    assetsSubDirectory: 'static',                    // 编译输出的二级目录
    assetsPublicPath: Usercfg.assetsPublicPath || '/',
    // assetsPublicPath: Usercfg.assetsPublicPath||'/',   // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    //assetsPublicPath: 'http://oi2tooqla.bkt.clouddn.com/',   // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名

    /**
     * Source Maps
     */
    productionSourceMap: false,                       // 是否开启 cssSourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions:['js', 'css', 'html'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {

    // Paths
    assetsSubDirectory: 'static',    // 编译输出的二级目录
    assetsPublicPath: '/',
    proxyTable: {           // 需要 proxyTable 代理的接口（可跨域）
      '/tools/ssc_ajax.ashx': {
        target: Usercfg.APIhost||'http://192.168.3.253:99',
        changeOrigin: true,
        headers:{Origin:Usercfg.Origin||"http://m.dafatest.com"},
        // localAddress:"http://css.dafatest.com",
        secure: false
      },
      '/catch': {
        target: Usercfg.APIhost||'http://192.168.3.253:99',
        changeOrigin: true,
        headers:{Origin:Usercfg.Origin||"http://m.dafatest.com"},
        // localAddress:"http://css.dafatest.com",
        secure: false
      },
      '/LiveApi': {
        target: Usercfg.APIhostLive||'http://55.twtest88.com:8001',
        changeOrigin: true,
        headers:{Origin:Usercfg.Origin||"http://m.dafatest.com"},
        // localAddress:"http://css.dafatest.com",
        secure: false
      },
    },

    //这里输入自己电脑的固定ip和要设置的监听端口   端口注意不要和别的再使用的冲突
    host: Usercfg.localIP || 'localhost', // can be overwritten by process.env.HOST
    port: Usercfg.port || 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  }
}
