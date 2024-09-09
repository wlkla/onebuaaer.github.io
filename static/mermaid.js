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

            // 替换原来的pre元素
            var preElement = div.querySelector('pre');
            if (preElement) {
                preElement.parentNode.replaceChild(renderDiv, preElement);
            }
        }
    });

    // 初始化Mermaid
    mermaid.initialize({ startOnLoad: true });

    // 在Mermaid渲染完成后添加交互功能
    mermaid.parseError = function(err, hash) {
        console.error('Mermaid error: ', err);
    };

    // 监听Mermaid渲染完成事件
    document.addEventListener('DOMNodeInserted', function(event) {
        if (event.target.tagName === 'svg' && event.target.closest('.mermaid')) {
            var svg = event.target;
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
                    svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
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
                svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
            }

            // 设置初始样式
            svg.style.cursor = 'grab';
            container.style.overflow = 'hidden';
        }
    });
});
