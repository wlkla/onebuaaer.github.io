// 安全模块
class SecurityManager {
    constructor() {
        this.initializeSecurityMeasures();
    }

    initializeSecurityMeasures() {
        // 禁用右键菜单
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // 禁用特定快捷键
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // 禁用控制台
        this.disableConsole();
    }

    handleKeyboardShortcuts(e) {
        const forbiddenKeys = [
            { key: 123 }, // F12
            { key: 73, ctrl: true, shift: true }, // Ctrl+Shift+I
            { key: 85, ctrl: true }, // Ctrl+U
            { key: 83, ctrl: true }, // Ctrl+S
        ];

        for (const combo of forbiddenKeys) {
            if (this.isMatchingKeyCombo(e, combo)) {
                e.preventDefault();
                return false;
            }
        }
    }

    isMatchingKeyCombo(e, combo) {
        return e.keyCode === combo.key &&
            (!combo.ctrl || e.ctrlKey) &&
            (!combo.shift || e.shiftKey);
    }

    disableConsole() {
        // 覆盖console方法
        const noop = () => {};
        const methods = ['log', 'debug', 'info', 'warn', 'error'];
        
        try {
            methods.forEach(method => {
                console[method] = noop;
            });
        } catch (e) {}
    }
}