
require('babel-polyfill')
require('babel-register')
const app = require('./src/index')

app.listen(3000)
console.log('server has started at 3000')
