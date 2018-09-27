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

function downloadTest (req, res) {
    // setTimeout(function () {
        log('begin to create file!')
        // file.copySync('./server/files/test.xlsx', './dist/files/test.xlsx')
        var content = fs.readFileSync('./files/test.xlsx')

        res.writeHead(200, {
            'Content-Type': 'application/octet-stream', // 二进制流，不知道下载文件类型
            'Content-Disposition': 'attachment; filename=test.xlsx',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': 'Content-Disposition'  // 暴露这个header字段后可以在程序中取到这个值，否者可能获取不到response中的header中的值
        })
        res.write(content)
        // res.end();
        // var buffer = new Buffer(content);
        // log('buffer data: ' + buffer);
        // res.write(buffer);
        console.log(content)
        res.end()
    // }, 10000)
}

module.exports = {
    download: download,
    downloadTest: downloadTest
}
