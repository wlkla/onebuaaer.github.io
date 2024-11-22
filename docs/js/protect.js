function encipher() {
    var inputpwd = "";
    var temp = "";
    var correctPasswordHash = CONFIG.passwordHash; // 假设CONFIG.passwordHash存储的是正确密码的MD5值
    while (temp != correctPasswordHash) {
        inputpwd = prompt("请输入访问密码");
        if (inputpwd) {
            var hashedInput = CryptoJS.MD5(inputpwd).toString(); // 计算输入密码的MD5值
            if (hashedInput === correctPasswordHash) {
                temp = hashedInput;
                return 0; // 密码正确
            } else {
                alert("密码错误，请重新输入！");
            }
        } else if (inputpwd === null) { // 用户点击取消
            window.history.back();
            location.reload();
            window.location.go(-1);
            break;
        }
    }
}

encipher();
