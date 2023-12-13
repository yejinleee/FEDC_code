import styled from "@emotion/styled";
import FluxProvider from "./FluxProvider";
import { useMemo } from "react";

const AlignToCSSValue = {
  top: "flex-start",
  middle: "center",
  bottom: "flex-end",
};

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;

  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => AlignToCSSValue[align]};
`;

const Row = ({ children, justify, align, gutter, ...props }) => {
  // 간격 gutter

  const gutterStyle = useMemo(() => {
    if (Array.isArray(gutter)) {
      const horizontalGutter = gutter[0];
      const verticalGutter = gutter[1];
      return {
        margin: `-${verticalGutter / 2}px -${horizontalGutter / 2}px`,
      };
    }
  }, [gutter]);
  return (
    <FluxProvider gutter={gutter}>
      <StyledRow
        {...props}
        align={align}
        justify={justify}
        style={{ ...props, ...gutterStyle }} // props.style??
      >
        {children}
      </StyledRow>
    </FluxProvider>
  );
};

export default Row;
