
let last = parseInt(req.query.lastId)

var resultData = []
for (var i = 0; i < 25; i++) {
    resultData.push(last + i + 1)
}

next(null, {
    code: '0000',
    message: 'ok',
    data: resultData,
    hasNext: true
})