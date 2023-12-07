import styled from "@emotion/styled";
import ImageComponent from "./Image";
import { useEffect, useState } from "react";

const ShapeToCssValue = {
  circle: "50%",
  round: "4px",
  square: "0px",
};
const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  background-color: #eee;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  overflow: hidden;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

const Avatar = ({
  lazy,
  threshold,
  src,
  size = 70,
  shape = "circle", // round, square, circle
  placeholder,
  alt,
  mode = "cover",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false); // 이미지 로드되었는지 상태

  useEffect(() => {
    const image = new Image(); //브라우저 내장 Image오브젝트임 -> 컴포넌트명 변경!
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);
  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  );
};

export default Avatar;
