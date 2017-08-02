/**
从url中获取给定参数的值
*/
export function getQueryFromUrl (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = location.search.substr(1).match(reg)
    return r ? decodeURI(r[2]) : null
}
