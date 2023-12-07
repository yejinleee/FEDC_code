import styled from "@emotion/styled";
import { useState } from "react";

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;
// sup 태그 : 첨자
const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex; //세로정렬
  align-items: center; //세로정렬
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 20px;
  color: white;
  background-color: #f44;
  transform: translate(50%, -50%);
`;
const Badge = ({
  children,
  count,
  maxCount,
  showZero,
  backgroundColor,
  textColor,
  ...props
}) => {
  const colorStyle = {
    backgroundColor,
    color: textColor,
  };
  return (
    <BadgeContainer {...props}>
      {children}
      {(count > 0 || (count === 0 && showZero)) && (
        <Super style={colorStyle}>
          {maxCount && count > maxCount ? `${maxCount}+` : count}
        </Super>
      )}
    </BadgeContainer>
  );
};

export default Badge;
