/**
 * @fileoverview Provide common service, such as http request, operate cookie, localstorage
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

"use strict";

import Axios from 'axios';

var jsonpID = 0;

/**
* 封装cookie的读写方法
*
* @returns void
* @date July 4, 2017
* @author Sissi Lee
* @editor
*/
var cookie = {
	get: function(name){
		var cookie = document.cookie;
		var items = cookie.split(';');
		for (var i = 0; i < item.length; i++){
			var item = items[i];
			var params = item.split('=');
			for (var j = 0; j < params.length; j++){
				var param = params[j];
				if (param == name){
					return params[j+1];
				}
			}
		}
	},

	set: function(name, value, domain, expireTime){
		var newCookie = name + '=' + value;
		if (domain){
			newCookie = newCookie + ',/';
		}
		if (expireTime){
			newCookie = newCookie + ',expire=' + expireTime;
		}
		document.cookie = newCookie;
	}
}

/**
* 常量的统一定义
*
* @returns void
* @date July 4, 2017
* @author Sissi Lee
* @editor
*/
var constants = {
	CARD_TYPE: {
		DEBIT: '1', //借记卡
		//CREDIT: '2' //信用卡
		PASSBOOK: '0', //存折
		CARGO: '3', //货记卡
	},
}


/**
* 映射关系
*
* @returns void
* @date July 4, 2017
* @author Sissi Lee
* @editor
*/
var map = {
	cardType: function(cardType){
		switch (cardType) {
			case constants.CARD_TYPE.DEBIT:
				return '借记卡';
				break;
			case constants.CARD_TYPE.CREDIT:
				return '信用卡';
				break;
			case constants.CARD_TYPE.PASSBOOK:
				return '存折';
				break;
			case constants.CARD_TYPE.CARGO:
				return '货记卡';
				break;
			default:
				return '';
				break;
		}
	}
}

module.exports = {
	http: function(options){
		var token = "0989088797";
		var config = {
			//url: options.url,
			withCredentials: true,
			baseURL: options.baseURL || '/api',
			headers: {'token': token},
			//params: options.params, //only for get methods
			//data: options.data, //only for post , delete and put method
		};
		if (options.method.toLowerCase() == 'get'){
			config.params = options.data;
			var promise = Axios.get(options.url, config);
		}else if(options.method.toLowerCase() == 'post'){
			config.data = options.data;
			var promise = Axios.post(options.url, config);
		}
		return new Promise(function(resolve, reject){
			promise.then(function(response){
				resolve(response.data);
			}).catch(function(error){
				reject(error);
			})
		})
	},
	all: function(array, successCallback){
		Axios.all(array).then(Axios.spread(function(acct, perms){
			successCallback(acct, perms);
		}))
	},
	cors: function(options){
		var self = this;
		return self.http(options)
	},
	jsonp: function(options){
		var callbackName = options.callbackName;
		if (!callbackName)
			callbackName = 'jsonp' + (++jsonpID);
		var responseData;
		var originalCallback = window[callbackName];
		return new Promise(function(resolve, reject){
			var script = document.createElement('script');

			script.addEventListener('load', function(e, errorType) {
				script.remove();

				if (e.type == 'error' || !responseData) {
					reject('error');
				} else {
					resolve(responseData[0]);
				}

				window[callbackName] = originalCallback
				if (responseData && (typeof(originalCallback)=='function'))
					originalCallback(responseData[0])

				originalCallback = responseData = undefined
			})
			if (options.withCredentials){
				script.setAttribute('crossorigin', 'use-credentials');
			} else {
				script.setAttribute('crossorigin', 'anonymous'); //cookie is not allowed
			}
			script.src = options.url + '?callback=' + callbackName;
			window[callbackName] = function(){
				responseData = arguments;
			}
			document.head.appendChild(script);
		});
	},
	cookie: cookie,
	constants: constants,
	map: map
}
