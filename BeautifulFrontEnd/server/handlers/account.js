/**
 * @fileoverview account info and operate
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created July 3, 2017
 */

'use strict';

var log = require('../common/log.js');
var fs = require('fs');

var Account = {
	getAccountList: function(params, req, res){
		var data = [];
		data.push({
			acctNo: "622242******0422",
			acctLastFour: "0422",
			acctName:"周一1",
			acctIdx: '1',
			acctBalance: '10000.00',
			acctPoint: "23000.00",
			addMode:"1",
			acctType:"1",
		});
		data.push({
			acctNo: "624217******3866",
			acctLastFour: "3866",
			acctName:"周二4",
			acctIdx: '2',
			acctBalance: '25000.00',
			acctPoint: "311100.00",
			addMode:"1",
			acctType:"0",
		});
		data.push({
			acctNo: "624217******3533",
			acctLastFour: "3533",
			acctName:"周四3",
			acctIdx: '3',
			acctBalance: '35246.00',
			acctPoint: "23000.00",
			addMode:"1",
			acctType:"3",
		})
		res.writeHead(200);
		res.write(JSON.stringify(data));
		res.end();
	}
}

module.exports = Account;
