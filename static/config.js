// 配置文件
const CONFIG = {
    // 密码哈希值
    PASSWORD_HASH: '5db34653b31642bfb355c7d234904d05',
    
    // 存储键名
    STORAGE_KEY: 'passwordVerified',
    
    // DOM 元素 ID
    ELEMENTS: {
        passwordModal: 'passwordModal',
        mainContent: 'mainContent',
        passwordInput: 'passwordInput',
        submitButton: 'submitButton'
    },
    
    // 错误消息
    MESSAGES: {
        incorrectPassword: 'Incorrect password, try again.'
    }
};

// 防止配置被修改
Object.freeze(CONFIG);