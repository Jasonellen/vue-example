require('../config/check-versons')()
// 用来控制台打印loading动画
var ora = require('ora')
// 用来删除文件操作
var rm = require('rimraf')
var path = require('path')
// 控制台输出各种颜色
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config/personal-config')
var webpackConfig = require('./webpack.prod.config')

//添加正在buildind的动画
var spinner = ora('building for production...')
spinner.start()
rm(config.build.path, err => {
  if (err) throw err
  webpack(webpackConfig, function (err, status) {
    spinner.stop()
    if (err) throw err
		//编译OK则输出相关信息(只输出文件信息，其他全部false)
    process.stdout.write(status.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
