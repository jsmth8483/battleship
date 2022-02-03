const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: __dirname + '/src/app/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/src/public/index.html',
			inject: 'body',
		}),
	],
	devServer: {
		static: './src/public',
		port: 7700,
	},
};
