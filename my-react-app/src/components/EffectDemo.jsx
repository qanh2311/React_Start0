import { useState, useEffect } from "react";

function EffectDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect is running!");
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <h2>useEffect Demo</h2>

      <h3>Count: {count}</h3>

      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default EffectDemo;
