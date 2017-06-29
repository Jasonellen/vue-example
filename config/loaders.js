
// 这个文件其实就完成2件事
// 1. 生成cssLoaders用于加载.vue文件中的样式
// 2. 生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件

// 用来提取css到单独的文件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// 生成cssLoaders用于加载.vue文件中的样式
exports.cssLoaders = function (options) {
	options = options || {}
	var cssLoader = {
		loader: 'css-loader',
		options: {
			minimize: process.env.NODE_ENV === 'production',
			sourceMap: options.sourceMap
		}
	}

	// generate loader string to be used with extract text plugin
	// 生成loader的函数
	function generateLoaders (loader, loaderOptions) {
		var loaders = [cssLoader]
		if (loader) {
			loaders.push({
				loader: loader + '-loader',
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			})
		}

		// Extract CSS when that option is specified
		// (which is the case during production build)
		if (options.extract) {
			// 如果需要提取
			return ExtractTextPlugin.extract({
				use: loaders,
				// loader(e.g 'style-loader') that should be used when the CSS is not extracted
				// 提取失败时用 vue-style-loader
				fallback: 'vue-style-loader'
			})
		} else {
			// 不需要提取
			return ['vue-style-loader'].concat(loaders)
		}
	}
	// https://vue-loader.vuejs.org/en/configurations/extract-css.html
	return {
		css: generateLoaders(),
		postcss: generateLoaders(),
		scss: generateLoaders('sass')
	}
}

// Generate loaders for standalone style files (outside of .vue)
// 生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件
exports.styleLoaders = function (options) {
	var output = []
	var loaders = exports.cssLoaders(options)
	for (var extension in loaders) {
		var loader = loaders[extension]
		// 这里 将返回一系列rules例如 {test:'/.css$/',use:generateLoaders()}
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			use: loader
		})
	}
	return output
}
