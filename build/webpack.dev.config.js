var loaders = require('../config/loaders')
var webpack = require('webpack')
var config = require('../config/personal-config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
//将热更新添加到入口文件
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/hot-entry'].concat(baseWebpackConfig.entry[name])
})

//合并配置文件
module.exports = merge(baseWebpackConfig, {
  module: {
		//增加一些规则 { test: /\.css$/, use: [ 'vue-style-loader', ... ] } 但不提取css
    rules: loaders.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
		//设置全局变量，比如npm start -> cross-env NODE_ENV=development这里只是将development传给了webpack
		//process.env.NODE_ENV=='"development"'仅在webpack中有用，在其他文件中无效，通过下面设为全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'  //2个引号是必须的
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
		// 页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true  //将JS资源放在body元素底部
    }),
		//webpack报错在命令行给出友好的提示
    new FriendlyErrorsPlugin()
  ]
})
