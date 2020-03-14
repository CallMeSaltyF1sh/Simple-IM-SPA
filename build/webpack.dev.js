const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const root = path.resolve(__dirname, '../client');

module.exports = merge(common, {
	mode: 'development',
	optimization: {
		usedExports: true
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(root, 'dist'),
		compress: true,
		port: 9090,
		hot: true,
		inline: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				pathRewrite: { '^/api': '' }
			}
		}
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
});
