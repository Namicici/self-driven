/**
 * @fileoverview Deal with file logics, for all users, no dependencies
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

var fs = require('fs')
var log = require('../common/log.js')
var formidable = require('formidable')

function upload (req, res) {
    log('************** upload file *****************')
    let formdata = new formidable.IncomingForm()
    formdata.uploadDir = './files/upload/'
    formdata.keepExtensions = true
    formdata.multiples = true

    formdata.parse(req, function(err, fields, files){
        if (err){
            res.write(JSON.stringify({
                code: '0001',
                message: err
            }))
            res.end()
            return
        }
        log('*********** Rename upload temp file name **********')
        let result = null
        if (files.file && (files.file instanceof Array)){
            log('multiple files uploaded')
            result = []
            for (let i = 0; i < files.file.length; i++){
                // fs.rename(files.file[i].path, formdata.uploadDir + files.file[i].name, function(err){
                //     if (err){
                //         log('rename error '+ files.file[i].path + ' to ' + formdata.uploadDir + files.file[i].name)
                //         result.push({
                //             path: files.file[i].path
                //         })
                //     } else {
                //         result.push({
                //             path: './upload/' + files.file[i].name
                //         })
                //     }
                // })
                fs.renameSync(files.file[i].path, formdata.uploadDir + files.file[i].name)
                result.push({
                    path: formdata.uploadDir + files.file[i].name
                })
            }
        }else{
            fs.renameSync(files.file.path, formdata.uploadDir + files.file.name)
            result = {
                path: formdata.uploadDir + files.file.name
            }
        }
        log('*********** End rename upload temp file name **********')
        res.write(JSON.stringify({
            code: '0000',
            message: 'ok',
            data: result
        }))
        res.end()
    })
}

module.exports = {
    upload: upload
}
