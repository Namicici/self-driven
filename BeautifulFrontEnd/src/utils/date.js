export function dateFormat (date, fmt) {
    if (date) {
        date = new Date(date)
    } else {
        return ''
    }
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    }

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    }

    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
        }
    })

    return fmt
}

export function convertBetweenDay (betweentime) {
    // 计算小时
    const hours = Math.floor(betweentime / (1000 * 3600))
    const leavel1 = betweentime % (1000 * 3600)
    // 计算分钟
    const minutes = Math.floor(leavel1 / (1000 * 60))
    const leavel2 = leavel1 % (1000 * 60)
    // 计算秒
    const seconds = Math.round(leavel2 / 1000)

    return `${hours}小时${minutes}分${seconds}秒`
}

/**
 * 根据传进的getTime dateformat 返回时间
 * getTime : 时间 long或者字符串（2015-07-25）
 * dateformat : 时间格式 如 yyyy-MM-dd HH:mm:ss
 */
export function dateFormatUtil (dateTime, dateformat) {
    if (dateTime === '0' || dateTime === '' || dateTime === null) {
        return ''
    } else {
        if ((dateTime + '').indexOf('-') !== '-1' || (dateTime + '').indexOf('+') !== '-1') {
            dateTime = new Date(dateTime).getTime()
        } else {
            dateTime = parseInt(dateTime, 10)
        }
    }
    var year = new Date(dateTime).getFullYear()
    var month = new Date(dateTime).getMonth() + 1
    var date = new Date(dateTime).getDate()
    var hour = new Date(dateTime).getHours()
    var minute = new Date(dateTime).getMinutes()
    var second = new Date(dateTime).getSeconds()
    if (month < 10) {
        month = '0' + month
    }
    if (date < 10) {
        date = '0' + date
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    if (minute < 10) {
        minute = '0' + minute
    }
    if (second < 10) {
        second = '0' + second
    }
    if (dateformat === 'yyyy-MM-dd HH:mm:ss') {
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    } else if (dateformat === 'yyyy-MM-dd HH:mm') {
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
    } else if (dateformat === 'yyyy-MM-dd HH') {
        return year + '-' + month + '-' + date + ' ' + hour
    } else if (dateformat === 'yyyy-MM-dd') {
        return year + '-' + month + '-' + date
    } else if (dateformat === 'HH:mm:ss') {
        return hour + ':' + minute + ':' + second
    } else {
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    }
}
