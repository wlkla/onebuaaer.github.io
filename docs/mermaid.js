// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function () {

    // 查找所有包含Mermaid代码的元素
    var mermaidDivs = document.querySelectorAll('.highlight-source-mermaid');
    console.log('Found ' + mermaidDivs.length + ' Mermaid divs');

    mermaidDivs.forEach(function (div) {
        // 提取Mermaid代码
        var codeElement = div.querySelector('code');
        if (codeElement) {
            var mermaidCode = codeElement.textContent;

            // 创建新的div来放置渲染后的图表
            var renderDiv = document.createElement('div');
            renderDiv.className = 'mermaid';
            renderDiv.textContent = mermaidCode;

            // 创建按钮容器
            var buttonContainer = document.createElement('div');
            buttonContainer.style.textAlign = 'right';
            buttonContainer.style.marginTop = '10px';

            // 创建复位按钮
            var resetButton = document.createElement('button');
            resetButton.className = 'btn reset';
            resetButton.innerHTML = '<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-sync" aria-hidden="true"><path d="M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z"></path></svg>';
            resetButton.style.marginLeft = '5px';
            buttonContainer.appendChild(resetButton);

            // 创建包含渲染div和按钮容器的外层div
            var containerDiv = document.createElement('div');
            containerDiv.appendChild(renderDiv);
            containerDiv.appendChild(buttonContainer);

            // 替换原来的pre元素
            var preElement = div.querySelector('pre');
            if (preElement) {
                preElement.parentNode.replaceChild(containerDiv, preElement);
            }
        }
    });


    // 使用MutationObserver监听Mermaid渲染完成
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function (node) {
                    if (node.tagName === 'SVG' && node.closest('.mermaid')) {
                        console.log('SVG added to DOM');
                        enhanceSVG(node);
                    }
                });
            }
        });
    });

    // 观察整个文档的变化
    observer.observe(document.body, {childList: true, subtree: true});

    // 检查现有的SVG
    function checkExistingSVGs() {
        console.log('Checking for existing SVGs');
        var existingSVGs = document.querySelectorAll('.mermaid svg');
        existingSVGs.forEach(function (svg) {
            console.log('Found existing SVG');
            enhanceSVG(svg);
        });
    }

    // 在短暂延迟后检查现有的SVG，以确保Mermaid有时间渲染
    setTimeout(checkExistingSVGs, 3000);

    function enhanceSVG(svg) {
        console.log('Enhancing SVG');
        var container = svg.closest('.mermaid');

        // 居中SVG
        svg.style.display = 'block';
        svg.style.margin = 'auto';

        // 添加拖动功能
        var isDragging = false;
        var startX, startY, translateX = 0, translateY = 0;

        svg.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);

        function startDrag(e) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            svg.style.cursor = 'grabbing';
        }

        function drag(e) {
            if (isDragging) {
                translateX = e.clientX - startX;
                translateY = e.clientY - startY;
                updateSVGTransform();
            }
        }

        function endDrag() {
            isDragging = false;
            svg.style.cursor = 'grab';
        }

        // 添加缩放功能
        var currentScale = 1;
        container.addEventListener('wheel', zoom);

        function zoom(e) {
            e.preventDefault();
            var delta = e.deltaY > 0 ? 0.9 : 1.1;
            currentScale *= delta;
            currentScale = Math.max(0.5, Math.min(currentScale, 3)); // 限制缩放范围
            updateSVGTransform();
        }

        function updateSVGTransform() {
            svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
        }

        // 设置初始样式
        svg.style.cursor = 'grab';
        container.style.overflow = 'hidden';

        // 添加复位功能
        var resetButton = container.parentNode.querySelector('.reset');
        if (resetButton) {
            resetButton.addEventListener('click', function () {
                translateX = 0;
                translateY = 0;
                currentScale = 1;
                updateSVGTransform();
            });
        }

        console.log('SVG enhanced successfully');
    }
});
