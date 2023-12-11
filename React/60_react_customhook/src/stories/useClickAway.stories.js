import { useState } from "react";
import useClickAway from "../hooks/useClickAway";
import styled from "@emotion/styled";
export default {
  title: "Hook/useClickAway",
};
const Popup = styled.div`
  width: 300px;
  height: 300px;
  background-color: pink;
`;

export const Default = () => {
  const [show, setShow] = useState(false);
  const ref = useClickAway((e) => {
    if (e.target.tagName !== "BUTTON") {
      setShow(false);
    }
  });
  return (
    <>
      <button
        onClick={() => {
          setShow(true);
        }}
      >
        SHOW
      </button>
      <Popup ref={ref} style={{ display: show ? "block" : "none" }}></Popup>
    </>
  );
};
