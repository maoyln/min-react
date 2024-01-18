import ReactDOM from './core/ReactDOM';
import React from './core/React';

/*************************************V1分割线**********************************************************/

/**
 * V1 把js转换成jsx
 */
// const App = React.createElement('div', {id: 'app'}, 'hello ','maoyl', ' fj1');
// console.log(AppOne);

// // 没有支持function component 不能直接使用
// ReactDOM.createRoot(document.querySelector("#root")).render(App);

/*************************************V2分割线**********************************************************/

/**
 * V2 vite 会子自动把dom转换成React.createElement()对象
 */
// const App = React.createElement('div', {id: 'app'}, 'hello ','maoyl', ' fj1');
// vite 会子自动把dom转换成React.createElement()对象
// const App = <div id="myl">hello, maoyl</div>
// console.log(App, 'App--012');
// function AppOne() {
//     return  <div id="myl">hello, maoyl</div>
// }
// console.log(AppOne);

// // 没有支持function component 不能直接使用
// ReactDOM.createRoot(document.querySelector("#root")).render(App);


/*************************************V3分割线**********************************************************/

/**
 * V2 vite 会子自动把dom转换成React.createElement()对象
 * 转换需要使用React（此处我们使用的是我们重写的React.createElement(...)）
 */

// 没有支持function component 不能直接使用
// error信息【Uncaught DOMException: Failed to execute 'createElement' on 'Document': The tag name provided ('[object Object]') is not a valid name.】
const App = React.createElement('div', {id: 'app'}, 'hello ');

ReactDOM.createRoot(document.querySelector("#root")).render(App);