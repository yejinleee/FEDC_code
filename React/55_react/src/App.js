import "./App.css";
import { useRef, useState } from "react";
import Board from "./components/Board";
import Pagination from "./components/Pagination";

function App() {
  const articles = new Array(100).fill().map((_, i) => ({
    id: i,
    title: `${i}번째 글`,
  }));

  const [page, setPage] = useState(0);
  const limit = 10;
  const offset = page * limit;

  return (
    <div>
      <Board articles={articles.slice(offset, offset + limit)} />
      <Pagination
        defaultPage={0}
        limit={limit}
        total={articles.length}
        onChange={setPage}
      />
    </div>
  );
}

export default App;
