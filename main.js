// V1 使用js创建一个dom
// const dom = document.createElement('div');
// dom.id="app"
// document.querySelector('#root').append(dom);

// const textNode = document.createTextNode('');
// textNode.nodeValue = 'app';
// dom.append(textNode);

/*****************分割线**************************/

/**
 * V2 对第一版本继续继续优化
 * 使用虚拟dom
 * 需求dom所需属性有type、props、children
 */

// const textEl = {
//     type: "TEXT_ELEMENT",
//     children: {
//         nodeValue: 'app',
//         children: [],
//     }
// }

// const el = {
//     type: 'div',
//     props: {
//         id: 'app',
//         children: textEl
//     }
// }

// const dom = document.createElement(el.type);
// dom.id=el.props.id;
// document.querySelector('#root').append(dom);

// const textNode = document.createTextNode('');
// textNode.nodeValue = textEl.children.nodeValue;
// dom.append(textNode);

/*****************分割线**************************/

/**
 * V3 动态创建虚拟dom
 */
// const createTextNode = (text) => {
//     return {
//         type: "TEXT_ELEMENT",
//         children: {
//             nodeValue: text,
//             children: [],
//         }
//     }
// }

// const createElement = (type, props, ...children) => {
//     return {
//         type: type,
//         props: {
//             ...props,
//             children
//         }
//     }
// }

// const textEl = createTextNode('app')
// const App = createElement('div', {id: 'app'}, textEl);

// const dom = document.createElement(App.type);
// dom.id=App.props.id;
// document.querySelector('#root').append(dom);

// const textNode = document.createTextNode('');
// textNode.nodeValue = textEl.children.nodeValue;
// dom.append(textNode);

/*****************分割线**************************/

/**
 * V4 动态创建dom节点
 */

// const createTextNode = (text) => {
//     return {
//         type: "TEXT_ELEMENT",
//         props: {
//             nodeValue: text,
//             children: [],
//         }
//     }
// }

// const createElement = (type, props, ...children) => {
//     return {
//         type: type,
//         props: {
//             ...props,
//             children
//         }
//     }
// }

// // 创建dom
// const render = (el, container) => {
//     const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode("maoyl") : document.createElement(el.type);

//     Object.keys(el.props).forEach(key => {
//         if (key !== 'children') {
//             dom[key] = el.props[key];
//         }
//     })

//     const children = el.props.children;
//     children.forEach(child => {
//         render(child, dom)
//     });
//     container.append(dom);
// }

// const textEl = createTextNode('app');
// const App = createElement('div', {id: 'app'}, textEl);

// render(App, document.querySelector("#root"));


/*****************分割线**************************/

/**
 * V5
 */
function createElement (type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((children) =>
          typeof children === "string" ? createTextNode(children) : children
        ),
      },
    };
  }

function createTextNode(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        }
    }
}

// render
const render = (el, container) => {
    const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(el.type);

    Object.keys(el.props).forEach(key => {
        if (key !== 'children') {
            dom[key] = el.props[key];
        }
    })

    const children = el.props.children;
    children.forEach(child => {
        render(child, dom)
    });
    container.append(dom);
}

const textEl = createTextNode('app');
const App = createElement('div', {id: 'app'}, textEl);

render(App, document.querySelector("#root"));

/*****************分割线**************************/