// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
	build: {
		index: path.resolve(__dirname, '../dist/index.html'),
		path: path.resolve(__dirname, '../dist'),
		staticPath: 'static',
		jsPath: 'static/js',
		imgPath: 'static/assets',
		cssPath: 'static/css',
		fontPath: 'static/font',
		cssSourceMap: true,
		extract: true,
		bundleAnalyzerReport: false // 文件分布浏览器中可视化显示
	},
	dev: {
		port: 8080,
		autoOpenBrowser: true,
		staticPath: 'static',
		cssSourceMap: true
	}
}
