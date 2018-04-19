
setTimeout(function () {
    next(null, {
        code: '0001',
        message: 'ok',
        data: {
            test: '测试服务端渲染数据预取'
        }
    })
}, 5000)
