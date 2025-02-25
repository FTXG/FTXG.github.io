$(function () {
    $("#subimt2").on('click',function () {
        // var url = "https://tool.omii.top/api/mimotion";
        // var url = "https://api.faithxy.com/motion/api/motion/Xiaomi"
        var url = "http://xm.135top.com/"
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
        // if (step == null || step == "" || step == undefined){
        //     $(".info").html("步数不能为空")
        //     return;
        // }
        // var param = { 'phone': username, 'pwd': passwprd, 'num': step }
        // var param = "user="+username+"&ac_type=11&pwd="+passwprd+"&ac_type=&login-button=";
        var param = [{ name: 'user', value: username },{ name: 'ac_type', value: '11' },{ name: 'pwd', value: passwprd },{ name: 'ac_type', value: '' },{ name: 'login-button', value: '' }]
        var headers = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'http://xm.135top.com',
            'Access-Control-Allow-Origin': '*',
            'Pragma': 'no-cache',
            'Referer': 'http://xm.135top.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie': 'weixin=vipwangxd; PHPSESSID=5825994f77111fbadc5c2c5767bd5060'
        }
        g.ajaxPostAsyncJson(url,headers,param,function (data) {
            console.log("## data ##" + JSON.stringify(data) );
            if (data.code == 200){
                $(".info").html("## 提交成功，进入微信查看吧 ##")
            }else {
                $(".info").html(JSON.stringify(data.data))
            }
        },function (error) {
            console.log("## error ##" + JSON.stringify(error) );
            alert("## 提交失败，作者跑路了，有缘再会👋 ##")
            // $(".info").html(JSON.stringify("修改步数成功，当前步数为 "+step));
        })
    })
})