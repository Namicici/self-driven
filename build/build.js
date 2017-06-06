'use strict';

var webpack = require('webpack');
var rm = require('rimraf');
var proConfig = require('./webpack.pro.conf.js');

rm('../dist', function(err){
	if (err) throw err;
	webpack(proConfig, function(err, stat){
		console.log('build complete');
	});
})
