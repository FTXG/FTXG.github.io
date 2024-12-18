$(function () {
    $("#subimt2").on('click',function () {
        // var url = "https://tool.omii.top/api/mimotion";
        var url = "https://api.faithxy.com/motion/api/motion/Xiaomi"
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
        var param = { 'phone': username, 'pwd': passwprd, 'num': step }
        var headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Connection': 'keep-alive',
            'Origin': 'https://m.cqzz.top',
            'Referer': 'https://m.cqzz.top/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': g.getAgent(),
            'sec-ch-ua': '"Not)A;Brand";v="99", "Microsoft Edge";v="127", "Chromium";v="127"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }
        g.ajaxPostAsyncJson(url,null,param,function (data) {
            console.log("## data ##" + JSON.stringify(data) );
            if (data.code == 200){
                $(".info").html("## 提交成功，进入微信查看吧 ##")
            }else {
                $(".info").html(JSON.stringify(data.data))
            }
        },function (error) {
            alert("## 提交失败，作者跑路了，有缘再会👋 ##")
            // $(".info").html(JSON.stringify("修改步数成功，当前步数为 "+step));
        })
    })
})