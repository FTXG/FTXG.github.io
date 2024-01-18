$(function () {
    initfun();
    $("#jiexi").on('click',mainClick)
})
function mainClick() {
    $(".success").empty();
    let urlStr = $("#urlStr").val();
    //正则提取连接
    urlStr = regularExtractLink(urlStr);
    var data = jiexi(urlStr)
    console.log("## data ##" + JSON.stringify(data));
    fillInContent(data);
}
/**
 * 正则提取信息中的视频链接
 * @param information
 */
function regularExtractLink(information) {
    //主方法体
    var urlRegex = "https?://[^\\s/$.?#].[^\\s]*";
    var testUrl = information.match(urlRegex);
    return testUrl;
}
/**
 * 解析方法
 * @param urlStr
 * @returns {null}
 */
function jiexi(urlStr) {
    var result = null;
    $.ajax({
        type:'post',
        url:'https://api.pearktrue.cn/api/video/api.php',
        data:"url="+urlStr,
        dataType:'json',
        async:false,
        beforeSend:function(){
            //请求前处理
            $(".status").html("解析中。。。")
        },
        success:function (res) {
            //请求成功
            if (res.code == 200){
                result =  res;
            }
        },
        complete:function(){
            //请求完成的处理
            $(".status").html("");
        },
        error:function(){
            //请求出错处理
            $(".status").html("解析错误，不支持该视频");
        }
    })
    return result;
}

/**
 * 填充内容
 * @param data
 */
function fillInContent(context) {
    if (context.code == 200){
        var data = context.data;
        var temNode = $("#template").clone(true);
        temNode.attr('id','tem001');
        $(".success").append(temNode);
        $("#tem001 .videoNode").attr('src',data.url+'');
        $("#tem001").show();
    }else {
        $(".error").html("<h2>解析失败。。。</h2>")
    }
}

/**
 * 初始化
 */
function initfun() {
    //获取剪切板
    if(navigator.clipboard){
        navigator.clipboard.readText()
            .then((v) => {
                console.log('获取剪贴板内容：', v)
                $("#urlStr").val(v)
            })
            .catch((e) => {
                console.log('获取剪贴板内容失败：', e)
            });
    } else {
        alert('当前浏览器不支持Clipboard API');
    }
    $("#videoNode").hide();
}