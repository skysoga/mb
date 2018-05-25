'use strict'
const path = require('path')
const config = require('../config')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
/* 一个 webpack 扩展，可以提取一些代码并且将它们和文件分离开 */
/* 如果我们想将 webpack 打包成一个文件 css js 分离开，那我们需要这个插件 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* 一个可以插入 html 并且创建新的 .html 文件的插件 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

/* 合并 webpack.base.conf.js */
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  /* 是否使用 #source-map 开发工具，更多信息可以查看 DDFE 往期文章 */
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,  /* 编译输出目录 */
    filename: utils.assetsPath('js/[name].[chunkhash].js'),    /* 编译输出文件名 */
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')  // 没有指定输出名的文件输出的文件名
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html

    /* 压缩 js (同样可以压缩 css) //可以不用，用4自带的压缩*/
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true,
          pure_funcs: ['console.log']
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    /* 将 css 文件分离出来 */
    new MiniCssExtractPlugin({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css'  // use contenthash *
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false }, autoprefixer: false }
        : { safe: true, autoprefixer: false }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    /* 输入输出的 .html 文件 */
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,        // 是否注入 html
      minify: {            // 压缩的方式
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new VueLoaderPlugin()
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
        manifest: {
          name: 'manifest',
          minChunks: Infinity
        },
        // 处理异步chunk
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendors'
        }

      }
    },
    runtimeChunk: { name: 'manifest' }, // true
    noEmitOnErrors: true
  }
})

/* 开启 gzip 的情况下使用下方的配置 */
if (config.build.productionGzip) {
   /* 加载 compression-webpack-plugin 插件 */
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

   /* 向webpackconfig.plugins中加入下方的插件 */
  webpackConfig.plugins.push(
    /* 使用 compression-webpack-plugin 插件进行压缩 */
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
