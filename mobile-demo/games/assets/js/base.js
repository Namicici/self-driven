
$.baseUrl = '/api';

// ajax请求
$.commonAjax = function (options, calback) {
    var _default = {
        type: 'GET',
        data: {},
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        async: true,
        callBack: ''
    };
    options = $.extend(_default, options);

    if (options.type.toUpperCase() == 'GET' && options.data) {
        var arr = [];
        for (var key in options.data) {
            if (options.data[key] != '') {
                arr.push(key + '=' + encodeURIComponent(options.data[key]));
            } else {
                arr.push(key + '=' + options.data[key]);
            }
        }
        options.data = arr.join('&');
    }
    if (options.type.toUpperCase() == 'POST' && options.data) {
        options.data = JSON.stringify(options.data)
        options.contentType = 'application/json';
    }
    $.ajax({
        type: options.type,
        url:  $.baseUrl + options.url,
        contentType: options.contentType,
        data: options.data,
        dataType: options.dataType,
        async: options.async,
        callBack: options.callBack,
        timeout: 120000,
        headers: {
            sessionId: localStorage.getItem('sessionID'),
        },
        beforeSend: function () {
          	if (!options.sync) {
                if (options.load != 'Noloading') {
                    $.loading();
                } 
        	}
        },
        success: function (data, a, b) {
            setTimeout(function () {
                var resCode = data.code;
                if (resCode == '7005') {
                    $.closeBridgeWindow('您尚未关注该公众号，请关注后再访问');
                } else if (resCode == '7003') {
                    $.closeBridgeWindow('由于您长时间未操作，会话已过期，请重新进入');
                } else {
                    options.success && options.success(data, a, b);
                    if (resCode == '0000' ) {
                        if (options.callBack != "") {
                            $[options.callBack](data);
                        }
                    }
                }
            }, 10);
        },
        error: function (xhr, type, error) {
            if (type == 'timeout' || (xhr.status != undefined && xhr.status != null)) {
                alert(xhr.responseText || '通讯超时，请稍后再做。');
            } else {
                alert(xhr.responseText || '通讯超时，请稍后再做。');
            }
            options.error && options.error(error);
        },
        complete: function (f) {
            // 请求完成后调用的回调函数（请求成功或失败时均调用）
            options.complete && options.complete(f);
        	if (!options.sync) {
                if (options.load != 'Noloading') {
                    layer.closeAll();
                } 
        	}
        }
    });
};

// 格式化时间
 $.dateFormatUtil = function (dateTime) {
    if(dateTime == "0" || dateTime == "" || dateTime == null) {
        return "";
    } else {
        if((dateTime + "").indexOf("-") != "-1" || (dateTime + "").indexOf("+") != "-1") {
            dateTime = new Date(dateTime).getTime()
        } else {
            dateTime = parseInt(dateTime, 10);
        }
    }
    var year = new Date(dateTime).getUTCFullYear(),
        month = new Date(dateTime).getMonth() + 1,
        date = new Date(dateTime).getDate();
    var hour = new Date(dateTime).getHours();
    var minute = new Date(dateTime).getMinutes();
    var second = new Date(dateTime).getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if(date < 10) {
        date = "0" + date;
    }
    if(hour < 10) {
        hour = "0" + hour;
    }
    if(minute < 10) {
        minute = "0" + minute;
    }
    if(second < 10) {
        second = "0" + second;
    }
    return year + "-" + month + "-" + date + "";
};
	
$.loading = function () {
    layer.open({type: 2,shadeClose:false, content: '加载中'});
};
