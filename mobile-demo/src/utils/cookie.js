
/**
* 封装cookie的读写方法
*
* @returns void
* @date July 4, 2017
* @author Sissi Lee
* @editor
*/
var cookie = {
    get (name) {
        var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
        return arr ? decodeURI(arr[2]) : null
    },

    set (name, value, domain, path, expires) {
        if (expires) {
            expires = new Date(+new Date() + expires)
        }

        var newCookie = name + '=' + encodeURI(value) +
            ((expires) ? '; expires=' + expires.toGMTString() : '') +
            ((path) ? '; path=' + path : '') +
            ((domain) ? '; domain=' + domain : '')

        document.cookie = newCookie
        return this
    },

    del (name, domain, path) {
        if (this.get(name)) {
            document.cookie = name + '=' +
                ((path) ? '; path=' + path : '') +
                ((domain) ? '; domain=' + domain : '') +
                ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
        }
        return this
    }
}

export default cookie
