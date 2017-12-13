/**
 * @fileoverview Provide common service, such as http request, operate cookie, localstorage
 * @author Sissi Lee(namicici.lee@outlook.com)
 * @created June 8, 2017
 */

import Axios from 'axios'

var jsonpID = 0

module.exports = {
    http: function (options) {
        var token = '0989088797'
        var config = {
            // url: options.url,
            withCredentials: true,
            baseURL: options.baseURL || '/api',
            headers: {'token': token}
            // params: options.params, //only for get methods
            // data: options.data, //only for post , delete and put method
        }
        if (options.method.toLowerCase() === 'get') {
            config.params = options.data
            var promise = Axios.get(options.url, config)
        } else if (options.method.toLowerCase() === 'post') {
            config.data = options.data
            var promise = Axios.post(options.url, config)
        }
        return new Promise(function (resolve, reject) {
            promise.then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error)
            })
        })
    },
    all: function (array, successCallback) {
        Axios.all(array).then(Axios.spread(function (acct, perms) {
            successCallback(acct, perms)
        }))
    },
    cors: function (options) {
        var self = this
        return self.http(options)
    },
    jsonp: function (options) {
        var callbackName = options.callbackName
        if (!callbackName) { callbackName = 'jsonp' + (++jsonpID) }
        var responseData
        var originalCallback = window[callbackName]
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script')

            script.addEventListener('load', function (e, errorType) {
                script.remove()

                if (e.type === 'error' || !responseData) {
                    reject('error')
                } else {
                    resolve(responseData[0])
                }

                window[callbackName] = originalCallback
                if (responseData && (typeof (originalCallback) === 'function')) { originalCallback(responseData[0]) }

                originalCallback = responseData = undefined
            })
            if (options.withCredentials) {
                script.setAttribute('crossorigin', 'use-credentials')
            } else {
                script.setAttribute('crossorigin', 'anonymous') // cookie is not allowed
            }
            script.src = options.url + '?callback=' + callbackName
            window[callbackName] = function () {
                responseData = arguments
            }
            document.head.appendChild(script)
        })
    }
}
