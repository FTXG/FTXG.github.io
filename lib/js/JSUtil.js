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
    ajaxPostAsyncJson: function (url,header, data, success,error) {
        g.ajaxRequest('POST',true,'json',url,header,data,success,error)
    },
    ajaxGetAsyncJson: function (url,header, data, success,error) {
        // document.cookie  = 'username=PHPSESSID'
        // if (data == null || data == "" || data == undefined) {
        //     data = "?a="+this.randomText(6);
        // }else {
        //     data = "?"+data
        // }
        // url = url+data;
        g.ajaxRequest('GET',true,'json',url,header,data,success,error)
        /**
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
         */
    },
    /**
     * 请求
     * @param method 方法 GET、POST、...
     * @param isAsync 是否异步请求 true/false
     * @param dataType 返回数据类型 json/text
     * @param url
     * @param data
     * @param success
     * @param error
     */
    ajaxRequest: function (method,isAsync,dataType,url,header,data,success,error) {
        if (header == null || header == "" || header == undefined){
            $.ajax({
                type: method,
                url: url,
                data: data,
                dataType: dataType,
                crossDomain: true,
                async: isAsync,//请求是否异步，默认为异步，这也是ajax重要特性
                success: success,
                error: error
            });
        }else {
            console.log("## header ##" + header );
            $.ajax({
                type: method,
                url: url,
                headers: header,
                data: data,
                dataType: dataType,
                async: isAsync,//请求是否异步，默认为异步，这也是ajax重要特性
                success: success,
                error: error
            });
        }
    },
    getAgent: function () {
        USER_AGENTS = ["Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; AcooBrowser; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
            "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)",
            "Mozilla/4.0 (compatible; MSIE 7.0; AOL 9.5; AOLBuild 4337.35; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
            "Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)",
            "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)",
            "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 1.0.3705; .NET CLR 1.1.4322)",
            "Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.2; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.2; .NET CLR 3.0.04506.30)",
            "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.3 (Change: 287 c9dfb30)",
            "Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6",
            "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.2pre) Gecko/20070215 K-Ninja/2.1.1",
            "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9) Gecko/20080705 Firefox/3.0 Kapiko/3.0",
            "Mozilla/5.0 (X11; Linux i686; U;) Gecko/20070322 Kazehakase/0.4.5",
            "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20",
            "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52"]
        random_agent = USER_AGENTS[g.randomInterval(0, USER_AGENTS.length-1)]
        return random_agent
    },
    randomText: function (len) {
        var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        var resultStr = "";
        for (let i = 0; i < len; i++) {
            var strNum = Math.floor(Math.random() * str.length)
            resultStr += str.charAt(strNum)
        }
        return resultStr
    },
    /**
     * 生成 [min,max] 的随机数
     * @param min
     * @param max
     * @returns {*}
     */
    randomInterval: function (min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}