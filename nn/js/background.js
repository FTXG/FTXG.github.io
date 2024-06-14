window.onload = function () {
    var doublePI = Math.PI * 2;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var cx,cy;
    var starCanvas;
    var alphaChangeProbability = new AlphaChangeProbability();
//色相
    var hue = 217;
//星空背景颜色
    var bgColor = 'hsl(' + hue + ', 60%, 5%)';
//画布的外切圆半径
    var canvasRadius;
//每旋转一圈要需要的帧数
    var radianStepCount;
//星星的总个数
    var starCount;
//群星
    var stars;
    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cx = canvas.width / 2;
        cy = canvas.height / 2;
        canvasRadius = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2))
        radianStepCount = canvasRadius * 100;
        starCount = parseInt((canvas.width + canvas.height) * 0.5);
        stars = [];
        for(var i=0; i<starCount; i++) {
            stars.push(new Star());
        }
//初始时要先绘制一层背景,否则第一波星星走过的路径会有画布底料涂抹不均匀的感觉
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function init() {
        createStarCanvas();
        window.addEventListener("resize", onResize);
        onResize();
        loop();
    }
//在[min, max)范围内随机一个整数
    function randomInt(min, max) {
        if(arguments.length === 1) {
            max = min;
            min = 0;
        } else if(min > max) {
            var tmp = max;
            mix = min;
            min = tmp;
        }
        return Math.floor(Math.random() * (max - min) + min);
    }
//透明度改变的概率
    function AlphaChangeProbability() {
//透明度改变的步长
        var alphaStep = 0.05;
//透明度增加
        var plus = 1;
//透明度减少
        var minus = 1;
//透明度不变
        var invariant = 8;
//总概率
        var totalChance = plus + minus + invariant;
//获取随机的透明度改变值
        function getRandomChangeValue() {
            var value = Math.random() * totalChance;
            if(value < plus) {
                return alphaStep;
            }
            value -= plus;
            if(value < minus) {
                return -alphaStep;
            }
            return 0;
        }
//随机改变alpha的值
        this.randomChangeAlpha = function(alpha) {
            alpha += getRandomChangeValue();
            if(alpha > 1) {
                alpha = 1;
            } else if(alpha < 0) {
                alpha = 0;
            }
            return alpha;
        }
    }
//创建星星图片
    function createStarCanvas() {
        starCanvas = document.createElement("canvas");
        var ctx = starCanvas.getContext("2d");
        starCanvas.width = 100;
        starCanvas.height = 100;
        var cx = starCanvas.width / 2;
        var cy = starCanvas.height / 2;
        var radius = Math.max(cx, cy);
        var gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0.025, '#CCC');
        gradient.addColorStop(0.1, 'hsl(' + hue + ', 65%, 35%)');
        gradient.addColorStop(0.25, bgColor);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, doublePI);
        ctx.fill();
    }
//星体对象
    var Star = function() {
//星体运行的轨道半径
        this.orbitRadius = Math.random() * canvasRadius;
//星体的半径
        this.radius = randomInt(60, this.orbitRadius) / 8;
//星体透明度
        this.alpha = Math.random();
//相对轨道中心(即画布中心)的角度
        this.theta = Math.random() * doublePI;
//角速度
        this.speed = Math.random() * this.orbitRadius / radianStepCount;
//获取当前坐标
        this.getPos = function() {
            return {
                x: cx + this.orbitRadius * Math.cos(this.theta),
                y: cy + this.orbitRadius * Math.sin(this.theta)
            }
        }
    }
    Star.prototype.update = function() {
        this.alpha = alphaChangeProbability.randomChangeAlpha(this.alpha);
        this.theta += this.speed;
        this.pos = this.getPos();
    }
    Star.prototype.draw = function() {
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(starCanvas, this.pos.x, this.pos.y, this.radius, this.radius);
    }
    function loop() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "lighter";
        for(var i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].draw();
        }
//绘制星体图样
//         ctx.globalCompositeOperation = "source-over";
//         ctx.globalAlpha = 1;
//         ctx.fillStyle = "white";
//         ctx.fillRect(0, 0, starCanvas.width, starCanvas.height);
//         ctx.drawImage(starCanvas, 0, 0, starCanvas.width, starCanvas.height);
        requestAnimationFrame(loop);
    }
    init();
}