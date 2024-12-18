$(function () {
    //初始化小球，生成一颗值比正常大或者小的球
    init_ball()
//    选择左侧或右侧托盘
    $("#tianping").on("click",".left_tp,.right_tp",function (e) {
        var $this = $(this); // 缓存当前点击的元素

        // 检查当前点击的元素是否已经拥有'sel'类
        if (!$this.hasClass('sel')) {
            // 如果没有'sel'类，则先移除其他同类元素上的'sel'类，再添加'sel'类到当前元素
            if ($this.hasClass('left_tp')) {
                $('.right_tp.sel').removeClass('sel'); // 移除right_tp中的sel类
            } else if ($this.hasClass('right_tp')) {
                $('.left_tp.sel').removeClass('sel'); // 移除left_tp中的sel类
            }
            $this.addClass('sel'); // 给当前点击的元素添加'sel'类
        }
        e.preventDefault();
    })
//    点击小球将小球放入天枰
    $("#ball").on("click","> *",function (e) {
        // 'this' 指向触发事件的子元素
        var $this = $(this);
        var targetDiv = $(".sel");
        office_ball($this,targetDiv);
        e.preventDefault();
    })
    //点击托盘里的小球将其挪到小球栏
    $(".left_tp").on("click","> *",function (e) {
        var $this = $(this);
        var targetDiv = $("#ball");
        office_ball($this,targetDiv);
        e.preventDefault();
    })
    $(".right_tp").on("click","> *",function (e) {
        var $this = $(this);
        var targetDiv = $("#ball");
        office_ball($this,targetDiv);
        e.preventDefault();
    })
    $(".action_tp").on("click",calc_ball)
    $(".ok_r").on("click",result_text)
})
function result_text() {
    var index = $(".index_r").val();
    if (index == undefined || index == null || index == ''){
        $(".text_r").html("请输入球号");
    }
//    获取相应编号的小球
    var ballIndex = ".ball_"+index;
    var val = $(ballIndex).attr('val');
    console.log("## ballIndex ## ==>" + ballIndex );
    console.log("## val ## ==>" + val );
    if (val != undefined && val != null && val != '' && val != 1){
        $(".text_r").html("猜对了！！");
    }else {
        $(".text_r").html("猜错了！！");
    }

}

/**
 * 移动小球
 * @param $this 小球
 * @param $targetDiv 目标
 */
function office_ball($this,$targetDiv) {
    // 复制当前点击的元素并添加到目标div中
    var $clone = $this.clone();
    $clone.appendTo($targetDiv);
    // 清除当前点击的元素
    $this.remove();
}
/**
 * 计算天枰两边的球值总和
 */
function calc_ball() {
    //增加使用次数
    var num_tp = $(".num_tp").text();
    $(".num_tp").html(Number(num_tp)+1);
    var left_balls = $(".left_tp > div");
    var right_balls = $(".right_tp > div");
    // 检查是否有div存在
    // 将托盘值初始为-10
    var left_num = -10;
    var right_num = -10;
    var $lever = $(".lever")
    var $left_tp = $(".left_tp")
    var $right_tp = $(".right_tp")
    //清除天枰倾斜
    init_tianping()
    if (left_balls.length != 0){
        for(var i = 0; i<left_balls.length;i++){
            var val = Number($(left_balls[i]).attr('val'));
            left_num+=val
        }
    }
    if (right_balls.length != 0){
        for(var i = 0; i<right_balls.length;i++){
            var val = Number($(right_balls[i]).attr('val'));
            right_num+=val
        }
    }
    console.log("## left_num ## ==>" + left_num );
    console.log("## right_num ## ==>" + right_num );
    if(left_num > right_num){
        $lever.addClass("spinL")
        $left_tp.addClass("spinD")
        $right_tp.addClass("spinU")
        $(".statu_tp").html("左侧重！！")
    }else if (right_num > left_num){
        $lever.addClass("spinR")
        $left_tp.addClass("spinU")
        $right_tp.addClass("spinD")
        $(".statu_tp").html("右侧重！！")
    }else {
        $(".statu_tp").html("一样重！！")
    }
}

/**
 * 天枰回正
 */
function init_tianping() {
    var $lever = $(".lever")
    var $left_tp = $(".left_tp")
    var $right_tp = $(".left_tp")
    $(".statu_tp").html("")
    if ($lever.hasClass("spinR")){
        $lever.removeClass("spinR")
    }
    if ($lever.hasClass("spinL")){
        $lever.removeClass("spinL")
    }
    if ($left_tp.hasClass("spinU")){
        $lever.removeClass("spinU")
    }
    if ($left_tp.hasClass("spinD")){
        $lever.removeClass("spinD")
    }
    if ($right_tp.hasClass("spinU")){
        $lever.removeClass("spinU")
    }
    if ($right_tp.hasClass("spinD")){
        $lever.removeClass("spinD")
    }
}
//初始化小球值
function init_ball() {
// 获取id为ball的元素下的所有div元素
    var divs = $('#ball > div');

    // 检查是否有div存在
    if (divs.length === 0) return;

    // 随机选择一个div
    var randomIndex = Math.floor(Math.random() * divs.length);
    var $selectedDiv = $(divs[randomIndex]);

    // 设置val属性为1或-1
    var newVal = Math.random() >= 0.5 ? 2 : 0;
    $selectedDiv.attr('val', newVal);

    // 可选：输出更改后的结果到控制台
    console.log('Changed val of div#' + $selectedDiv.attr('class') + ' to ' + newVal);
}