const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports =merge ( common, { 
	mode: 'production',
    // devtool can help in prod debugging but don't use eval or inline-source-map
    devtool: 'source-map'

} )
