// https://github.com/shelljs/shelljs
require('shelljs/global')

var path = require('path')
var ora = require('ora')
var webpack = require('webpack')

var config = require('./config')
var webpackConfig = require(config.webpackConfigPath)

var spinner = ora('building for production...')
spinner.start()

rm('-rf', config.outputPath)
mkdir('-p', config.outputPath)

webpack(webpackConfig, function (err, stats) {
	spinner.stop()
	if (err) throw err
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n')
})
