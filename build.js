'use strict';

var webpack = require('webpack');
var proConfig = require('./webpack.pro.conf.js');


webpack(proConfig, function(err, stat){
	console.log('build complete');
});
