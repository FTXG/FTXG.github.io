$(function () {
    var audioObj = null
    $(".conv").on('click',function () {

        var context = $(".context").val();
        audioObj = conv(context);
    })
    console.log("## audioObj ##" + audioObj == null);
})
function conv(text) {
    // 禁用按钮
    $('.conv').prop('disabled', true);
    var audioObj = null;
    $(".info").text("转换中，请稍后。。。")
    g.ajaxGetAsyncJson("https://api.pearktrue.cn/api/aivoicenet/","speak=宇铭&text="+text+"；欢迎体验文字转语音服务，如果不想听这一段就V我五十元",function (data) {
        if (data.code == 200){
            var audioObj = new Audio(data.voiceurl);
            // audioObj.loop;
            $(".info").text("")
            audioObj.play();
            // 启用按钮
            $('.conv').prop('disabled', false);
        }else {
            $(".info").text("转换失败，请重试")
            // 启用按钮
            $('.conv').prop('disabled', false);
        }
    })
    return audioObj;
}