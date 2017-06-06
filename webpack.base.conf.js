"use strict";

var webpack = require('webpack');
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: './src/views/index.js',
		//personalCenter: './src/views/personalCenter/index.js'
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: '[name].entry.[hash].js',
		chunkFilename: '[name].[hash].js',
		publicPath: '/'
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
			//exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']})
			//loader: 'style-loader!css-loader'
		},{
			test:/\.scss$/,
			//exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({fallback: 'style-loader', use:['css-loader', 'sass-loader']})
			//loader:'style-loader!css-loader!sass-loader'
		},{
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			//exclude: /node_modules/,
			loader: 'file-loader'
		},{
			test: /\.(png|jpg|gif|svg)$/,
			//exclude: /node_modules/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]?[hash]'
			}
		}]
	},
	resolve: {
		alias: {
			vue: path.join(__dirname, '/node_modules/vue/dist/vue.js'),
			'vue-router': path.join(__dirname, '/node_modules/vue-router/dist/vue-router.js'),
			axios: path.join(__dirname, '/node_modules/axios/dist/axios.js')
		}
	},
	/*postcss: [
        require('autoprefixer') //调用autoprefixer插件,加入各个浏览器的前缀
    ],*/
	plugins: [
		//new webpack.optimize.CommonsChunkPlugin("commons.js"),
		// Generates default index.html
        new webpack.HotModuleReplacementPlugin()
        //,new webpack.NoErrorsPlugin()
		,new ExtractTextPlugin({
			filename: 'app.css',
			allChunks: true})
		,new HtmlWebpackPlugin({
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
