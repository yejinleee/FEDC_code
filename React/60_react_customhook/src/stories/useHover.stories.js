import styled from "@emotion/styled";
import useHover from "../hooks/useHover";

export default {
  title: "Hook/useHover",
};

const Box = styled.div`
  width: 300px;
  height: 200px;
  background-color: pink;
`;

export const Default = () => {
  const [hover, ref] = useHover();

  return (
    <>
      <Box ref={ref} />
      <div>{hover ? "Hovered!" : "no"}</div>
    </>
  );
};
