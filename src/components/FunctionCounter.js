import React, {useState} from "react";

const FunctionCounter = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => {
        if(count > 0) setCount(count - 1);
    }

    return(
        <div className="counter-box">
            <h2>Function Component</h2>
            <p className="count">{count}</p>
            <button onClick={increment}>++</button>
            <button onClick={decrement}>--</button>
        </div>
    );
};
export default FunctionCounter;