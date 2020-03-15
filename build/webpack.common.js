const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.resolve(__dirname, '../client');

module.exports = {
	entry: {
		app: path.join(root, 'index.js')
	},
	output: {
		path: path.join(root, 'dist'),
		filename: '[name].bundle.js'
	},
	resolve: {
		alias: {
			components: path.join(root, 'components'),
			containers: path.join(root, 'containers')
		},
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.(js|jsx)$/,
				exclude: '/node_modules/',
				include: root,
				use: ['babel-loader', 'astroturf/loader']
			},
			{
				test: /\.(png|jpg|gif|jpeg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: 'assets/[name].[ext]',
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]-[hash:8].[ext]',
							publicPath: 'fonts/',
							outputPath: 'fonts/'
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(root, 'template/index.html'),
			inject: true
		})
	]
};
