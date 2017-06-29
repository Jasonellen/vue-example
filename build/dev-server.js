
require('../config/check-versons')()

var config = require('../config/personal-config')
var opn = require('opn') //用来用默认浏览器打开一个网页(图片/文件都行)
var path = require('path')
var express = require('express')
var webpack = require('webpack')

//node.js http代理中间件，轻松完成链接等操作
//例如 app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
// 		app.listen(3000);
// -> http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
// var proxyMiddleware = require('http-proxy-middleware')

var webpackConfig = require('./webpack.dev.config')

var app = express()
var compiler = webpack(webpackConfig) //创建webpack编译对象

//webpack开发中间件，它为从Webpack发出的文件提供服务
//一般配合webpack-hot-middleware进行热重载
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  // publicPath: webpackConfig.output.publicPath,
	publicPath: '/',
  quiet: true //禁用在控制台输出相关信息(就是说不会打印编译了哪些文件及存放在什么目录)
})
//官方释义：只能配合webpack-dev-middleware使用
//还要配合dev.conf.js的 new webpack.HotModuleReplacementPlugin()实现热更新
//而且自带 编译报错会在网页已蒙版的方式显示，感觉很方便
var hotMiddleware = require('webpack-hot-middleware')(compiler)

//这里主要是要实现html内容改变也可以热更新
//执行webpack的时候就会创建compiler对象，这里compiler绑定对compilation的监听
compiler.plugin('compilation', function (compilation) {
	//在compilation进行文件编译利用html-webpack-plugin插件生成对应的html文件后①
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		// 发布事件 reload,这个事件会在hot-entry.js中接受到，然后刷新②
		hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
//单页SPA，访问错误路由直接渲染/index.html， 配合router/index.js的’*‘设置404页面
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
app.use(hotMiddleware)

// serve pure static assets
//设置静态文件路径->现在可以在html中通过/static访问根目录/static静态文件了，例如 src=/static/xx.png
//app.use('/D', express.static('./static')) 则html中 src=/D/xx.png
app.use('/static', express.static('./static'))

var uri = 'http://localhost:'+config.dev.port

console.log('> Starting dev server...')
//当开发中间件生效的时候打印日志并打开浏览器
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
	if(config.dev.autoOpenBrowser){
		opn(uri)
	}
})

var server = app.listen(config.dev.port)
