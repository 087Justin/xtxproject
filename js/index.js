window.addEventListener('load', function () {
    //获取元素
    var prve = this.document.querySelector(".prve");
    var next = this.document.querySelector(".next");
    var content = this.document.querySelector(".content");
    var point = content.querySelector(".point");
    var focus = content.querySelector(".focus");
    var contentWidth = content.offsetWidth;
    //第一步：鼠标经过按钮出现，鼠标离开按钮消失
    content.addEventListener('mouseenter', function () {
        prve.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    content.addEventListener('mouseleave', function () {
        prve.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            next.click();
        }, 3000);
    })

    //第二步：动态生成小圆圈
    for (var i = 0; i < focus.children.length; i++) {
        var li = this.document.createElement('li');
        li.setAttribute('index', i);
        point.appendChild(li);

        //给小圆点创建点击颜色改变事件
        li.addEventListener('click', function () {
            for (var i = 0; i < point.children.length; i++) {
                point.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            //小圆点跟随切换按钮变化条件
            num = index;
            circle = index;
            //调用动画函数
            animate(focus, -index * contentWidth);
        })
    }
    point.children[0].className = 'current';

    //无缝切换
    var num = 0;
    var circle = 0;
    var flag = true;//节流阀，防止用户点击过快，当动画执行完毕再开启
    var first = focus.children[0].cloneNode(true);
    focus.appendChild(first);
    //第三步：点击右侧切换按钮播放下一张
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == focus.children.length - 1) {
                focus.style.left = 0;
                num = 0;
            }
            num++;
            animate(focus, -num * contentWidth, function () {
                flag = true;//通过回调函数打开节流阀
            });
            //点击切换按钮，让小圆点位置跟随变化
            circle++;
            if (circle == 4) {
                circle = 0;
            }
            circleChange();
        }

    })

    prve.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = focus.children.length - 1;
                focus.style.left = -num * contentWidth + 'px';
            }
            num--;
            animate(focus, -num * contentWidth, function () {
                flag = true;//通过回调函数打开节流阀
            });
            //点击切换按钮，让小圆点位置跟随变化
            circle--;
            circle = circle < 0 ? point.children.length - 1 : circle;
            circleChange();
        }

    })

    //最后一步，自动轮播，且鼠标经过停止计时器，鼠标离开添加定时器
    var timer = setInterval(function () {
        next.click();
    }, 3000)

    function circleChange() {
        for (i = 0; i < point.children.length; i++) {
            point.children[i].className = '';
        }
        point.children[circle].className = 'current';
    }



})