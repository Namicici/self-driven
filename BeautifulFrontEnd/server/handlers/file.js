/**
 * @fileoverview Deal with file logics, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

var fs = require('fs')
var file = require('../common/utils.js').file
var log = require('../common/log.js')

function download (file, type, res) {
    var rs = fs.createReadStream(file)
    res.setHeader('Content-Type', type)
    rs.pipe(res)
}

function downloadTest (params, data, res) {
    setTimeout(function () {
        log('begin to create file!')
        file.copySync('./server/files/test.xlsx', './dist/files/test.xlsx')
        var content = fs.readFileSync('./dist/files/test.xlsx')
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream', // 二进制流，不知道下载文件类型
            'Content-Disposition': 'attachment; filename=test.xlsx'})
        res.write(content)
        // res.end();
        // var buffer = new Buffer(content);
        // log('buffer data: ' + buffer);
        // res.write(buffer);
        res.end()
    }, 10000)
}

module.exports = {
    download: download,
    downloadTest: downloadTest
}
