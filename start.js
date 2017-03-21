"use strict";

var express = require('express');
var app = express();
var port = 8080;



app.use("/", express.static(__dirname + "/dist/"));

//require('./server/routes')(app);

app.listen(port);
console.log("server start at " + port);
