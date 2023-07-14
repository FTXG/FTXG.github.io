$(function () {
    $(".tip").hide();
    $(".tipm").hide();
    $("#qqCode").on("click",function (){
        $(".tip").hide();
        $(".tipm").hide();
    })
    $("#sendSelect").on("click",function () {
        let qqCode = $("#qqCode").val();
        if (qqCode==null||qqCode.length==0||
            isNaN(Number(qqCode))||qqCode.length>10){
            $('.tip').hide();
            $(".tipm").show();
            $(".qq").text("");
            $(".phone").text("");
            $(".phonediqu").text("");
            $(".message").text("输入QQ格式有误，请检查后输入！！");
            return;
        }
        $.ajax({
            type:"get",
            url:"https://zy.xywlapi.cc/qqapi",
            data:"qq="+qqCode,
            dataType:"json",
            async:true,//请求是否异步，默认为异步，这也是ajax重要特性
            beforeSend:function(){
                $('.tip').hide();
                $(".tipm").show();
                //请求前的处理
                $(".message").text("死命加载中，请稍后。。。")
            },
            success:function(res){
                if (res.status==500){
                    $('.tip').hide();
                    $(".tipm").show();
                    $(".message").text("未查询到该账号信息")
                    return;
                }
                $('.tip').show();
                $(".tipm").hide();
                //请求成功时处理
                $(".qq").text(res.qq);
                $(".phone").text(res.phone);
                $(".phonediqu").text(res.phonediqu);
                $(".message").text("");
            },
            complete:function(){
                //请求完成的处理
            },
            error:function(){
                //请求出错处理
            }
        });
    })
})