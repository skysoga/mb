var path = require('path')  // 使用 NodeJS 自带的文件路径插件
var config = require('../config')   // 引入 config/index.js
var utils = require('./utils')   // 引入一些小工具
var projectRoot = path.resolve(__dirname, '../')  // 拼接我们的工作区路径为一个绝对路径

var env = process.env.NODE_ENV //将 NodeJS 环境作为我们的编译环境
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file

/* 是否在 dev 环境下开启 cssSourceMap ，在 config/index.js 中可配置 */
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
/* 是否在 production 环境下开启 cssSourceMap ，在 config/index.js 中可配置 */
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
/* 最终是否使用 cssSourceMap */
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: {
    app: './src/main.js'   // 编译文件入口
  },
  output: {
    path: config.build.assetsRoot,        // 编译输出的静态资源根路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'                 // 编译输出的文件名
  },
  resolve: {
    extensions: ['', '.js', '.vue'],           // 自动补全的扩展名
    fallback: [path.join(__dirname, '../node_modules')],  // 不进行自动补全或处理的文件或者文件夹
    alias: {
      // 默认路径代理，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
     // .vue 文件配置 loader 及工具 (autoprefixer)
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}

// var path = require('path')
// var config = require('../config')
// var utils = require('./utils')
// var projectRoot = path.resolve(__dirname, '../')
// var webpack = require('webpack')

// var env = process.env.NODE_ENV
// // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// // various preprocessor loaders added to vue-loader at the end of this file
// var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
// var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
// var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
// //独立样式文件
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// //检测重用模块
// var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
// // 在命令行 输入  “PRODUCTION=1 webpack --progress” 就会打包压缩，并且注入md5戳 到 index.html里面
// var production = process.env.PRODUCTION;
// var plugins = [
//   //会将所有的样式文件打包成一个单独的style.css
//   new ExtractTextPlugin( production ? "style.[hash].css" : "style.css" , {
//     disable: false//,
//     //allChunks: true  //所有独立样式打包成一个css文件
//   }),
//   //new ExtractTextPlugin("[name].css" )
//   //自动分析重用的模块并且打包成单独的文件
//   new CommonsChunkPlugin(production ? "vendor.[hash].js" : "vendor.js" ),
//   function(){
//       return this.plugin('done', function(stats) {
//         var content;
//         //这里可以拿到hash值   参考：http://webpack.github.io/docs/long-term-caching.html
//         content = JSON.stringify(stats.toJson().assetsByChunkName, null, 2);
//         console.log('版本是：'+JSON.stringify(stats.toJson().hash));
//         //return fs.writeFileSync('build/assets.json', content);
//       });
//   }
// ];

// module.exports = {
//   entry: {
//     app: './src/main.js'
//   },
//   output: {
//     path: config.build.assetsRoot,
//     publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
//     filename: '[name].js'
//   },
//   resolve: {
//     extensions: ['', '.js', '.vue'],
//     fallback: [path.join(__dirname, '../node_modules')],
//     alias: {
//       'vue$': 'vue/dist/vue',
//       'src': path.resolve(__dirname, '../src'),
//       'assets': path.resolve(__dirname, '../src/assets'),
//       'components': path.resolve(__dirname, '../src/components')
//     }
//   },
//   resolveLoader: {
//     fallback: [path.join(__dirname, '../node_modules')]
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.vue$/,
//         loader: 'vue'
//       },
//       {
//         test: /\.js$/,
//         loader: 'babel',
//         include: projectRoot,
//         exclude: /node_modules/
//       },
//       {
//         test: /\.json$/,
//         loader: 'json'
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//         loader: 'url',
//         query: {
//           limit: 10000,
//           name: utils.assetsPath('img/[name].[hash:7].[ext]')
//         }
//       },
//       // {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")},
//       {test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'autoprefixer', 'sass?sourceMap']},
//       // {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader","css?sourceMap!autoprefixer!sass?sourceMap")},
//       {
//         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
//         loader: 'url',
//         query: {
//           limit: 10000,
//           name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
//         }
//       }
//     ]
//   },
//   /*vue: {
//     loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
//     postcss: [
//       require('autoprefixer')({
//         browsers: ['last 2 versions']
//       })
//     ]
//   },*/
//   plugins : plugins,
//   /*devServer: {
//       proxy: {
//         '/tools/ssc_ajax.ashx': {
//           target: 'http://dafatest.com/tools/ssc_ajax.ashx',
//           secure: false
//         }
//       }
//     }*/
// }
