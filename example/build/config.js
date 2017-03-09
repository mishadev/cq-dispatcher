var path = require('path')

var _configs = {
	development: {
		webpackConfigPath: './webpack.dev.conf',
		replaceConfig: { 'process.env': { NODE_ENV: '"development"' } },
		cssOutputFilename: 'css/[name].[contenthash].css',
		htmlOutputFilename: 'index.html',
		htmlTemplatePath: 'example/index.html',
		faviconPath: 'example/static/images/favicon.ico',
		outputPath: path.resolve(__dirname, '../dist/static'),
		outputPublicPath: '',
		outputFilename: 'js/[name].js',
		outputChunkFilename: 'js/[id].js',
		inlineCss: true,

		port: process.env.PORT || 8801,
		proxyTable: {}
	},
	production: {
		webpackConfigPath: './webpack.prod.conf',
		replaceConfig: { 'process.env': { NODE_ENV: '"production"' } },
		cssOutputFilename: 'css/[name].[contenthash].css',
		htmlOutputFilename: '../index.html',
		htmlTemplatePath: 'example/index.html',
		faviconPath: 'example/static/images/favicon.ico',
		outputPath: path.resolve(__dirname, '../dist/static'),
		outputPublicPath: 'static/',
		outputFilename: 'js/[name].[chunkhash].js',
		outputChunkFilename: 'js/[id].[chunkhash].js',
		inlineCss: false
	}
}

if (!_configs[process.env.NODE_ENV]) {
	throw new Error(`Could not find configuration for ${process.env.NODE_ENV}`)
}

module.exports = _configs[process.env.NODE_ENV]
