import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const reset = () => setCount(0);
  return (
    <div className="App">
      <h1>Count is: {count} </h1>
      <div>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}> +</button>
      </div>
    </div>
  );
}

export default App;
