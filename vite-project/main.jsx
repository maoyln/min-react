import ReactDOM from './core/ReactDOM';
import React from './core/React';
import App from './App';

/**
 * V2 vite 会子自动把dom转换成React.createElement()对象
 * 转换需要使用React（此处我们使用的是我们重写的React.createElement(...)）
 */
ReactDOM.createRoot(document.querySelector("#root")).render(<App />);