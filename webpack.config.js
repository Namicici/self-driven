"use strict";

var webpack = require('webpack');
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		home: './src/views/home/index.js',
		personalCenter: './src/views/personalCenter/index.js'
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: '[name].entry.js'
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	resolve: {
	    root: path.join(__dirname, 'node_modules'),
	    alias: {
	        //director: path.join(__dirname, '../libs/js/' + config.resources.director),
	        //jQuery: path.join(__dirname, '../libs/js/' + config.resources.jQuery),
	        //jQueryUi: path.join(__dirname, '../libs/js/' + config.resources.jQueryUi),
	        //jScrollPane: path.join(__dirname, '../libs/js/' + config.resources.jScrollPane),
	        //moment: path.join(__dirname, '../libs/js/' + config.resources.moment)
	        vue: path.join(__dirname, '/node_modules/vue/dist/vue.js'),
			//'mint-ui': path.join(__dirname, '/node_modules/mint-ui/lib/index.js')
	    }
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},{
			test: /\.vue$/,
			exclude: /node_modules/,
			loader: 'vue'
		},{
	        test: /\.css$/,
	        loader: 'style!css'
	    },{
			test:/\.scss$/,
			loader:'style!css!sass'
		},{
	        test: /\.(eot|svg|ttf|woff|woff2)$/,
	        loader: 'file'
	    },{
	        test: /\.(png|jpg|gif|svg)$/,
	        loader: 'file',
	        query: {
	        	name: '[name].[ext]?[hash]'
	    	}
	    }]
    },
	plugins: [
		// Generates default index.html
	    new HtmlWebpackPlugin({
			filename:'index.html',
			template:'src/views/home/index.html',
			inject: true,
			chunks: ['home']
		}),
		// Also generate a test.html
	    new HtmlWebpackPlugin({
			filename: 'personalCenter.html',
			template: 'src/views/personalCenter/index.html',
			inject: true,
			chunks: ['personalCenter']
	    })
  	]
}
