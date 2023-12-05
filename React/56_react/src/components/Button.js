import styled from "@emotion/styled";

const colors = {
  default: "rgb(36, 41, 47)",
  danger: "rgb(207, 34, 46)",
  outline: "rgb(9, 105, 218)",
};

// const Button = styled.button`
//   border-radius: 6px;
//   background-color: yellow;
//   color: ${(props) => colors[props.variant]};
//   width: ${(props) => props.size};
//   &:hover {
//     background-color: orange;
//   }
// `;
// export default Button;

function Button({ children, variant = "default", size = "100px" }) {
  return (
    <button
      css={{
        width: size,
        borderRadius: "6px",
        backgroundColor: "rgb(246, 248, 250)",
        color: colors[variant],
      }}
    >
      {children}
    </button>
  );
}
export default Button;
