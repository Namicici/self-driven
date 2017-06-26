/**
 * @fileoverview Deal with ad logics, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

'use strict';

var log = require('../common/log.js');
var fs = require('fs');


/**
 * Copy file from one directory to another directory. It's a sysnc function
 * @param {from, to} arg1 An argument that makes this more interesting.
 */
function copyFile(from, to){
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
        })
    })
}

function copyFile2(from, to){
    var rs = fs.createReadStream(from);
    var ws = fs.createWriteStream(to);
    rs.pipe(ws);
}

function getAdList(params, data, res){
    copyFile2('./server/files/images/index01.png', './dist/index01.png');
    copyFile2('./server/files/images/index02.png', './dist/index02.png');

	res.writeHead(200/*, {'Content-Type': 'text/html'}*/);
    var data = JSON.stringify([{url:'http://localhost:9001/index01.png', title:''}, {url:'http://localhost:9001/index02.png', title:''}]);
	res.write(data);
    res.end();
}

module.exports = getAdList
