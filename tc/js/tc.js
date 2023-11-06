var countNum = 0;
$(function () {
    var interID = undefined;
    $(document).on("mousedown",function (e) {
        interID = countInterval();
    }).on("mouseup",function (e) {
        if (interID != undefined && interID != null){
            clearInterval(interID);
            countNum = 1;
        }
    })
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
//计数器
function countInterval() {
    numsID = setInterval(function () {
        countNum ++;
    },500)
    return numsID;
}
//点击光标
function cursor(countNum) {
    $(document).on("mousemove",function (e) {

    })
}