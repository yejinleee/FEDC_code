import styled from "@emotion/styled";
import Task from "./Task";
const UnorderList = styled.ul`
  width: 400px;
  margin: 0;
  padding: 0;

  & > li {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`;

const TaskList = (props) => {
  return (
    <UnorderList {...props}>
      <Task content="TEST" />
      <Task content="TEST" />
      <Task content="TEST" />
    </UnorderList>
  );
};
export default TaskList;
