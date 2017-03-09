// https://github.com/shelljs/shelljs
require('shelljs/global')

var path = require('path')
var ora = require('ora')
var webpack = require('webpack')

var config = require('./config')
var webpackConfig = require(config.webpackConfigPath)

console.log(
	'  Tip:\n' +
	'  Built files are meant to be served over an HTTP server.\n' +
	'  Opening index.html over file:// should work also.\n'
)

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
