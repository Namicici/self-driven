"use strict";

import Axios from 'axios';

module.exports = {
	http: function(options){
		var token = "0989088797";
		var config = {
			//url: options.url,
			baseURL: 'http://localhost:8080/',
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
	}
}
