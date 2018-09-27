/**
 * @fileoverview The main file for back-end server, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

var http = require('http')
var port = 9001
var fs = require('fs')
var router = require('./router.js')
// var bodyParse = require('body-parser')
var log = require('./common/log.js')

// fs.mkdir('./dist/files', '0777', function (err) {
//     if (err) {
//         log(err)
//     }
// })

var server = http.createServer(function (req, res) {
    router(req, res)
})

server.listen(port)
log('server started at ' + port)

process.on("uncaughtException", function(e){
    log(e)
})
