import styled from "@emotion/styled";
import ImageComponent from "./Image";
import { useEffect, useState } from "react";
import AvatarGroup from "./AvatarGroup";

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
  // __TYPE = 'Avatar', // 내부 사용 지정하려곻! 이렇게 지정하면 props으로 들어가는걸로 인식하지 않음! 그래서 .defaultProps 사용하자 ㅇㅇ
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

Avatar.defaultProps = {
  __TYPE: "Avatar",
};
Avatar.propTypes = {
  __TYPE: "Avatar", // props이기 때문에 사용자가 맞지 않는 값을 넘겨올수도 있어서, 이걸로 막음
};
Avatar.Group = AvatarGroup; // .을 사용하기위해서
export default Avatar;
