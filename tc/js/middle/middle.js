$(function () {
    $(".middle-img60s").on('click',function () {
        // // 获取当前点击小图的src
        // let imgSrc = $(this).attr("src");
        // // 将获取到的src赋值到大图显示区域img的src里
        // $(".big_img").attr("src", imgSrc);
        // // 显示大图区域
        // $(".big").show();
        // 获取当前点击小图的src
        let imgObj = $(this).clone();
        imgObj.attr("class","big_img");
        // 将获取到的src赋值到大图显示区域img的src里
        $(".big").append(imgObj);
        // 显示大图区域
        $(".big").show();
    })
    // 隐藏大图显示区域
    $(".big").click(function() {
        $(this).empty();
        $(this).hide();
    })
})