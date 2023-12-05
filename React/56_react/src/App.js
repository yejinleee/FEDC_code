// /** @jsxImportSource @emotion/react */
import "./App.css";
import { css } from "@emotion/react";

const style = css`
  color: red;
`;

const SomeComponent = ({ children }) => (
  <div css={style}>
    Some hotpink text.
    {children}
  </div>
);

const anotherStyle = css({
  textDecoration: "underline",
});

const AnotherComponent = () => (
  <div css={anotherStyle}>Some text with an underline.</div>
);

function App() {
  return (
    <div className="App">
      <SomeComponent />
    </div>
  );
}

export default App;
