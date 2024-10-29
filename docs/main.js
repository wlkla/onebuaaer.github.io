// 主程序入口
document.addEventListener('DOMContentLoaded', () => {
    // 初始化安全管理器
    const securityManager = new SecurityManager();
    
    // 初始化密码管理器
    const passwordManager = new PasswordManager();

    // 防止对象被修改
    Object.freeze(securityManager);
    Object.freeze(passwordManager);
});