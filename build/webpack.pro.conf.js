'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.base.conf.js');
var merge = require('webpack-merge');

module.exports = merge(baseConfig, {
	devtool: '#source-map',
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
			compress: true
		})
	]
});
