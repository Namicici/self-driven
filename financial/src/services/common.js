/**
 * @fileoverview Provide common service, such as http request, operate cookie, localstorage
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

"use strict";

import Axios from 'axios';

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
		cookie.set('token_test', '0980');
		self.http(options).then(function(data){
			console.log('cors success');
		}, function(error){
			console.log('cors error');
		})

	},
	jsonp: function(options){
		cookie.set('token_test', '0980');
		console.log('cookie:' + document.cookie);
		var callbackName = 'jsonp1';
		var responseData;
		options.url = 'http://localhost:9002/api' + options.url;
		return new Promise(function(resolve, reject){
			var script = document.createElement('script');

			script.addEventListener('load', function(e, errorType) {
				//clearTimeout(abortTimeout)
				//script.off().remove()
				//script.remove();

				if (e.type == 'error' || !responseData) {
					reject('error');
					//ajaxError(null, errorType || 'error', xhr, options, deferred)
				} else {
					resolve(responseData[0]);
					//ajaxSuccess(responseData[0], xhr, options, deferred)
				}

				window[callbackName] = originalCallback
				if (responseData && $.isFunction(originalCallback))
					originalCallback(responseData[0])

				originalCallback = responseData = undefined
			})

			script.setAttribute('crossorigin', 'use-credentials');
			//script.setAttribute('crossorigin', 'anonymous'); //cookie is not allowed
			script.src = options.url + '?callback=' + callbackName;
			window[callbackName] = function(){
				responseData = arguments;
			}
			document.head.appendChild(script);
		});
	},
	cookie:cookie
}
