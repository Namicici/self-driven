/**
 * @fileoverview user info
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */
'use strict';

var mongoose = require('mongoose');
var db = require('./index.js');
var log = require('../common/log.js');


var Schema = mongoose.Schema;
var userSchema = new Schema({
	loginName: String,
	displayName: String,
	password: String
}, {
	collection: 'user'
})

userSchema.method.hello = function(){
	log(this.displayName ? ('Hello, I am ' + this.displayName) : 'I have no name');
}

var userModel = mongoose.model("User", userSchema);

module.exports = userModel;
