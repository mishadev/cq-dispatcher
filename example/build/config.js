var path = require('path')

module.exports = {
		webpackConfigPath: './webpack.conf',
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
    useHotreplace: true,

		port: process.env.PORT || 8801,
		proxyTable: {}
}
