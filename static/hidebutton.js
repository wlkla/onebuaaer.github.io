document.addEventListener("DOMContentLoaded", function() {
    // 查找 class 为 "title-right" 的 div 元素
    var titleRightDiv = document.querySelector('.title-right');
    
    // 检查该 div 是否存在
    if (titleRightDiv) {
        // 查找并删除 "切换主题" 的 <a> 元素
        var modeSwitchLink = titleRightDiv.querySelector('a[onclick="modeSwitch();"]');
        if (modeSwitchLink) {
            modeSwitchLink.remove();
        }

        // 查找并删除 RSS 的 <a> 元素
        var rssLink = titleRightDiv.querySelector('a#buttonRSS');
        if (rssLink) {
            rssLink.remove();
        }
    }
});
