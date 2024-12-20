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
    lines.forEach((line, i) => {
        // 移除之前的动画类
        line.classList.remove('animate');
        
        // 强制重排
        line.offsetHeight;
        
        // 添加动画类，并设置延迟
        setTimeout(() => {
            line.classList.add('animate');
        }, i * 300);
    });
}