const path = require('path') 
// const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={ 
	
	entry:  './src/index.ts',
	output: { 
		filename: 'bundle.js', 
		path: path.resolve(__dirname, "public"),
		clean: true,
	
	}, 
	module: { 
		rules: [ 
		{ 
			test: /\.css$/, 
			use: [ 'style-loader', 'css-loader'] 
		},
		{ 
			test: /\.ts$/, 
			use:  'ts-loader',
			include: [path.resolve(__dirname, 'src')]
		}
		] 
	}, 
	// plugins: [

	// 	new HtmlWebpackPlugin({
	
	// 	  title: 'Output Management',
	
	// 	}),
	
	//   ],

	resolve: {
	extensions: ['.ts', '.js', '...'],
	},
} 


