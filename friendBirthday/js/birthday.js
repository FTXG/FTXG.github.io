$(function () {
    $.ajax({
        type:"get",
        url:"",
        dataType:"json",
        success:function (res) {
            var data = JSON.stringify(res);
            console.log(data);
        }
    })
})