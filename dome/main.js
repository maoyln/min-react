// 实现任务调度器
const el = document.createElement("div");

el.innerHTML = "maoyl";

document.body.append(el);

let i = 0;
// 数字越大，渲染的时候页面越卡顿
// js是单线程，执行下面的逻辑的时候，就会阻塞后续的进程
while (i < 1000000000) {
    i++
}