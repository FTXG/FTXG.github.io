$(function () {
    //头部时间
    setInterval(function () {
        var hourNum =  DateUtil.formatDateTime(new Date(),"HH");
        if (hourNum >= 15 && hourNum <= 18){
            $(".top-middle").text(DateUtil.formatDateTime(DateUtil.add(DateUtil.now(),-6,"HH"),"yyyy-MM-dd HH:mm:ss"));
        }else {
            $(".top-middle").text(DateUtil.now());
        }
    },1000)
})