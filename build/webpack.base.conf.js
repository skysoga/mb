var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
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
