import "./App.css";
import { useState, useEffect } from "react";
import Counter from "./components/Counter";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("clicked");
  }, [count]); // count 변화 감지

  useEffect(() => {
    console.log("component loaded");
  }, []); //컴포넌트 로드 감지 (라이프사이클))

  useEffect(() => {
    console.log("event");
    const handleScroll = () => {
      console.log(window.scrollY);
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []); //전역적인 이벤트 사용 , 컴포넌트 제거시 return 실행

  return (
    <div>
      <div> count : {count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default App;
