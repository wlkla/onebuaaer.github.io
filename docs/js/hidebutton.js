document.addEventListener("DOMContentLoaded", function() {
    var titleRightDiv = document.querySelector('.title-right');
    
    if (titleRightDiv) {
        var modeSwitchLink = titleRightDiv.querySelector('a[onclick="modeSwitch();"]');
        if (modeSwitchLink) {
            modeSwitchLink.remove();
        }

        var rssLink = titleRightDiv.querySelector('a#buttonRSS');
        if (rssLink) {
            rssLink.remove();
        }
    }
});
