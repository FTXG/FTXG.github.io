$(function () {
    layui.use(['carousel', 'form', 'jquery', 'layer'], function () {
        var carousel = layui.carousel
            , form = layui.form
            , $ = layui.jquery
            , layer = layui.layer;
        //改变下时间间隔、动画类型、高度        //图片轮播
        var ins3 = carousel.render({
            elem: '#test3'
            , width: '1080px'
            , height: '65px'
            , anim: 'default'
            , indicator: 'outside'
            , interval: 3000
        });
        //设定各种参数
        var $ = layui.$, active = {
            set: function (othis) {
                var THIS = 'layui-bg-normal'
                    , key = othis.data('key')
                    , options = {};

                othis.css('background-color', '#5FB878').siblings().removeAttr('style');
                options[key] = othis.data('value');
                ins3.reload(options);
            }
        };

        //监听开关
        form.on('switch(autoplay)', function () {
            ins3.reload({
                autoplay: this.checked
            });
        });

        $('.demoSet').on('keyup', function () {
            var value = this.value
                , options = {};
            if (!/^\d+$/.test(value)) return;

            options[this.name] = value;
            ins3.reload(options);
        });
        //其它示例
        $('.demoTest .layui-btn').on('click', function(){
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
        });
    //    轮播事件结束
    //    弹出层
        $(".sexing").on('click',function () {
            $(".conInfo").empty();
            // $(".conInfo").load("https://www.yikm.net")
            var floatFrame = "<iframe class='iframeXBW' src='https://dvb9m57a.com' loading='lazy' target=\"_parent\"></iframe>"
            $(".conInfo").append(floatFrame);
            layer.open({
                type: 1
                ,title: "我与赌毒不共戴天！！"
                ,offset: "auto"
                ,id: 'layerDemo' //防止重复弹出
                ,content: $(".conInfo")
                ,btn: '关闭全部'
                ,area:['640px','360px']
                ,btnAlign: 'c' //按钮居中
                ,moveType: 1 //拖拽
                ,shade: 0.3
                ,yes: function(){
                    $(".conInfo").empty();
                    layer.closeAll();
                }
                ,cancel: function () {
                    $(".conInfo").empty();
                    layer.closeAll();
                }
            });
        })
    })
})