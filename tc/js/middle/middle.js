$(function () {
    $(".middle-img60s").on('click',function () {
        // 获取当前点击小图的src
        let imgObj = $(this).clone();
        imgObj.attr("class","big_img");
        // 将获取到的src赋值到大图显示区域img的src里
        $(".big").append(imgObj);
        // 显示大图区域
        $(".big").show();
        $(".middle-img-box").hide();
    })
    // 隐藏大图显示区域
    $(".big").click(function() {
        $(this).empty();
        $(this).hide();
        $(".middle-img-box").show();
    })
    draw()
    $(".hello").on("click",function () {
        // 获取canvas元素和上下文
        var canvas = document.getElementById('drawCanvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    })
    console.log("## hello ## ==>" +$(".hello").html());
})
function draw() {
    var isDrawing = false;
    var lastX, lastY;

    // 获取canvas元素和上下文
    var canvas = document.getElementById('drawCanvas');
    var context = canvas.getContext('2d');
    var color = $("#colorPicker").val();
    context.strokeStyle = color;
    context.lineWidth = 5;

    // 监听鼠标按下事件
    $(canvas).mousedown(function(e) {
        isDrawing = true;
        context.strokeStyle = $("#colorPicker").val();
        lastX = e.offsetX;
        lastY = e.offsetY;
    });

    // 监听鼠标移动事件
    $(canvas).mousemove(function(e) {
        if (isDrawing) {
            var x = e.offsetX;
            var y = e.offsetY;
            context.beginPath();
            context.moveTo(lastX, lastY);
            context.lineTo(x, y);
            context.stroke();
            lastX = x;
            lastY = y;
        }
    });

    // 监听鼠标松开事件
    $(document).mouseup(function() {
        isDrawing = false;
    });
}