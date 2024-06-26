import styled from "@emotion/styled";
import { Buffer } from "buffer";

const IconWrapper = styled.i`
  display: inline-block;
`;

const Icon = ({
  name,
  size = 16,
  strokeWidth = 2,
  rotate,
  color = "#222",
  ...props
}) => {
  const shapeStyle = {
    width: `${size}px`, // 그냥 size로 하셨는데, 그렇게 하면 동작을 안해요 ..
    height: `${size}px`,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };
  const iconStyle = {
    "stroke-width": strokeWidth,
    stroke: color,
    width: `${size}px`,
    height: `${size}px`,
  };
  const icon = require("feather-icons").icons[name];
  const svg = icon ? icon.toSvg(iconStyle) : "";
  const base64 = Buffer.from(svg, "utf8").toString("base64");
  return (
    <IconWrapper {...props} style={shapeStyle}>
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
    </IconWrapper>
  );
};

export default Icon;
