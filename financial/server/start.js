/**
 * @fileoverview The main file for back-end server, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

"use strict";

var http = require('http');
var port = 9001;
var fs = require('fs');
var urllib = require('url');
var router = require('./router.js');
var bodyParse = require('body-parser');
var log = require('./common/log.js');

var server = http.createServer(function(req, res){
    var pathname = urllib.parse(req.url).pathname;
    var params = urllib.parse(req.url, true);
    var params = params.query;
    var data = req.body;
    var method = req.method.toUpperCase();

    router(method, pathname, params, data, res);
})

server.listen(port);
log('server started at ' + port);

//process.env.NODE_ENV

/*
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('mydb', server, {safe: true});
db.open(function(err, db){
    if (!err){
        console.log('connect db');
    }else {
        console.log(err);
    }
})
*/

// app.use("/", express.static(__dirname + "/dist/"));

//require('./server/routes')(app);


// app.get('/', function(req, res){
//     var params = urllib.parse(req.url, true);
//     console.log(params);
//
//     if (params.query && params.query.token) {
//         res.send()
//     }
// })

// app.get("/api/merchant/index", function(req, res){
//     console.log("/api/merchant/index");
//     res.send({
//         code: "0000",
//         message: "商户暂停",
//         data: {
//             uaType: "ahrcu",
//             uaData: {
//                 shopInfo: {
//                     merchantName: "信e付商户",
//                     outletName: "汇商大厦店",
//                     outletId: "123456",
//                     defaultImage: "94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1492603830&di=69e1e0f611a6e1823a5355c813bc0890&src=http://img3.duitang.com/uploads/item/201603/06/20160306092523_Hk8Ca.jpeg"
//                 },
//                 wxConfig: {
//                     sign: "xxx"
//                 },
//                 point:'123'
//             }
//         }
//     });
// })

// app.get("/api/introduct/intrInfo", function(req, res){
//     log(req.path);
//     var response = [];
//     for (var i = 0; i < 15; i++){
//         response.push({title:'方付通借力短信验证码' + Math.random(), content:'在网购日益频繁的当下，网络带给人们便利的同时，也带来了很多安全隐患', pictureUrl:''});
//     }
// 	res.send(response);
// })
//
//
// app.listen(port);
// console.log("server start at " + port);
