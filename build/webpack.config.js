var webpack =	require('webpack'),
	path 	=	require('path'),
	config  = 	require('../config'),
	glob 	=	require('glob'),
	utils	=	require('./utils'),
// 帮助生成 HTML 文件，在 body 元素中，使用 script 来包含所有你的 webpack bundles，只需要在你的 webpack 配置文件中如下配置：
	HtmlWebpackPlugin = require('html-webpack-plugin'),
// 搭配html-webapck-plugin使用,将css作为chunk追加到对应html中
	ExtractTextPlugin = require('extract-text-webpack-plugin');

var isPro = process.env.NODE_ENV == 'production';

function getEntry(globPath) {
  	var entries = {}, basename;
	glob.sync(globPath).forEach(function (entry) {
		basename = path.basename(entry, path.extname(entry));
		entries[basename] = [];
		// entries[basename].push(entry);
		entries[basename].push(entry);
	});
	return entries;
}
var entries = getEntry("./src/views/*/*.jsx"); // 获得入口js文件

module.exports = {
	target: 'electron',
	entry: entries,
	output: {
		path: config.build.assetsRoot,
		// [name] 替换成chunk名称， [hash] 替换成对应chunk 的 hash 值, 解决hash的方式: 静态资源引入采用 import 方式
		filename: '[name].js', // 使用chunkhash : '[name]-[hash].js'
		publicPath: isPro ? config.build.assetsPublicPath : config.dev.assetsPublicPath // 文件引入路径
	},
	module: {
		preLoaders: [
			{
				test: /\.js[x]$/,
					loader: 'eslint',
					include: [
					path.join(__dirname, '../src')
				],
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.js[x]?$/,
				exclude:  /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react']
				},
			},
			{
				test: /\.json$/,
				loader: 'json',
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: utils.assetsPath('images/[name].[ext]'),
				}
			}
		]
	},
	resolve: {
		alias: {
			'src'		: path.resolve(__dirname, '../src'),
			'config'	: path.resolve(__dirname, '../config'),
			'Redux'		: path.resolve(__dirname, '../src/Redux'),
			'js'		: path.resolve(__dirname, '../src/assets/js'),
			'sass'		: path.resolve(__dirname, '../src/assets/sass'),
			'components': path.resolve(__dirname, '../src/components'),
			'ui'		: path.resolve(__dirname, '../src/components/ui'),
			'plugin'	: path.resolve(__dirname, '../src/plugin'),
			'Views'		: path.resolve(__dirname, '../src/views'),
			'utils'		: path.resolve(__dirname, '../src/utils'),
			'tools'		: path.resolve(__dirname, '../src/tools'),
			'libraries'		: path.resolve(__dirname, '../src/libraries'),
			'dist'		: path.resolve(__dirname, '../dist'),
		}
	},
	postcss: [ require('autoprefixer') ],
		node: {
		fs: 'empty'
	},
	// externals:{
    //     'jquery': 'window.jQuery',
    // }
};
