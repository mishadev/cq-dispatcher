var _ = require('lodash')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var baseWebpackConfig = require('./webpack.base.conf')
var config = require('./config')

// add hot-reload related code to entry chunks
if (config.useHotreplace) {
	baseWebpackConfig.entry = _.mapValues(baseWebpackConfig.entry,
	function(entry) {
		return ['./build/dev-client'].concat(entry)
	})
}

module.exports = merge(baseWebpackConfig, {
	// eval-source-map is faster for development
	devtool: '#eval-source-map',
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		config.useHotreplace && new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin(config.cssOutputFilename),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: config.htmlOutputFilename,
			template: config.htmlTemplatePath,
			favicon: config.faviconPath,
			inject: true
		})
	].filter(Boolean)
})
