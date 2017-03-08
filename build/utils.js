var _ = require('lodash')

var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config')

var _getRelativePublicPath = function(filename) {
	var publicPath = _(path.dirname(filename))
		.split(path.sep)
		.map(_.partial(_.identity, '..' + path.sep))
		.join('');

	return publicPath;
}

var _extract = function(loaders) {
	var loader = config.inlineCss ?
		'vue-style-loader!' + loaders :
		// NOTE: publicPath option use to resolve relative url() is css
		// it's relative to css output filename
		ExtractTextPlugin.extract(loaders,
			{ publicPath: _getRelativePublicPath(config.cssOutputFilename) })

	return loader
}

exports.getVueStyleLoaders = function () {
	// NOTE: postcss-loader is unessesery here becouse
	// vue-loader has build in postcss functionality
	var loaders = {
		css: _extract('css-loader!resolve-url-loader'),
		scss: _extract('css-loader!resolve-url-loader!sass-loader?sourceMap'),
		sass: _extract('css-loader!resolve-url-loader!sass-loader?sourceMap&indentedSyntax')
	}

	return loaders
}

exports.getPostCssPlugins = function () {
	var plugins = [
		require('autoprefixer')({ browsers: ['last 2 versions'] })
	]

	return plugins
}

exports.getFilesStyleLoaders = function () {
	var rules = [
	{
		test: /\.css$/,
		loader: _extract('css-loader?importLoaders=2!resolve-url-loader!postcss-loader')
	},
	{
		test: /\.scss$/,
		loader: _extract('css-loader!resolve-url-loader!postcss-loader!sass-loader?sourceMap')
	},
	{
		test: /\.sass$/,
		loader: _extract('css-loader!resolve-url-loader!postcss-loader!sass-loader?sourceMap&indentedSyntax')
	}]

	return rules
}
