/**
 * @fileoverview The router for back-end server, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

'use strict';

var log = require('./common/log.js');
var urllib = require('url')
var handlerError = require('./handlers/errorHandling.js');
var path = require('path');
var download = require('./handlers/file.js').download;
var downloadTest = require('./handlers/file.js').downloadTest;
var dbTest = require('./handlers/dbTest.js');
var renderTest = require('./handlers/renderTest').test;
var upload = require('./handlers/upload.js').upload;

var mapping = {
	'GET /api/db/test': dbTest,
	'GET /api/download/test': downloadTest,
	'GET /api/test/render': renderTest,
	'POST /api/common/file/upload': upload
}

const MIME = {
    html: 'text/html',
    text: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

function router(req, res){
    var pathname = urllib.parse(req.url).pathname
    var params = urllib.parse(req.url, true)
    params = params.query
	var method = req.method.toUpperCase()

	if (pathname == '/'){
		pathname = '/index.html';
	}
	var file = './dist' + pathname;
    var type = MIME[path.extname(file).slice(1)] || 'text/plain';
	if (type != 'text/plain'){
		download(file, type, res);
		return;
	}
	log('api: ' + pathname)

	var handlerFun = mapping[method + ' ' + pathname];
	if (typeof(handlerFun) == 'function'){
		handlerFun(req, res);
	}else {
		handlerError(9404, res);
	}
}

module.exports  = router;
