import React from "react";

const AvatarGroup = ({ children, shape = "circle", size = 70, ...props }) => {
  const avatars = React.Children.toArray(children)
    .filter((element) => {
      if (React.isValidElement(element) && element.props.__TYPE === "Avatar") {
        // 일반 텍스트 등은 그리지 않고 걸러냄. 하지만 그 외 컴포넌트(ex Toggle) 등은 무시하지 못하고 그림..
        // 이걸 막기위해 element.type으로 조건을 둘 수도 있지만,,
        // 더 안전한 방법으로, Avatar.js에서 defaultProps로 __TYPE을 이용해서 Avatar 요소임을 제한하자
        // 그리고 && element.props.__TYPE === 'Avatar' 조건

        return true;
      }
      return false;
    })
    .map((avatar, index, avatars) => {
      return React.cloneElement(avatar, {
        ...avatar.props,
        size,
        shape,
        style: {
          ...avatar.props.style,
          marginLeft: -size / 5,
          zIndex: avatars.length - index, // 위로 올라가는 순서 반대로
        },
      });
    });
  return <div style={{ paddingLeft: size / 5 }}>{avatars}</div>;
};

export default AvatarGroup;
