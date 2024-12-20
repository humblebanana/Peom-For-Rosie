const pages = document.querySelectorAll('.page');
const poems = document.querySelectorAll('.poem');

// 触发第一页动画
window.addEventListener('load', () => {
    triggerPageAnimation(0);
});

// 创建Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const pageIndex = Array.from(pages).indexOf(entry.target);
            if (pageIndex > 0) { // 只有第二页和第三页在滚动时触发
                triggerPageAnimation(pageIndex);
            }
        }
    });
}, {
    threshold: 0.5
});

// 观察所有页面
pages.forEach(page => observer.observe(page));

// 触发页面动画
function triggerPageAnimation(pageIndex) {
    const currentPoem = poems[pageIndex];
    if (!currentPoem) return;

    const lines = currentPoem.querySelectorAll('p');
    const totalDelay = lines.length * 300; // 计算诗句显示完的总时间

    // 重置并触发诗句动画
    lines.forEach((line, i) => {
        line.classList.remove('animate');
        line.offsetHeight;
        setTimeout(() => {
            line.classList.add('animate');
        }, i * 300);
    });

    // 处理箭头或结束语的动画
    if (pageIndex < 2) {
        // 第一页和第二页的箭头
        const arrow = document.querySelectorAll('.arrow-down')[pageIndex];
        if (arrow) {
            arrow.classList.remove('animate');
            arrow.offsetHeight;
            setTimeout(() => {
                arrow.classList.add('animate');
            }, totalDelay + 500); // 在诗句显示完后延迟500ms显示
        }
    } else {
        // 第三页的结束语
        const ending = document.querySelector('.ending');
        if (ending) {
            ending.classList.remove('animate');
            ending.offsetHeight;
            setTimeout(() => {
                ending.classList.add('animate');
            }, totalDelay + 500);
        }
    }
}