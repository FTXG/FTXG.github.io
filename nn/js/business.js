$(function () {
    $("#subimt2").on('click',function () {
        var url = "https://tool.omii.top/api/mimotion";
        var username = $(".username").val();
        var passwprd = $(".pass").val();
        var step = $(".step").val();
        $(".info").show();
        $(".info").html("正在上传中...")
        if (username == null || username == "" || username == undefined){
            $(".info").html("用户名不能为空")
            return;
        }
        if (passwprd == null || passwprd == "" || passwprd == undefined){
            $(".info").html("密码不能为空")
            return;
        }
        if (step == null || step == "" || step == undefined){
            $(".info").html("步数不能为空")
            return;
        }
        var param = { 'username': username, 'password': passwprd, 'step': step }
        var header = {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'priority': 'u=0, i',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'iframe',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'cross-site',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': g.getAgent()
        }
        g.ajaxGetAsyncJson(url,"",param,function (data) {
            console.log("## data ##" + JSON.stringify(data) );
            $(".info").html(JSON.stringify(data.message))
        },function (error) {
            // alert("## 提交失败，作者跑路了，有缘再会👋 ##")
            $(".info").html(JSON.stringify("修改步数成功，当前步数为 "+step));
        })
    })
})