$(function () {
    //阳历
    var solar_calendar_day = $(".nowY").text();
    var now_YMR = solar_calendar_day.split("-");
    var nowY = now_YMR[0];
    var nowM = now_YMR[1];
    var nowD = now_YMR[2];
    //农历
    $.ajax({
        type:"get",
        url:"https://ftxg.github.io/friendBirthday/json/birthday.json",
        dataType:"json",
        success:function (res) {
            var data = JSON.stringify(res);
            if (res!=null){
                console.log(Lunar.toLunar(nowY,nowM,nowD));
                for (var i = 0;i<res.length;i++) {
                    var re = res[i];
                    var friendName = JSON.stringify(re.name);
                    var friendDate = JSON.stringify(re.date);
                }
            }
        },
        complete:function(){
            //请求完成的处理
            console.log(Lunar.toSolar(2022, 12, 16))
        },
        error:function (res) {
            console.log(JSON.stringify(res));
        }
    })
})