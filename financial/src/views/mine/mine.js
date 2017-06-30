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
	},
	mounted: function(){
	}
}
