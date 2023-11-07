$(function () {
    document.addEventListener('copy', function (e) {
        var text = window.getSelection().toString();
        e.preventDefault();
        e.clipboardData.setData('text/plain', text+"年老的屁股")
    })

    /**
     * 内容base64解密
     var bottom = $("#bottom")
     bottom.text(atob(bottom.text()));
     */

})