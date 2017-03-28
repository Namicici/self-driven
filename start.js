"use strict";

var express = require('express');
var app = express();
var port = 8080;
var fs = require('fs');

app.use("/", express.static(__dirname + "/dist/"));

//require('./server/routes')(app);

app.get("/ad/list", function(req, res){
    var fileContent = fs.readFileSync("./src/assets/images/swiper/index01.png");
    fs.writeFile('./dist/index01.png', fileContent);
    var fileContent = fs.readFileSync("./src/assets/images/swiper/index02.png");
    fs.writeFile('./dist/index02.png', fileContent);

	res.send([{url:'./index01.png', title:''}, {url:'./index02.png', title:''}]);
})

app.get("/introduct/intrInfo", function(req, res){
    var response = [];
    for (var i = 0; i < 15; i++){
        response.push({title:'方付通借力短信验证码' + Math.random(), content:'在网购日益频繁的当下，网络带给人们便利的同时，也带来了很多安全隐患', pictureUrl:''});
    }
	res.send(response);
})

app.listen(port);
console.log("server start at " + port);
