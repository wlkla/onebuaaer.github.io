// password-protect.js

// 设置正确的密码
const correctPassword = "your_password";

// 隐藏所有内容的函数
function hideContent() {
    for (let element of document.body.children) {
        element.style.display = 'none';
    }
}

// 显示所有内容的函数
function showContent() {
    for (let element of document.body.children) {
        element.style.display = 'block';
    }
}

// 页面加载时调用 hideContent，并显示密码输入框
window.onload = function () {
    // 首先隐藏页面内容
    hideContent();

    // 创建密码输入框和按钮
    const overlay = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const text = document.createElement('div');
    
    // 设置 overlay 样式，覆盖整个页面
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.color = 'white';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.fontSize = '1.5em';

    // 设置提示文本和输入框样式
    text.textContent = "请输入密码以访问此页面：";
    input.type = 'password';
    input.placeholder = '请输入密码';
    input.style.padding = '10px';
    input.style.fontSize = '1em';
    input.style.marginTop = '20px';
    input.style.textAlign = 'center';
    
    // 设置按钮样式
    button.textContent = '提交';
    button.style.padding = '10px 20px';
    button.style.fontSize = '1em';
    button.style.marginTop = '10px';
    button.style.cursor = 'pointer';

    // 将元素添加到 overlay，并将 overlay 添加到 body
    overlay.appendChild(text);
    overlay.appendChild(input);
    overlay.appendChild(button);
    document.body.appendChild(overlay);

    // 检查密码
    button.onclick = function () {
        if (input.value === correctPassword) {
            // 密码正确，显示页面内容并移除 overlay
            document.body.removeChild(overlay);
            showContent();
        } else {
            alert("密码错误，请重试。");
            input.value = '';
        }
    };
};
