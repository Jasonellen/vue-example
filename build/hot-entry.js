/* eslint-disable */
//兼容IE，入口main.js已经使用了es6-promise，这里好像就不需要了
// require('eventsource-polyfill')

// 热更新入口，需要加入到开发环境 entry中完成热更新
var hotClient = require('webpack-hot-middleware/client?noInfo=false&reload=true')
//这段代码的意思是改变入口html的内容自动刷新页面，完成热更新
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
