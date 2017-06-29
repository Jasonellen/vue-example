var path = require('path')
var loaders = require('../config/loaders')
var webpack = require('webpack')
var config = require('../config/personal-config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: loaders.styleLoaders({
      sourceMap: config.build.cssSourceMap,
      extract: config.build.extract
    })
  },
  devtool: false,
  output: {
		//产出路径，后面的路径都是根据这个来的
    path: config.build.path,
    filename: config.build.jsPath+'/[name].[chunkhash:7].js',
    chunkFilename: config.build.jsPath+'/[name].[chunkhash:7].js'
  },
  plugins: [
		//设置全局变量，比如npm start -> cross-env NODE_ENV=development这里只是将development传给了webpack
		//process.env.NODE_ENV==‘development’仅在webpack中有用，在其他文件中无效，通过下面设为全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: config.build.cssPath+'/[name].[contenthash:7].css'
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 解决css重复的问题
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true, //移除注释
        collapseWhitespace: true, //换行被解析
        removeAttributeQuotes: true //移除属性的双引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // 按chunks已依赖关系逐个插入，不然manifest在vender下就可能会报错
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
		// 将entry下所有的模块的公共部分提取到一个通用的chunk中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 生成manifest来检测依赖的插件是否有变动，如果变动了才重新生成vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'] //依赖vendor
    }),
    // copy custom static assets
		//将根目录的static 拷贝到'static'中(outpath+static == dist/static)
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.build.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ])
  ]
})

//build完成后会在浏览器以可视化的形式展示使用了哪些文件，及大小
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
