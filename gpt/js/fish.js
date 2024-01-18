$(document).ready(function() {
    let mouseX = 0, mouseY = 0, fishX = 0, fishY = 0;
    let fish = $('#fish');

    $(document).mousemove(function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;

        fishX = fish.offset().left + fish.width() / 2;
        fishY = fish.offset().top + fish.height() / 2;

        let radian = Math.atan2(mouseX - fishX, mouseY - fishY);
        let degree = (radian * (180 / Math.PI) * -1) + 180;
        fish.css('transform', 'rotate(' + degree + 'deg)');
    });

    function moveFish() {
        let speed = 1; // 控制移动的速度，这里的值可以调整
        let distanceX = mouseX - fishX;
        let distanceY = mouseY - fishY;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance > 1) {
            fishX += (distanceX / distance) * speed;
            fishY += (distanceY / distance) * speed;
            fish.offset({ left: fishX - fish.width() / 2, top: fishY - fish.height() / 2 });
        }
        requestAnimationFrame(moveFish); // 循环调用moveFish
    }

    moveFish(); // 开始移动鱼

});