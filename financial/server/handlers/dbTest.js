
'use strict';

//var db = require('../db/index.js');
//var userModel = require('../db/user.js');
var log = require('../common/log.js');
var MongoClient = require('mongodb').MongoClient;

const dbUri = 'mongodb://localhost/financial';

function testDB(params, data, res){
    MongoClient.connect(dbUri, function(err, db){
        log('mongo connected');
        db.createCollection('user', {

        });
        db.collection('user').insertOne({loginName: 'lh', displayName: 'lihan', password: ''});
        var data = db.collection('user').find({displayName: 'lihan'});
        var data = data.cmd.query;
        db.close();
        res.write(JSON.stringify(data));
        res.end();
    });
}

module.exports = testDB;
