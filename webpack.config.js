const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: __dirname + '/src/app/index.js',
	devtool: 'inline-source-map',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-object-rest-spread'],
					},
				},
				exclude: [/node_modules/],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
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
