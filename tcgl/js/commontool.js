var g = {
    ajaxPostAsyncJson: function (url, data, success) {
        // document.cookie  = 'username=PHPSESSID'
        if (data == null || data == "" || data == undefined) {
            data = {"data": null};
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