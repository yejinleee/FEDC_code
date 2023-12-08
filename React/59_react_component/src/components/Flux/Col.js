import styled from "@emotion/styled";
import { useFlux } from "./FluxProvider";
import { useMemo } from "react";

const StyledCol = styled.div`
  max-width: 100% fit-content;
  box-sizing: border-box;
  width: ${({ span }) => span && `${(span / 12) * 100}%`};
  margin-left: ${({ offset }) => offset && `${(offset / 12) * 100}%`};
`;

const Col = ({ children, span, offset, ...props }) => {
  const { gutter } = useFlux();
  const gutterStyle = useMemo(() => {
    if (Array.isArray(gutter)) {
      const horizontalGutter = gutter[0];
      const verticalGutter = gutter[1];
      return {
        padding: `${verticalGutter / 2}px ${horizontalGutter / 2}px`,
      };
    }
    return {
      paddingLeft: `${gutter / 2}px`,
      paddingRight: `${gutter / 2}px`,
    };
  }, [gutter]); // 계산한번만 하면되니까 useMemo

  return (
    <StyledCol
      {...props}
      span={span}
      offset={offset}
      style={{ ...props, ...gutterStyle }}
    >
      {children}
    </StyledCol>
  );
};

export default Col;
