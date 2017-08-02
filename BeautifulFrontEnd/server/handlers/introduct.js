/**
 * @fileoverview introduct info for webank
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created July 3, 2017
 */

'use strict';

var log = require('../common/log.js');
var fs = require('fs');
var file = require('../common/utils.js').file;

function getAdList(params, data, res){
	var data = [];
	data.push({
		title:'方付通借力短信验证码加密技术构筑移动金融时代的“安全堡垒”',
		pictureUrl:'http://localhost:9001/files/index01.png',
		content:'在网购日益频繁的当下，网络带给人们便利的同时，也带来了很多安全隐患，在生活中你可能经历过类似的场景。比如在网上购物需要通过网上银行或者第三方支付平台付款的时候，'
	}),
	data.push({
		title: '"社区e银行"：传统金融机构的“互联网+”探索',
		pictureUrl: 'http://localhost:9001/files/index02.png',
		content:'在互联网金融异军突起，金融脱媒趋势日益显著的同时，传统银行业内部也表现出越来越激烈的竞争态势，尤其是农村金融市场，随着城市化进程的不断推进，农村与城镇地域空间不断融合，'
	})
	res.writeHead(200/*, {'Content-Type': 'text/html'}*/);
    var data = JSON.stringify(data);
	res.write(data);
    res.end();
}

module.exports = getAdList
