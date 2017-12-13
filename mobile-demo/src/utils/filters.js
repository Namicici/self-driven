import { dateFormat as format } from './date'

/**
 * 金额格式化
 * @param  {[Number]} value     [数值]
 * @param  {[String:￥]} _currency [单位]
 * @param  {[Number:2]} decimals  [保留小数]
 * @return {[String]}
 */
export function currency (value, _currency, decimals) {
    value = parseFloat(value)
    if (!Number.isFinite(value) || Number.isNaN(value)) return ''
    _currency = _currency != null ? _currency : ''
    decimals = decimals != null ? decimals : 2
    var stringified = Math.abs(value).toFixed(decimals)
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
    var i = _int.length % 3
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
    var _float = decimals ? stringified.slice(-1 - decimals) : ''
    var sign = value < 0 ? '-' : ''
    return sign + _currency + head + _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,') + _float
}

/**
 * 日期格式化
 * @param  {[String|Date]} val [日期]
 * @param  {[type]} fmt [格式]
 * @return {[String]}
 */
export function dateFormat (val, fmt) {
    return val ? format(val, fmt) : ''
}
