var path = require('path')
var utils = require('./utils')
// var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.prod.conf')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var WebpackScpPlugin = require('./webpack-scp-plugin')
var VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

var isProduction = process.env.NODE_ENV === 'production'

var webpackConfig = merge(baseWebpackConfig, {
    entry: './src/entry-client.js',
    module: {
        rules: utils.styleLoaders({
            sourceMap: false,
            extract: isProduction
        })
    },
    devtool: false,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"client"'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: function (module, count) {
        //         return (
        //             module.resource &&
        //             /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../node_modules')
        //             ) === 0
        //         )
        //     },
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     chunks: ['vendor']
        // }),
        // new ExtractTextPlugin({
        //     filename: utils.assetsPath('css/[name].[contenthash].css')
        // }),
        new VueSSRClientPlugin()
    ]
})

if (process.env.npm_config_deploy) {
    webpackConfig.plugins.push(
        new WebpackScpPlugin(config[process.env.NODE_ENV].deploy)
    )
}

module.exports = webpackConfig
