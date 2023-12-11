import styled from "@emotion/styled";
import useScroll from "../hooks/useScroll";

export default {
  title: "Hook/useScroll",
};
const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: pink;
  overflow: scroll;
`;
const Inner = styled.div`
  width: 1000px;
  height: 1000px;
  background-image: linear-gradient(180deg, grey 0%, white 100%);
`;
export const Default = () => {
  const [state, ref] = useScroll();

  return (
    <>
      <Box ref={ref}>
        <Inner />
      </Box>
      <button
        onClick={() => {
          ref.current.scrollTo({ top: 500, left: 500, behavior: "smooth" });
        }}
      >
        To 500
      </button>
      {state.x},{state.y}
    </>
  );
};
