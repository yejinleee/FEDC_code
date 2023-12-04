import "./App.css";
import { useState } from "react";
import Counter from "./components/Counter";

function App() {
  const [total, setTotal] = useState(0);
  return (
    <div>
      TotalCount : {total}
      <Counter
        onIncrease={(count) => setTotal(total + 1)}
        onDecrease={(count) => setTotal(total - 1)}
      />
      <Counter
        onIncrease={(count) => setTotal(total + 1)}
        onDecrease={(count) => setTotal(total - 1)}
      />
      <Counter
        onIncrease={(count) => setTotal(total + 1)}
        onDecrease={(count) => setTotal(total - 1)}
      />
    </div>
  );
}

export default App;
