var path = require('path')
var webpack = require('webpack')

var config = require('./config')
var utils = require('./utils')

var projectRoot = path.resolve(__dirname, '../')

module.exports = {
	entry: {
		app: projectRoot + '/src/index.js'
	},
	output: {
		path: config.outputPath,
		publicPath: config.outputPublicPath,
		filename: config.outputFilename,
		chunkFilename: config.outputChunkFilename
	},
	resolve: {
		extensions: ['', '.js', '.vue', '.json', '.scss', '.sass', '.svg', '.png', '.jpeg', '.gif'],
		alias: {
			'styles': projectRoot + '/src/styles',
			'static': projectRoot + '/static',
			'vue$': 'vue/dist/vue.common.js',
			'src': projectRoot + '/src',
			'components': projectRoot + '/src/components'
		},
		fallback: projectRoot + '/node_modules'
	},
	resolveLoader: {
		fallback: projectRoot + '/node_modules'
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: 'img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			},
		].concat(utils.getFilesStyleLoaders())
	},
	vue: {
		loaders: utils.getVueStyleLoaders(),
		postcss: utils.getPostCssPlugins(),
	},
	sassLoader: {
		// NOTE: this sass files will be imported to each sass file
		// we have to keep it clean from css styles output
		data:`
			@import '~styles/variables';
		`,
	},
	postcss: utils.getPostCssPlugins(),
	plugins: [
		new webpack.DefinePlugin(config.replaceConfig)
	]
}
