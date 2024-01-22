function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        const isTextNode =
          typeof child === "string" || typeof child === "number";
        return isTextNode ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el],
    },
  };

  // 跟节点
  root = nextWorkOfUnit;
}

let root = null;
let currentRoot = null;
let nextWorkOfUnit = null;
function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit);

    console.log(deadline.timeRemaining(), 'deadline.timeRemaining()--12');
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextWorkOfUnit && root) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function commitRoot() {
  commitWork(root.child);
  // 在清空之前创建currentRoot, 把odlRoot记录下来
  currentRoot = root;
  root = null;
}

function commitWork(fiber) {
  if (!fiber) return;

  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }

  if (fiber.effectTag === 'update') {
    updateProps(fiber.dom, fiber.props, fiber.alternate?.props);
  } else if (fiber.effectTag === 'placement') {
    if (fiber.dom) {
      fiberParent.dom.append(fiber.dom);
    }
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type);
}

function updateProps(dom, nextProps, prevProps) {
  // Object.keys(props).forEach((key) => {
  //   if (key !== "children") {
  //     // 增加事件-例如：click
  //     if (key.startsWith('on')) {
  //       // 例如：onClick -> click
  //       const eventType = key.slice(2).toLowerCase();
  //       dom.addEventListener(eventType, props[key])
  //     } else {
  //       dom[key] = props[key];
  //     }
  //   }
  // });

  // 1. old有，new没有 删除
  Object.keys(prevProps).forEach(key =>{
    if (key !== 'children') {
      if (!(key in nextProps)) {
        dom.removeAttribute(key);
      }
    }
  });
  // 2. old没有，new有 增加
  // 3. old有，new有 更新
  Object.keys(nextProps).forEach(key => {
    if (key !== 'children') {
      if (nextProps[key] !== prevProps[key]) {
        if (key.startsWith('on')) {
          // 例如：onClick -> click
          const eventType = key.slice(2).toLowerCase();
          dom.removeEventListener(eventType, prevProps[key]); // 删除之前的监听事件
          dom.addEventListener(eventType, nextProps[key]); // 绑定当前的监听事件
        } else {
          dom[key] = nextProps[key];
        }
      }
    }
  })
}

function initChildren(fiber, children) {
  // 获取老的fiber
  let oldFiber = fiber.alternate?.child;


  let prevChild = null;
  children.forEach((child, index) => {
    let isSameType = oldFiber && oldFiber.type === child.type
    let newFiber;
    if (isSameType) {
      // 如果一样则是更新
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: oldFiber.dom,
        effectTag: 'update', // 更新
        alternate: oldFiber
      };

    } else {
      // 创建
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: null,
        effectTag: 'placement' // 放置
      };
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }


    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
  });
}

function updateFunctionComponent(fiber) {
  console.log(fiber, 'fiber--12');
  const children = [fiber.type(fiber.props)];

  initChildren(fiber, children);
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type));

    updateProps(dom, fiber.props, {});
  }

  const children = fiber.props.children;
  initChildren(fiber, children);
}

function performWorkOfUnit(fiber) {
  const isFunctionComponent = typeof fiber.type === "function";

  if(isFunctionComponent){
    updateFunctionComponent(fiber)
  }else{
    updateHostComponent(fiber)
  }

  // 4. 返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

requestIdleCallback(workLoop);

// 更新
function update() {
  nextWorkOfUnit = {
    dom: currentRoot,
    props: currentRoot.props,
    alternate: currentRoot
  };

  // 跟节点
  root = nextWorkOfUnit;
}

const React = {
  render,
  createElement,
  update,
};

export default React;