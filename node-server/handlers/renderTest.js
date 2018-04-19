/**
 * @fileoverview Deal with file logics, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

var fs = require('fs')
var file = require('../common/utils.js').file
var log = require('../common/log.js')

function test (req, res) {
    log('test pre fetch for ssr')
    var result = {
        code: '0000',
        message: 'ok',
        data: {
            test: '测试服务器渲染数据预取'
        }
    }
    res.write(JSON.stringify(result))
    res.end()
}


module.exports = {
    test: test
}
