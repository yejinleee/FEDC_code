import Box from "./components/Box";
import "./App.css";
import { css } from "@emotion/react";
import Button from "./components/Button";
import NestParent from "./components/NestParent";
import NestChild from "./components/NestChild";
import styled from "@emotion/styled";

function App() {
  const ChildDiv = styled.div`
    width: 100px;
    height: 100px;
    background-color: blue;
  `;
  const ParentDiv = styled.div`
    width: 500px;
    height: 500px;
    background-color: green;

    ${ChildDiv} {
      background-color: red;
    }
  `;
  return (
    <div className="App">
      {/* <div css={{ width: 200, height: 100, backgroundColor: "black" }}></div> */}
      {/* <div css={css({ width: 200, height: 100, backgroundColor: "black" })}></div> */}
      <div css={{ width: 200, height: 100, backgroundColor: "red" }} />
      <Button variant="default" size="60px">
        Default
      </Button>
      <Button variant="danger" size="60px">
        Danger
      </Button>
      <Button variant="outline" size="60px">
        Outline
      </Button>{" "}
      <Box />
      <NestParent>
        this is parent <NestChild>this is child</NestChild>
      </NestParent>
      <ParentDiv>
        <ChildDiv></ChildDiv>
      </ParentDiv>
    </div>
  );
}

export default App;
