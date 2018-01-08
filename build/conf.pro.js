var path                =	require('path'),
	utils               =	require('./utils'),
	webpack             =	require('webpack'),
	merge               =	require('webpack-merge'),
	config 				= 	require('../config'),
	baseWebpack         =	require('./webpack.config.js'),
	ExtractTextPlugin   =	require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin   =	require('html-webpack-plugin');

var plugins = [	
	new ExtractTextPlugin(utils.assetsPath('css/[name].css?v=[chunkhash]')), 	//单独使用style标签加载css并设置其路径
	// 提取 vendor
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: function(module, count){
			return 	( 
				module.resource && 
				/\.js$/.test(module.resource) && 
				module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
			)
		}
	}),
	// 提取 vue / vuex / vue-router
	new webpack.optimize.CommonsChunkPlugin({
		name: 'react',
		minChunks: function(module, count){
			return 	( 
				module.resource && 
				/\.js$/.test(module.resource) && 
				module.resource.indexOf(path.join(__dirname, '../node_modules/react')) === 0
			)
		}
	})
];
var pages = {
	index: ['react', 'index', 'vendor']
};
Object.keys(baseWebpack.entry).forEach(function(name){
	var plugin = new HtmlWebpackPlugin({
		filename: path.resolve(__dirname, '../dist/' + name + '.html'),
		template: path.resolve(__dirname, '../src/pages/' + name + '.html'),
		favicon: config.build.favicon,
		inject: true,
		chunks: pages[name], 	
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true
		},
		chunksSortMode: 'dependency'
	});
	plugins.push(plugin);
});
var newWebpack = merge(baseWebpack, {
	// devtool: true ? '#source-map' : false,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: utils.assetsPath('js/[name].js?[chunkhash]')
		/*,chunkFilename: 	utils.assetsPath('js/[id].js')*/
	},
	module: {
		loaders: utils.styleLoaders({ sourceMap: true, extract: true })
	},
	vue: {
		loaders: utils.cssLoaders({
			sourceMap: 	false,
			extract: 	true
		})
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': config.build.env
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new ExtractTextPlugin(utils.assetsPath('css/[name].css?[chunkhash]')), 	//单独使用style标签加载css并设置其路径
	].concat(plugins)
});

module.exports = newWebpack;