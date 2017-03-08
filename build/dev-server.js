var _ = require('lodash')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')

var config = require('./config')
var webpackConfig = require(config.webpackConfigPath)

var app = express()
var compiler = webpack(webpackConfig)

var webpackOutputMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: config.outputPublicPath,
	stats: {
		colors: true,
		chunks: false
	}
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
compiler.plugin('compilation', function (compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({ action: 'reload' })
		cb()
	})
})

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
_.each(config.proxyTable, function (options, context) {
	if (_.isString(options)) {
		options = { target: options }
	}
	app.use(proxyMiddleware(context, options))
})

// serve webpack bundle output
app.use(webpackOutputMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

module.exports = app.listen(config.port, function (err) {
	if (err) {
		console.log(err)
		return
	}
	var uri = 'http://localhost:' + config.port
	var now = new Date()
	console.log('Listening at ' + uri)
	console.log('Current time: ' + now.toString() + '\n')
})

