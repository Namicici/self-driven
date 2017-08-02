/**
 * @fileoverview db
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */
'use strict';

var MongoClient = require('mongodb').MongoClient;
var log = require('../common/log.js');


function init(){
	
}


var db = {
	connect: function (uri, options, callback){
		MongoClient.connect(uri, function(err, db){
			log('mongo connected');
			callback(db);
			//db.close();
		});
	}
}


module.exports = db
