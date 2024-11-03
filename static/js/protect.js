function encipher() {
    var inputpwd = "";
    var temp = "";
    while (temp != CONFIG.password) {
        inputpwd = prompt("请输入访问密码");
        if (inputpwd == CONFIG.password) {
            temp = inputpwd;
            return 0;
        }
        if (inputpwd != CONFIG.password && inputpwd != "") {
            if (inputpwd == null) {
                window.history.back();
                location.reload();
                window.location.go(-1);
            }
        }
    }
}

encipher();
