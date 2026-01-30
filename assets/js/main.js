// 动画工具
var iUp = (function () {
    var time = 0,
        duration = 150;
    return {
        clean: function() {
            time = 0;
        },
        up: function(element) {
            setTimeout(function () {
                element.classList.add("up");
            }, time);
            time += duration;
        }
    };
})();

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    // 移除预加载类，启动动画
    setTimeout(function() {
        document.body.classList.remove('is-preload');
    }, 100);
    
    // 执行动画
    var iUpElements = document.querySelectorAll(".iUp");
    for (var i = 0; i < iUpElements.length; i++) {
        iUp.up(iUpElements[i]);
    }

    // 头像加载完成显示
    var avatarElement = document.querySelector(".js-avatar");
    if (avatarElement) {
        avatarElement.addEventListener('load', function () {
            avatarElement.classList.add("show");
        });
    }
});