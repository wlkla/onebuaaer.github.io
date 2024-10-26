// 首先添加需要的样式
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .mermaid-wrapper {
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .mermaid-toolbar {
      background: transparent; /* 设置工具栏透明 */
      padding: 8px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: flex-end; /* 按钮靠右对齐 */
      gap: 10px;
    }
    .mermaid-toolbar button {
      width: 32px; /* 按钮固定宽度 */
      height: 32px;
      border: none;
      background: transparent; /* 设置按钮透明 */
      cursor: pointer;
    }
    .mermaid-toolbar button img {
      width: 100%;
      height: 100%;
    }
    .mermaid-toolbar button.active {
      background: rgba(230, 230, 230, 0.5); /* 激活状态样式 */
    }
    .mermaid-diagram {
      text-align: center; /* 图表居中 */
    }
    .mermaid-diagram svg {
      display: inline-block;
      margin: 0 auto;
    }
    .mermaid-source {
      background: #f8f8f8;
    }
    .mermaid-source pre {
      margin: 0;
    }
    .hidden {
      display: none;
    }
  `;
    document.head.appendChild(style);
}

// 加载mermaid库
function loadMermaidScript() {
    return new Promise((resolve, reject) => {
        if (window.mermaid) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js';
        script.onload = () => {
            window.mermaid.initialize({
                startOnLoad: false,
                theme: 'default'
            });
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 创建包装器和工具栏
function createWrapper(codeBlock) {
    // 创建外部包装器
    const wrapper = document.createElement('div');
    wrapper.className = 'mermaid-wrapper';

    // 创建工具栏
    const toolbar = document.createElement('div');
    toolbar.className = 'mermaid-toolbar';

    // 创建 sourceButton 并设置图标
    const sourceButton = document.createElement('button');
    sourceButton.className = 'active';
    sourceButton.style.backgroundImage = "url('https://onebuaaer.us.kg/code.png')";
    sourceButton.style.backgroundRepeat = 'no-repeat';
    sourceButton.style.backgroundPosition = 'center';
    sourceButton.style.backgroundSize = 'contain';
    sourceButton.style.width = '15px';
    sourceButton.style.height = '15px';

    // 创建 diagramButton 并设置图标
    const diagramButton = document.createElement('button');

    diagramButton.style.backgroundImage = "url('https://onebuaaer.us.kg/image.png')";
    diagramButton.style.backgroundRepeat = 'no-repeat';
    diagramButton.style.backgroundPosition = 'center';
    diagramButton.style.backgroundSize = 'contain';
    diagramButton.style.width = '15px';
    diagramButton.style.height = '15px';

    // 将按钮添加到 toolbar
    toolbar.appendChild(sourceButton);
    toolbar.appendChild(diagramButton);

    // 创建内容区域
    const content = document.createElement('div');
    content.className = 'mermaid-content';

    // 源码区域
    const sourceDiv = document.createElement('div');
    sourceDiv.className = 'mermaid-source'; // 默认隐藏源码区域

    // 图表区域
    const diagramDiv = document.createElement('div');
    diagramDiv.className = 'mermaid-diagram hidden'; // 默认显示渲染后的图像区域

    // 将原始代码块移动到源码区域
    sourceDiv.appendChild(codeBlock.cloneNode(true));

    // 将源码和图表区域添加到内容区域
    content.appendChild(sourceDiv);
    content.appendChild(diagramDiv);

    // 添加切换功能
    sourceButton.addEventListener('click', () => {
        sourceDiv.classList.remove('hidden');
        diagramDiv.classList.add('hidden');
        sourceButton.classList.add('active');
        diagramButton.classList.remove('active');
    });

    diagramButton.addEventListener('click', () => {
        sourceDiv.classList.add('hidden');
        diagramDiv.classList.remove('hidden');
        sourceButton.classList.remove('active');
        diagramButton.classList.add('active');
    });

    return {wrapper, diagramContainer: diagramDiv};
}

// 提取并处理mermaid代码
function extractMermaidCode(element) {
    const mermaidBlocks = element.querySelectorAll('.highlight-source-mermaid');
    const results = [];

    mermaidBlocks.forEach(block => {
        const codeElement = block.querySelector('pre code');
        if (!codeElement) return;

        const {wrapper, diagramContainer} = createWrapper(block);

        // 获取 Mermaid 代码，并保持其原始格式
        let mermaidCode = codeElement.textContent || codeElement.innerText;

        // 移除所有 HTML 标签和多余的类名，保留 Mermaid 的结构和内容
        mermaidCode = mermaidCode.replace(/<[^>]+>/g, '');

        // 直接保留代码的原始格式，避免进行进一步的行分割和重新拼接
        console.log('Extracted Mermaid code:', mermaidCode); // 用于调试

        // 将原代码块替换为包装器
        block.parentNode.replaceChild(wrapper, block);

        results.push({
            code: mermaidCode,
            container: diagramContainer
        });
    });

    return results;
}


// 修改渲染函数，添加更多错误处理
async function renderMermaidDiagrams(mermaidData) {
    try {
        for (const data of mermaidData) {
            const {code, container} = data;

            try {
                // 生成一个有效的ID（只使用字母和数字）
                const validId = 'mermaid-' + Math.random().toString(36).substring(2, 15);

                // 先验证语法
                await window.mermaid.parse(code);

                // 如果语法正确，进行渲染
                const svgCode = await window.mermaid.render(validId, code);
                container.innerHTML = svgCode.svg;
            } catch (renderError) {
                console.error('Mermaid rendering error for code:', code);
                console.error('Error details:', renderError);

                // 显示错误信息给用户
                container.innerHTML = `
                    <div style="color: red; padding: 10px;">
                        无法渲染图表。错误信息：${renderError.message}
                        <pre style="background: #f8f8f8; padding: 10px; margin-top: 10px;">
                            ${code}
                        </pre>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Mermaid general error:', error);
    }
}

// 主函数
async function initMermaidRenderer() {
    try {
        // 1. 添加样式
        addStyles();

        // 2. 加载mermaid库
        await loadMermaidScript();

        // 3. 提取mermaid代码并创建包装器
        const mermaidData = extractMermaidCode(document);

        // 4. 如果找到mermaid代码，进行渲染
        if (mermaidData.length > 0) {
            await renderMermaidDiagrams(mermaidData);
        }
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// 在DOM加载完成后执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMermaidRenderer);
} else {
    initMermaidRenderer();
}
