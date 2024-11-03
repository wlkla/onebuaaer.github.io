function art() {
    var a = "";
    var b = "";
    while (b != CONFIG.password) {
        a = prompt("请输入访问密码");
        if (a == CONFIG.password) {
            b = a;
            return 0;
        }
        if (a != CONFIG.password && a != "") {
            if (a == null) {
                window.history.back();
                location.reload();
                window.location.go(-1);
            }
        }
    }
}

art();
