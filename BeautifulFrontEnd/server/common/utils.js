/**
 * @fileoverview Common tools
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

'use strict';

var log = require('./log.js');
var fs = require('fs');
//var request = require('request');

/**
 * Copy file from one directory to another directory. It's a sysnc function
 * @param {from, to} arg1 An argument that makes this more interesting.
 */
function copyFile(from, to, callback){
    fs.readFile(from, (err, data) => {
        if (err){
            log('read file error: ' + err);
            return;
        }
        log('read file complete, start to write file');
        fs.writeFile(to, (err, data) => {
            if (err){
                log('write file error: ' + err);
                return;
            }
            log('write file complete');
            callback();
        })
    })
}

function copyFileSync(from, to){
    var rs = fs.readFileSync(from);
     fs.writeFileSync(to, rs);
}

/* 异步方法 */
function copyFile2(from, to){
    var rs = fs.createReadStream(from);
    var ws = fs.createWriteStream(to);
    rs.pipe(ws);
}

module.exports = {
	file: {
		copySync: copyFileSync,
		copySync2: copyFile,
		copy: copyFile2
	}
}
