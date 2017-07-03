/**
 * @fileoverview Deal with ad logics, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

'use strict';

var log = require('../common/log.js');
var fs = require('fs');
var file = require('../common/utils.js').file;

function getAdList(params, data, res){
    /* 异步方法有可能出现返回的路径还没有存在对应的文件，
    浏览器访问的时候取不到数据，这里在返回数据前要保证文件写入完成 */
    file.copySync('./server/files/images/index01.png', './dist/files/index01.png');
    file.copySync('./server/files/images/index02.png', './dist/files/index02.png');

	res.writeHead(200/*, {'Content-Type': 'text/html'}*/);
    var data = JSON.stringify([{url:'http://localhost:9001/files/index01.png', title:''},
        {url:'http://localhost:9001/files/index02.png', title:''}]);
	res.write(data);
    res.end();
}

module.exports = getAdList
