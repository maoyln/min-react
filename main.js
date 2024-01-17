import ReactDOM from './core/ReactDOM.js';
import React from './core/React.js';

const App = React.createElement('div', {id: 'app'}, 'hello ','--maoy', ' fj1');

ReactDOM.createRoot(document.querySelector("#root")).render(App);