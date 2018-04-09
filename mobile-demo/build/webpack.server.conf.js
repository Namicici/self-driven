const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const config = require('../config')

var isProduction = process.env.NODE_ENV === 'production'

module.exports = merge(base, {
    target: 'node',
    devtool: '#source-map',
    entry: './src/entry-server.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    module: {
        rules: utils.styleLoaders({
            sourceMap: false,
            extract: isProduction
        }, {
            test: /\.css$/,
            // 重要：使用 vue-style-loader 替代 style-loader
            use: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader'
            })
        })
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     filename: '../dist/index.template.html',
        //     template: 'index.template.html',
        //     inject: true,
        //     minify: {
        //         // removeComments: true,
        //         collapseWhitespace: true,
        //         removeAttributeQuotes: true
        //         // more options:
        //         // https://github.com/kangax/html-minifier#options-quick-reference
        //     },
        //     // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        //     chunksSortMode: 'dependency'
        // }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"server"'
        }),
        new VueSSRServerPlugin()
    ]
})
