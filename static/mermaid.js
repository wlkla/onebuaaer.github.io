// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 查找所有包含Mermaid代码的元素
    var mermaidDivs = document.querySelectorAll('.highlight-source-mermaid');

    mermaidDivs.forEach(function(div) {
        // 提取Mermaid代码
        var codeElement = div.querySelector('code');
        if (codeElement) {
            var mermaidCode = codeElement.textContent;

            // 创建新的div来放置渲染后的图表
            var renderDiv = document.createElement('div');
            renderDiv.className = 'mermaid';
            renderDiv.textContent = mermaidCode;

            // 创建复制按钮
            var copyButton = document.createElement('clipboard-copy');
            copyButton.className = 'btn my-2 js-clipboard-copy p-0 d-inline-flex tooltipped-no-delay';
            copyButton.setAttribute('role', 'button');
            copyButton.setAttribute('data-copy-feedback', 'Copied!');
            copyButton.setAttribute('data-tooltip-direction', 's');
            copyButton.setAttribute('aria-label', 'Copy mermaid code');
            copyButton.setAttribute('value', mermaidCode);
            copyButton.setAttribute('tabindex', '0');

            // 添加复制图标
            copyButton.innerHTML = `
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-copy js-clipboard-copy-icon m-2">
                    <path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path>
                    <path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
                </svg>
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-check js-clipboard-check-icon color-fg-success m-2 d-none">
                    <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                </svg>
            `;

            // 创建包含渲染图表和复制按钮的容器
            var container = document.createElement('div');
            container.appendChild(renderDiv);
            container.appendChild(copyButton);

            // 替换原来的pre元素
            var preElement = div.querySelector('pre');
            if (preElement) {
                preElement.parentNode.replaceChild(container, preElement);
            }
        }
    });

    // 初始化Mermaid
    mermaid.initialize({ startOnLoad: true });

    // 添加复制功能
    document.addEventListener('click', function(event) {
        var target = event.target;
        if (target.closest('clipboard-copy')) {
            var copyButton = target.closest('clipboard-copy');
            var textToCopy = copyButton.getAttribute('value');
            
            navigator.clipboard.writeText(textToCopy).then(function() {
                // 复制成功后的视觉反馈
                copyButton.querySelector('.js-clipboard-copy-icon').classList.add('d-none');
                copyButton.querySelector('.js-clipboard-check-icon').classList.remove('d-none');
                
                setTimeout(function() {
                    copyButton.querySelector('.js-clipboard-copy-icon').classList.remove('d-none');
                    copyButton.querySelector('.js-clipboard-check-icon').classList.add('d-none');
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy text: ', err);
            });
        }
    });
});
