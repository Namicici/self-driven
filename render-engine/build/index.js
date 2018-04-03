'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var renderPromise = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(context) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new Promise(function (resolve, reject) {
                            renderer.renderToString(context, function (err, html) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(html);
                                }
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function renderPromise(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Koa = require('koa');
var server = new Koa();
var config = require('./config.js');
var serve = require('koa-static');
var router = require('koa-router')();
var path = require('path');
var http = require('http');
var request = require('request');

var createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
var template = require('fs').readFileSync(path.join(__dirname, config.template_path), 'utf-8');
var serverBundle = require(path.join(__dirname, config.vue_ssr_server_bundle_path));
var clientManifest = require(path.join(__dirname, config.client_manifest_path));
var renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template: template,
    clientManifest: clientManifest
});

var main = serve(path.join(__dirname, '../'));
server.use(main);

server.use(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log(ctx);
                        _context.next = 3;
                        return next();

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

router.get('/record', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
        var context;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        context = { url: ctx.request.url };
                        _context3.next = 3;
                        return renderPromise(context);

                    case 3:
                        ctx.response.body = _context3.sent;

                        next();

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}());

var nginxHost = '10.24.248.22';
router.all(/\/app/i, function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, next) {
        var path, req, promise;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        path = ctx.request.path;
                        req = {
                            url: 'http://' + nginxHost + path,
                            header: ctx.request.header,
                            method: ctx.request.method
                        };

                        console.log('---------------------------------');
                        console.log(req);
                        console.log('---------------------------------');
                        promise = new Promise(function (resolve, reject) {
                            request(req, function () {
                                var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(err, res, body) {
                                    var result;
                                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    if (err) {
                                                        reject(err);
                                                    } else if (res.statusCode == 200 || res.statusCode == 608) {
                                                        result = JSON.parse(body);

                                                        result.response = res;
                                                        resolve(result);
                                                    } else {
                                                        reject(err);
                                                    }

                                                case 1:
                                                case 'end':
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _callee4, undefined);
                                }));

                                return function (_x8, _x9, _x10) {
                                    return _ref5.apply(this, arguments);
                                };
                            }());
                        });
                        _context5.next = 8;
                        return promise;

                    case 8:
                        ctx.response.body = _context5.sent;

                        next();

                    case 10:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}());

server.proxy = true;

server.use(router.routes());

server.on('error', function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(err, ctx) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        console.log('server error:', err, ctx);

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}());

module.exports = server;