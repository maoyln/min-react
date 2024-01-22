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
// function Counter({num}) {
//     const handleClick = () => {
//         console.log('点击事件！');
//     }
//     return (
//         <div>
//             count： {num}
//             <button onClick={handleClick}>click</button>
//         </div>
//     )
// }

// function counterContainer() {
//     return <Counter></Counter>
// }

// function App() {
//     return (
//         <div>
//             min-react
//             <Counter num={10} />
//             <Counter num={20} />
//         </div>
//     );
// }

/*******************分割线***********************/

/**
 * V4 新增更新
 */
let count = 10;
function Counter() {
    const handleClick = () => {
        count++;
        console.log('点击事件！');
        React.update();
    }
    return (
        <div>
            count： {count}
            <button onClick={handleClick}>click</button>
        </div>
    )
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