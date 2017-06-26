/**
 * @fileoverview Deal with file logics, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

'use strict';

var fs = require('fs');

function download(file, type, res){
	var rs = fs.createReadStream(file);
	res.setHeader('Content-Type', type);
	rs.pipe(res);
}

module.exports = download;
