'use strict';

var webpack = require('webpack');
var proConfig = require('./webpack.pro.conf.js');

var compiler = webpack(proConfig, function(err, stat){
	console.log('build complete');
});

if (process.env.NODE_ENV == 'dev'){
	console.log('watching start');
	compiler.watch({
		watchOptions: {
			ignored: '/node_modules/'
		}
	}, function(err, stats){
		console.log('watching');
	})
}
