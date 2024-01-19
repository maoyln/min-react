import React from './core/React';

/**
 * V1 function component 支持
 * @returns 
 */
// function Counter() {
//     return <div>count</div>
// } 

// const App = (
//     <div>
//         min-react
//         <Counter></Counter>
//     </div>
// )

/*******************分割线***********************/

/**
 * V2 function component 嵌套支持
 * @returns 
 */
// function Counter() {
//     return <div>count</div>
// }

// function counterContainer() {
//     return <Counter></Counter>
// }

// const App = (
//     <div>
//         min-react
//         <counterContainer></counterContainer>
//     </div>
// )
/*******************分割线***********************/

/**
 * V3 整理App+props
 */
function Counter({num}) {
    return <div>count: {num}</div>
}

function counterContainer() {
    return <Counter></Counter>
}

function App() {
    return (
        <div>
            min-react
            <Counter num={10} />
            <Counter num={20} />
        </div>
    );
}


export default App;