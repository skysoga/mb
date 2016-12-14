// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')    // 使用 NodeJS 自带的文件路径插件
var Usercfg = require('./usercfg.js')
module.exports = {
  build: { // production 环境
    env: require('./prod.env'),    // 使用 config/prod.env.js 中定义的编译环境
    index: path.resolve(__dirname, '../dist/index.html'),  // 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../dist'),  // 编译输出的静态资源路径
    assetsSubDirectory: 'static',                    // 编译输出的二级目录
    assetsPublicPath: 'http://oi2tooqla.bkt.clouddn.com/',   // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: false,                       // 是否开启 cssSourceMap
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    
    productionGzip: true,
   
  },
  dev: { // dev 环境
    env: require('./dev.env'),   // 使用 config/dev.env.js 中定义的编译环境
    //这里输入自己电脑的固定ip和要设置的监听端口   端口注意不要和别的再使用的冲突
    localIP:Usercfg.localIP||"localhost",
    port: Usercfg.port||8080,
    assetsSubDirectory: 'static',    // 编译输出的二级目录
    assetsPublicPath: '/',
    proxyTable: {           // 需要 proxyTable 代理的接口（可跨域）
        '/tools/ssc_ajax.ashx': {
          target: Usercfg.APIhost||'http://192.168.3.253:99',
          changeOrigin: true,
          secure: true
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
