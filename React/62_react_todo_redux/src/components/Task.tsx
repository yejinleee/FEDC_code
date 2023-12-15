import styled from "@emotion/styled";
import Toggle from "./Toggle";
import { useTasks } from "../contexts/TaskProvider";
const ListItem = styled.li`
  display: flex;
  width: 400px;
  height: 40px;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  list-style: none;
`;
const Content = styled.span<{ complete: boolean }>`
  flex: 1;
  margin-left: 8px;
  font-size: 14px;
  text-decoration: ${({ complete }) => (complete ? "line-through" : "none")};
`;
const RemoveButton = styled.button`
  height: 24px;
  margin-left: 8px;
  color: white;
  border-radius: 8px;
  border: none;
  background-color: red;
  cursor: pointer;
`;
const Task = ({ id, content, complete, ...props }) => {
  const { updateTask, removeTask } = useTasks();

  return (
    <ListItem {...props}>
      <Toggle on={complete} onChange={(e) => updateTask(id, e.target.value)} />

      <Content complete={complete}>{content} </Content>
      <RemoveButton onClick={() => removeTask(id)}>REMOVE</RemoveButton>
    </ListItem>
  );
};

export default Task;
