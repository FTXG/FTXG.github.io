$(function () {
    $("#boxTop").on('mouseover','.qin',function (e) {
        $(this).animate({width:'160px'},'50')
    }).on('mouseout','.qin',function (e) {
        $(this).animate().stop(true);
        // $(this).css({'width':'40px'});
        $(this).animate({width:'40px'},'10')
    })
})