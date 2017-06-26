'use strict';

var webpack = require('webpack');
var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var proxyMiddleware = require('http-proxy-middleware');
//var WebpackDevServer = require('webpack-dev-server');
var devConfig = require('./webpack.dev.conf.js');

var compiler = webpack(devConfig);

var app = express();

app.use(webpackDevMiddleware(compiler, {

}))

app.use(webpackHotMiddleware(compiler, {
    log: () => {}
}))

app.use('/', proxyMiddleware({
    target: 'http://localhost:9001',
    changeOrigin: true
}))

app.listen(8088);

/*
const server = new WebpackDevServer(compiler, {
    proxy: {
        '/': {
            target: 'http://localhost:9001',
            //secure: false
        }
    },
    hot: true,
    publicPath: devConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
});

server.listen(8088, "127.0.0.1", function() {
	console.log("Starting server on http://localhost:8088");
});*/
