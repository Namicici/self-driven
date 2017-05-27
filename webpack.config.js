"use strict";

var webpack = require('webpack');
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//var env = process.env.NODE_ENV

module.exports = function(){
	var config = {
		entry: {
			app: './src/views/index.js',
			//personalCenter: './src/views/personalCenter/index.js'
		},
		output: {
			path: path.join(__dirname, "dist"),
			filename: '[name].entry.js',
			chunkFilename: '[name].js'
		},
		resolve: {
		    alias: {
		        vue: path.join(__dirname, '/node_modules/vue/dist/vue.js'),
				'vue-router': path.join(__dirname, 'node_modules/vue-router/dist/vue-router.js'),
				axios: path.join(__dirname, 'node_modules/axios/dist/axios'),
		    }
		},
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options:{
					plugins:['transform-runtime']
				}
			},{
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader'
			},{
		        test: /\.css$/,
				loader: 'style-loader!css-loader'
		    },{
				test:/\.scss$/,
				loader:'style-loader!css-loader!sass-loader'
			},{
		        test: /\.(eot|svg|ttf|woff|woff2)$/,
			    loader: 'file-loader'
		    },{
		        test: /\.(png|jpg|gif|svg)$/,
			    loader: 'file-loader',
		        options: {
		        	name: '[name].[ext]?[hash]'
		    	}
		    }]
	    },
		plugins: [
			//new webpack.optimize.CommonsChunkPlugin("commons.js"),
			// Generates default index.html
		    new HtmlWebpackPlugin({
				filename:'index.html',
				template:'src/views/index.html',
				inject: true,
				chunks: ['app']
			}),
			// Also generate a test.html
			/*
		    new HtmlWebpackPlugin({
				filename: 'personalCenter.html',
				template: 'src/views/personalCenter/index.html',
				inject: true,
				chunks: ['personalCenter'] //对应entry的入口文件
		    })*/
	  	]
	}
	if (process.env.NODE_ENV == 'production'){
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compress: true
			})
		)
	}
	return config;
}
