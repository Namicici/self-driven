/**
 * @fileoverview The main file for back-end server, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

var http = require('http')
var port = 9001
var fs = require('fs')
var urllib = require('url')
var router = require('./router.js')
// var bodyParse = require('body-parser')
var log = require('./common/log.js')

// fs.mkdir('./dist/files', '0777', function (err) {
//     if (err) {
//         log(err)
//     }
// })

var server = http.createServer(function (req, res) {
    var pathname = urllib.parse(req.url).pathname
    var params = urllib.parse(req.url, true)
    params = params.query
    var data = req.body
    var method = req.method.toUpperCase()

    router(method, pathname, params, data, res)
})

server.listen(port)
log('server started at ' + port)
