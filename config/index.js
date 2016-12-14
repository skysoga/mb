// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var Usercfg = require('./usercfg.js')
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: 'http://oi2tooqla.bkt.clouddn.com/',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    //这里输入自己电脑的固定ip和要设置的监听端口   端口注意不要和别的再使用的冲突
    localIP:Usercfg.localIP||"localhost",
    port: Usercfg.port||8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
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
