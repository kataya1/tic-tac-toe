const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {

	entry: {
		index: './src/index.ts'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, "public"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ts$/,
				use: 'ts-loader',
				include: [path.resolve(__dirname, 'src')]
			},
			{
				test: /\.html$/,
				use: 'html-loader',
				include: [path.resolve(__dirname, 'src')]
			}
		]
	},
	plugins: [
		new WorkboxPlugin.GenerateSW({
			// these options encourage the ServiceWorkers to get in there fast
			// and not allow any straggling "old" SWs to hang around
			clientsClaim: true,
			skipWaiting: true,

		}),
		new HtmlWebpackPlugin({
			title: 'Output Management',
			template: './src/temp.html'
		}),

	],

	resolve: {
		extensions: ['.ts', '.js', '...'],
	},
}


