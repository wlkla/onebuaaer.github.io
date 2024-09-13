// 创建minimap
function createMinimap() {
    const minimapContainer = document.createElement('div');
    minimapContainer.className = 'minimap-container';
    document.body.appendChild(minimapContainer);

    const minimap = document.createElement('div');
    minimap.className = 'minimap';
    minimapContainer.appendChild(minimap);

    const slider = document.createElement('div');
    slider.className = 'minimap-slider';
    minimapContainer.appendChild(slider);

    const toggleButton = document.createElement('div');
    toggleButton.className = 'minimap-toggle';
    toggleButton.innerHTML = '&rarr;'; // 初始为→
    document.body.appendChild(toggleButton); // 将按钮添加到body，使其位置固定

    const contentContainer = document.querySelector('.markdown-body');
    updateMinimap(contentContainer, minimap, slider);

    return { minimapContainer, minimap, slider, toggleButton };
}

// 更新minimap内容
function updateMinimap(contentContainer, minimap, slider) {
    minimap.innerHTML = '';
    const contentClone = contentContainer.cloneNode(true);
    contentClone.querySelectorAll('img, svg, video, iframe').forEach(el => el.remove());
    minimap.appendChild(contentClone);

    // 调整minimap内容的缩放比例
    const minimapRect = minimap.getBoundingClientRect();
    const contentRect = contentContainer.getBoundingClientRect();
    const scaleX = minimapRect.width / contentRect.width;
    const scaleY = minimapRect.height / contentRect.height;
    const scale = Math.min(scaleX, scaleY);
    
    minimap.firstChild.style.transform = `scale(${scale})`;
    minimap.firstChild.style.transformOrigin = 'top left';
    minimap.firstChild.style.width = `${100 / scale}%`;
    minimap.firstChild.style.height = `${100 / scale}%`;

    updateSliderPosition(contentContainer, slider);
}

// 更新滑块位置
function updateSliderPosition(contentContainer, slider) {
    const containerHeight = contentContainer.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollPercentage = window.scrollY / (containerHeight - viewportHeight);
    const sliderHeight = (viewportHeight / containerHeight) * 100;
    
    slider.style.height = `${sliderHeight}%`;
    slider.style.top = `${scrollPercentage * (100 - sliderHeight)}%`;
}

// 处理拖动
function handleDrag(event, contentContainer, slider, minimap) {
    event.preventDefault();
    const minimapContainer = document.querySelector('.minimap-container');
    const containerRect = minimapContainer.getBoundingClientRect();
    const containerHeight = contentContainer.scrollHeight;
    const viewportHeight = window.innerHeight;

    const dragHandler = (e) => {
        e.preventDefault();
        const relativeY = (e.clientY - containerRect.top) / containerRect.height;
        const scrollTarget = relativeY * containerHeight;
        window.scrollTo(0, scrollTarget - viewportHeight / 2);
        updateSliderPosition(contentContainer, slider);
    };

    const stopDrag = () => {
        document.removeEventListener('mousemove', dragHandler);
        document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', dragHandler);
    document.addEventListener('mouseup', stopDrag);
}

// 加载样式
function loadMinimapStyles() {
    const css = `
        .minimap-container {
            position: fixed;
            top: 10px;
            right: 10px;
            width: 100px;
            height: calc(100% - 20px);
            background-color: rgba(240, 240, 240, 0.9);
            z-index: 99;
            overflow: hidden;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            transition: transform 0.3s ease-in-out;
        }
        .minimap-container.hidden {
            transform: translateX(calc(100% + 10px));
        }
        .minimap {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            opacity: 0.7;
            pointer-events: none;
            user-select: none;
            overflow: hidden;
        }
        .minimap-slider {
            position: absolute;
            right: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            cursor: pointer;
        }
        .minimap-toggle {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 40px;
            height: 40px;
            border: 2px solid black;
            background-color: rgba(240, 240, 240, 0.9);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateY(-50%) rotate(0deg);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            font-size: 20px;
            font-weight: bold;
            z-index: 100;
            transition: transform 0.3s ease-in-out;
        }
        .minimap-toggle.rotate {
            transform: translateY(-50%) rotate(-180deg);
        }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

// 主函数
document.addEventListener("DOMContentLoaded", function() {
    loadMinimapStyles();
    const { minimapContainer, minimap, slider, toggleButton } = createMinimap();
    const contentContainer = document.querySelector('.markdown-body');

    window.addEventListener('scroll', () => updateSliderPosition(contentContainer, slider));
    window.addEventListener('resize', () => {
        updateMinimap(contentContainer, minimap, slider);
        updateSliderPosition(contentContainer, slider);
    });
    
    minimapContainer.addEventListener('mousedown', (e) => {
        handleDrag(e, contentContainer, slider, minimap);
    });

    toggleButton.addEventListener('click', () => {
        minimapContainer.classList.toggle('hidden');
        toggleButton.classList.toggle('rotate');
    });

    // 初始更新
    updateMinimap(contentContainer, minimap, slider);
});
