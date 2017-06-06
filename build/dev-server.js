'use strict';

var Webpack = require('webpack');
var express = require('express');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var WebpackHotMiddleware = require('webpack-hot-middleware');
var proxyMiddleware = require('http-proxy-middleware');
//var WebpackDevServer = require('webpack-dev-server');
var devConfig = require('./webpack.dev.conf.js');

var compiler = Webpack(devConfig);

var app = express();

app.use(WebpackDevMiddleware(compiler, {

}))

app.use(WebpackHotMiddleware(compiler, {
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
