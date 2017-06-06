'use strict';

var baseConfig = require('./webpack.base.conf.js');
var merge = require('webpack-merge');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var entryConcat = {};
for (var name in baseConfig.entry){
	var tmp = [];
	tmp.push(hotMiddlewareScript);
	tmp.push(baseConfig.entry[name]);
	entryConcat[name] = tmp;
}

baseConfig.entry = entryConcat;

module.exports = merge(baseConfig, {
    devtool: '#cheap-module-source-map'
})
