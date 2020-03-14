const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

const root = path.resolve(__dirname, '../client');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'souce-map',
	plugins: [
		new UglifyJsPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(root, 'template/index.html'),
			filename: 'index.html',
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				removeComments: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true
			}
		})
	]
});
