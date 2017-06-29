var path = require('path')
var loaders = require('../config/loaders')
var config = require('../config/personal-config')
var _DEV = process.env.NODE_ENV === 'development'

module.exports = {
	// context: __dirname, // string (absolute path!) default root->'/'
  // the home directory for webpack(webpack 运行文件根目录)
  // the entry and module.rules.loader option is resolved relative to this directory

  entry: {
    app: './src/app.js'
		//一开始上面的context是没写的，我看这个目录是不对的，因为启动的路径是build/
		//查了文档，上面的 context不写默认就是根目录，入口entry和loader的路径都是相对于这个目录的
  },
  output: {
    path: config.build.path,
    filename: '[name].js',
		publicPath: '/'
  },
  resolve: {  //解决一些扩展名和别名
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
				  loaders: loaders.cssLoaders({
				    sourceMap: _DEV ? config.dev.cssSourceMap : config.build.cssSourceMap,
				    extract: !_DEV
				  })
				}
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: config.build.imgPath+'/[name].[hash:7].[ext]' //outpath(../dist)基础上
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: config.build.fontPath+'/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
