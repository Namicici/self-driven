'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.base.conf.js');
var merge = require('webpack-merge');

var proConfig = {
	//devtool: '#source-map'
}

if (process.env.NODE_ENV == 'production'){
	proConfig.plugins = [
		new webpack.optimize.UglifyJsPlugin()
	]
}

module.exports = merge(baseConfig, proConfig);
