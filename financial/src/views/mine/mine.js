/**
* @fileoverview
* @author Sissi Lee(namicici.lee@outlook.com)
* @created June 8, 2017
*/
'use strict';

import Vue from 'vue';
import CommonService from '../../services/common.js';
import { Cell } from 'mint-ui';
import { Button } from 'mint-ui';

Vue.component(Cell.name, Cell);
Vue.component(Button.name, Button);

module.exports = {
	data: function(){
		return {
			//focused: false
			show: false,
			download:false
		}
	},
	methods: {
		dbTest: function(){
			CommonService.http({
				method: 'get',
				url: '/db/test'
			}).then(function(data){
				console.log('get data: ' + data);
			}, function(error){
				console.log('test db error: ' + error);
			})
		},
		download: function(){
			//测试download请求发出后，后端返回流之前操作其他接口是否会导致卡断
			window.open('http://localhost:9001/api/download/test');
		},
		downloadSamePage: function(){
			var self = this;
			self.show = true;
			CommonService.http({
				method:'get',
				url: '/download/test'
			}).then(function(data){
				self.download = true;
				self.downloadUrl = 'http://localhost:9001/api/download/test';
				//self.show = false;
				//self.download = false;
			}, function(error){
				self.show = false;
				self.download = false;
			})
		},
		downloadFinish: function(){
			var self = this;
			self.show = false;
			self.download = false;
			console.log('download complete');
		}
	},
	mounted: function(){
	}
}
