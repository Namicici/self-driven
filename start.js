"use strict";

var express = require('express');
var app = express();
//var router = app.router();
var port = 9001;
var fs = require('fs');
var urllib = require('url');

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
app.use("/", express.static(__dirname + "/dist/"));

//require('./server/routes')(app);


// app.get('/', function(req, res){
//     var params = urllib.parse(req.url, true);
//     console.log(params);
//
//     if (params.query && params.query.token) {
//         res.send()
//     }
// })
//
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
//
// /*jsonp的请求*/
// app.get("/api/client/token", function(req, res){
//     console.log('/api/client/token');
//     var data = {
//         "code":"0000",
//         "token":"11111111"
//     };
//
//     var params = urllib.parse(req.url, true);
//     console.log(params);
//
//     if (params.query && params.query.callback) {
//         //console.log(params.query.callback);
//         var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
//             res.end(str);
//         } else {
//             res.end(JSON.stringify(data));//普通的json
//     }
// })

app.get("/api/ad/list", function(req, res){
    console.log(req.path);
    var fileContent = fs.readFileSync("./src/assets/images/swiper/index01.png");
    fs.writeFile('./dist/index01.png', fileContent);
    var fileContent = fs.readFileSync("./src/assets/images/swiper/index02.png");
    fs.writeFile('./dist/index02.png', fileContent);

	res.send([{url:'./index01.png', title:''}, {url:'./index02.png', title:''}]);
})

app.get("/api/introduct/intrInfo", function(req, res){
    console.log(req.path);
    var response = [];
    for (var i = 0; i < 15; i++){
        response.push({title:'方付通借力短信验证码' + Math.random(), content:'在网购日益频繁的当下，网络带给人们便利的同时，也带来了很多安全隐患', pictureUrl:''});
    }
	res.send(response);
})


app.listen(port);
console.log("server start at " + port);
