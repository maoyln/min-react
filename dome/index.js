// 注意，该文件执行之后一定要关闭，不然导致浏览器卡死

/**
 * V！ 任务调度器（了解requestIdleCallback）
 * @param {*} deadline 
 */
// function workLoop(deadline) {
//     console.log(deadline.timeRemaining());

//     requestIdleCallback(workLoop);
// }

// requestIdleCallback(workLoop)

/*****************分割线**************************/


/**
 * V！ 任务调度器
 * @param {*} deadline 
 */

let taskId = 1;
function workLoop(deadline) {
    console.log(deadline.timeRemaining());

    let shouldYield = false;
    while(!shouldYield) {
        // run task
        console.log(`taskId: ${taskId} run task: ${deadline.timeRemaining()}`);
        shouldYield = deadline.timeRemaining() < 1;
    }

    requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop)