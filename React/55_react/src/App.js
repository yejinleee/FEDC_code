import "./App.css";
import { useState } from "react";
import Board from "./components/Board";

function App() {
  const [visible, setVisible] = useState(false);

  const articles = [
    { id: 1, title: "제목1", author: "y" },
    { id: 2, title: "제목2", author: "j" },
    { id: 3, title: "제목3", author: "l" },
  ];
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>Toggle</button>

      {visible && <Board articles={articles} />}
      {visible ? <Board articles={articles} /> : <h2>false</h2>}
    </div>
  );
}

export default App;
