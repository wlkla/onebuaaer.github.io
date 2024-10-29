// 密码管理模块
class PasswordManager {
    constructor() {
        this.modal = document.getElementById(CONFIG.ELEMENTS.passwordModal);
        this.mainContent = document.getElementById(CONFIG.ELEMENTS.mainContent);
        this.passwordInput = document.getElementById(CONFIG.ELEMENTS.passwordInput);
        this.submitButton = document.getElementById(CONFIG.ELEMENTS.submitButton);
        
        this.initializeEventListeners();
        this.checkStoredPassword();
    }

    initializeEventListeners() {
        // 提交按钮点击事件
        this.submitButton.addEventListener('click', () => {
            this.verifyPassword();
        });

        // 回车键支持
        this.passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verifyPassword();
            }
        });
    }

    checkStoredPassword() {
        if (sessionStorage.getItem(CONFIG.STORAGE_KEY)) {
            this.showContent();
        } else {
            this.showPasswordPrompt();
        }
    }

    verifyPassword() {
        const inputPassword = this.passwordInput.value;
        const inputHashed = CryptoJS.MD5(inputPassword).toString();

        if (inputHashed === CONFIG.PASSWORD_HASH) {
            this.handleSuccessfulLogin();
        } else {
            this.handleFailedLogin();
        }
    }

    handleSuccessfulLogin() {
        sessionStorage.setItem(CONFIG.STORAGE_KEY, 'true');
        this.showContent();
    }

    handleFailedLogin() {
        alert(CONFIG.MESSAGES.incorrectPassword);
        this.passwordInput.value = '';
        this.passwordInput.focus();
    }

    showContent() {
        this.modal.style.display = 'none';
        this.mainContent.style.display = 'block';
    }

    showPasswordPrompt() {
        this.modal.style.display = 'block';
        this.mainContent.style.display = 'none';
        this.passwordInput.focus();
    }
}