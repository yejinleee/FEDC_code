import Box from "./components/Box";
import Checkbox from "./components/Checkbox";
import useHover from "./hooks/useHover";
import useToggle from "./hooks/useToggle.js";
import useKeyPress from "./hooks/useKeyPress";

function App() {
  const [on, toggle] = useToggle();
  const [on2, toggle2] = useToggle();
  console.log(on);

  const [ref, isHover] = useHover();
  const keyPressed = useKeyPress("a");

  return (
    <div className="App">
      {/* useToggle */}
      <Checkbox checked={on} onChange={toggle} />
      <Checkbox label="label2" checked={on2} onChange={toggle2} />
      <button onClick={() => toggle()}>{on ? "True" : "False"}</button>

      {/* useHover */}
      {isHover ? "hover" : "mouseout"}
      <Box ref={ref} />

      {/* useKeyPress */}
      {keyPressed && "pressed"}
    </div>
  );
}

export default App;
