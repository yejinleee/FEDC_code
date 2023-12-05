import styled from "@emotion/styled";
const Button = styled.button`
  display: block;
  background-color: black;
  width: 100%;
  height: 32px;
  padding: 7px 5px;
  border: none;
  outline: none;
  border-radius: 4px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
  &:active {
    background-color: #666;
  }
`;

export default Button;
