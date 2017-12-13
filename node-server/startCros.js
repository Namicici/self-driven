/**
 * @fileoverview This file using for test cross domain.
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 22, 2017
 */

var express = require('express')
var app = express()
var port = 9002
// var fs = require('fs')
var urllib = require('url')

app.options('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9001')
    res.header('Access-Control-Allow-Credentials', true) // allow cookie
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With, X-Custom-Header, token, Cookie')
    res.send(200)
})

/* jsonp的请求 */
app.get('/api/client/token', function (req, res) {
    console.log('/api/client/token')
    var data = {
        'code': '0000',
        'token': '11111111'
    }

    var params = urllib.parse(req.url, true)
    console.log(params)

    if (params.query && params.query.callback) {
        // console.log(params.query.callback);
        var str = params.query.callback + '(' + JSON.stringify(data) + ')'// jsonp
        res.writeHead(200, {'Access-Control-Allow-Origin': 'http://localhost:9001',
                            // 'Access-Control-Allow-Methods': 'get',
            'Access-Control-Allow-Credentials': true})
        res.end(str)
    } else {
        console.log('cookie:' + req.headers.cookie)
        res.writeHead(200, {'Access-Control-Allow-Origin': 'http://localhost:9001',
            'Access-Control-Allow-Credentials': true})
        res.end(JSON.stringify(data))// 普通的json
    }
})

app.listen(port)
console.log('server started at ' + port)
