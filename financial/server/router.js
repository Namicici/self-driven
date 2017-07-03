/**
 * @fileoverview The router for back-end server, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

'use strict';

var log = require('./common/log.js');
var getAdList = require('./handlers/ad.js');
var handlerError = require('./handlers/errorHandling.js');
var path = require('path');
var download = require('./handlers/file.js').download;
var downloadTest = require('./handlers/file.js').downloadTest;
var dbTest = require('./handlers/dbTest.js');
var getIntroductInfo = require('./handlers/introduct.js');

var mapping = {
	'GET /api/ad/list': getAdList,
	'GET /api/db/test': dbTest,
	'GET /api/download/test': downloadTest,
	'GET /api/introduct/intrInfo': getIntroductInfo
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

function router(method, pathname, params, data, res){
	if (pathname == '/'){
		pathname = '/index.html';
	}
	var file = './dist' + pathname;
    var type = MIME[path.extname(file).slice(1)] || 'text/plain';
	if (type != 'text/plain'){
		download(file, type, res);
		return;
	}

	var handlerFun = mapping[method + ' ' + pathname];
	if (typeof(handlerFun) == 'function'){
		handlerFun(params, data, res);
	}else {
		handlerError(9404, res);
	}
}

module.exports  = router;
