// 首先添加需要的样式
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .mermaid-wrapper {
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 20px 0;
    }
    .mermaid-toolbar {
      background: #f5f5f5;
      padding: 8px;
      border-bottom: 1px solid #ddd;
      display: flex;
      gap: 10px;
    }
    .mermaid-toolbar button {
      padding: 4px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
    }
    .mermaid-toolbar button.active {
      background: #e6e6e6;
      font-weight: bold;
    }
    .mermaid-content {
      padding: 15px;
    }
    .mermaid-diagram {
      text-align: center; /* 仅将图表居中显示 */
    }
    .mermaid-diagram svg {
      display: inline-block; /* 图表内容居中 */
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

    const sourceButton = document.createElement('button');
    sourceButton.textContent = '显示源码';
    sourceButton.className = 'active';

    const diagramButton = document.createElement('button');
    diagramButton.textContent = '显示图表';

    toolbar.appendChild(sourceButton);
    toolbar.appendChild(diagramButton);

    // 创建内容区域
    const content = document.createElement('div');
    content.className = 'mermaid-content';

    // 源码区域
    const sourceDiv = document.createElement('div');
    sourceDiv.className = 'mermaid-source';

    // 图表区域
    const diagramDiv = document.createElement('div');
    diagramDiv.className = 'mermaid-diagram hidden';

    // 将原始代码块移动到源码区域
    sourceDiv.appendChild(codeBlock.cloneNode(true));

    content.appendChild(sourceDiv);
    content.appendChild(diagramDiv);

    wrapper.appendChild(toolbar);
    wrapper.appendChild(content);

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

        // 创建包装器和内容区域
        const {wrapper, diagramContainer} = createWrapper(block);

        // 将原始代码直接保留在 sourceDiv 中
        const sourceDiv = wrapper.querySelector('.mermaid-source');
        sourceDiv.appendChild(block.cloneNode(true));

        // 清理并提取代码内容
        let mermaidCode = codeElement.textContent || codeElement.innerText;
        mermaidCode = mermaidCode
            .replace(/<[^>]+>/g, '')
            .replace(/class="pl-[^"]*"/g, ''); // 去除HTML标签和类

        // 检查代码类型并按原始结构存储
        results.push({
            code: mermaidCode,
            container: diagramContainer
        });

        // 替换代码块为新的包装器
        block.parentNode.replaceChild(wrapper, block);
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
