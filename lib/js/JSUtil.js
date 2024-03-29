/**
 *  时间工具类
 *  @author fei
 */
var DateUtil = {
    /**
     * 当前时间，格式 yyyy-MM-dd HH:mm:ss
     *
     * @return 当前时间的标准形式字符串
     */
    now: function () {
        return new Date().format("yyyy-MM-dd HH:mm:ss");
    },
    /**
     * 格式化日期时间
     * 格式 yyyy-MM-dd HH:mm:ss
     *
     * @param date 被格式化的日期
     * @param format 格式化 参考 {@link date_formate}
     * @return 格式化后的日期
     */
    formatDateTime: function (date, format) {
        if (format == undefined || format == null) {
            format = "yyyy-MM-dd HH:mm:ss";
        }
        return date.format(format);
    },
    /**
     * 只支持毫秒级别时间戳，如果需要秒级别时间戳，请自行×1000
     *
     * @param timestamp 时间戳
     * @return 时间对象
     */
    date: function (timestamp) {
        return new Date(timestamp);
    },
    /**
     * 计算两个日期差值
     * @param start
     * @param end
     * @param format
     */
    diffDay: function (start, end, format) {
        if (format == undefined || format == null || format == "") {
            format == date_formate.normDatetimePattern;
        }
        let timestamp = this.date(end).getTime() - this.date(start).getTime();
        return this.days(timestamp);
    },
    /**
     * 时间戳转为年数月数日数
     * @param timestamp
     * @returns {string}
     */
    days:function (timestamp) {
        //转换秒
        var mm = timestamp/1000;
        var year = parseInt(mm/(60*60*24*365));
        var month = parseInt((mm%(60*60*24*365))/(60*60*24*30));
        var day = parseInt(((mm%(60*60*24*365))%(60*60*24*30))/(60*60*24));
        return year+"-"+month+"-"+day;
    },
    /**
     * 自定义日期偏移
     * @param date 时间字符串 "yyyy-MM-dd HH:mm:ss"
     * @param num 偏移数
     * @param type 偏移类型
     * @returns {Date} 返回日期对象
     */
    add : function(date,num,type) {
        var dateObj = new Date()
        if (date!=null || date!=undefined || date.trim() != ""){
            dateObj = new Date(date);
        }
        switch (type) {
            case 'yyyy':
                dateObj.setFullYear(dateObj.getFullYear() + num);
                return dateObj;
            case 'MM':
                dateObj.setMonth(dateObj.getMonth() + num);
                return dateObj;
            case 'dd':
                dateObj.setDate(dateObj.getDate() + num);
                return dateObj;
            case 'HH':
                dateObj.setHours(dateObj.getHours() + num);
                return dateObj;
            case 'mm':
                dateObj.setMinutes(dateObj.getMinutes() + num);
                return dateObj;
            case 'ss':
                dateObj.setSeconds(dateObj.getSeconds() + num);
                return dateObj;
            default:
                dateObj.setTime(dateObj.getTime() + num);
                return dateObj;
        }
    }
};

/** 日期格式 命名参考hutool工具类 */
date_formate = {
    /** 标准日期格式：yyyy-MM-dd */
    normDatePattern: "yyyy-MM-dd",
    /** 标准时间格式：hh:mm:ss */
    normTimePattern: "HH:mm:ss",
    /** 标准日期时间格式，精确到分：yyyy-MM-dd HH:mm */
    normDatetimeMinutePattern: "yyyy-MM-dd HH:mm",
    /** 标准日期时间格式，精确到秒：yyyy-MM-dd HH:mm:ss */
    normDatetimePattern: "yyyy-MM-dd HH:mm:ss",
    /** 标准日期时间格式，精确到毫秒：yyyy-MM-dd HH:mm:ss.SSS */
    normDatetimeMsPattern: "yyyy-MM-dd HH:mm:ss.SSS",
    /** 标准日期格式：yyyy年MM月dd日 */
    chineseDatePattern: "yyyy年MM月dd日",
    /** 标准日期格式：yyyyMMdd */
    pureDatePattern: "yyyyMMdd",
    /** 标准日期格式：HHmmss */
    pureTimePattern: "HHmmss",
    /** 标准日期格式：yyyyMMddHHmmss */
    pureDatetimePattern: "yyyyMMddHHmmss",
    /** 标准日期格式：yyyyMMddHHmmssSSS */
    pureDatetimeMsPattern: "yyyyMMddHHmmssSSS",
};

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "H+": this.getHours(),                   //小时
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
var g = {
    ajaxPostAsyncJson: function (url, data, success) {
        // document.cookie  = 'username=PHPSESSID'
        if (data == null || data == "" || data == undefined) {
            data = {"apiKey": "c997c01d7b3b7fe17148c533e7c73b65"};
        } else {
            data.apiKey = "c997c01d7b3b7fe17148c533e7c73b65";
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: "json",
            async: true,//请求是否异步，默认为异步，这也是ajax重要特性
            success: success,
            error: function () {
                console.log("## 请求错误 ##"+url);
            }
        });
    },
    ajaxGetAsyncJson: function (url, data, success) {
        // document.cookie  = 'username=PHPSESSID'
        if (data == null || data == "" || data == undefined) {
            data = "?a="+this.randomText(6);
        }else {
            data = "?"+data
        }
        url = url+data;
        $.ajax({
            type: 'GET',
            url: url,
            // data: JSON.stringify(data),
            dataType: "json",
            async: true,//请求是否异步，默认为异步，这也是ajax重要特性
            success: success,
            error: function () {
                console.log("## 请求错误 ##"+url);
            }
        });
    },
    randomText: function (len) {
        var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        var resultStr = "";
        for (let i = 0; i < len; i++) {
            var strNum = Math.floor(Math.random() * str.length)
            resultStr += str.charAt(strNum)
        }
        return resultStr
    }
}