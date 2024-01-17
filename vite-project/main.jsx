import ReactDOM from './core/ReactDOM';
import React from './core/React';

const App = React.createElement('div', {id: 'app'}, 'hello ','--maoy', ' fj1');

ReactDOM.createRoot(document.querySelector("#root")).render(App);