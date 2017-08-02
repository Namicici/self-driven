/**
 * @fileoverview Deal with error logics, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

'use strict';

var log = require('../common/log.js');

function errorHandling(code, res){
	switch (code) {
		case 9404:
			log('This api do not found.');
			res.writeHead(404, 'This api do not found.');
			res.end();
			break;
		default:
	}
}

module.exports = errorHandling
