import styled from "@emotion/styled";

const NestParent = styled.span`
  color: lightgreen;

  & > strong {
    color: hotpink;
  }
`;
export default NestParent;
