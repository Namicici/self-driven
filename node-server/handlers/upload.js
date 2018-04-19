/**
 * @fileoverview Deal with file logics, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

var fs = require('fs')
var file = require('../common/utils.js').file
var log = require('../common/log.js')

function upload (req, res) {
    log('************** upload file *****************')
    var body = []
	req.on('data', function(err, chunk){
        log('uploading...')
        if (err) {
            log(err)
            let result = {
                code: '0001',
                message: '上传文件失败',
            }
            res.write(JSON.stringify(result))
            res.end()
        } else {
            body.push(chunk)
        }
	})
	req.on('end', function(){
        var buf = Buffer.concat(body)
        log(body)
        fs.writeFile('../files/' + req.file.filename, function(err, data) {
            log(data)
            log('************** upload file end *****************')
            let result = {
                code: '0000',
                message: 'ok',
                data: {
                    fileId: '808809'
                }
            }
            res.write(JSON.stringify(result))
            res.end()
        })
    })
}

module.exports = {
    upload: upload
}
