import styled from "@emotion/styled";
import { useState } from "react";
import { useTasks } from "../contexts/TaskProvider";

const Form = styled.form`
  width: 400px;
`;
const Input = styled.input`
  width: 332px; //투두 하나가 400px 이니까 남은 너비 계산
  height: 32px;
  padding: 4px 6px;
  border-radius: 8px;
  border: 2px solid black;
  box-sizing: border-box;
`;
const SubmitButton = styled.button`
  width: 60px;
  height: 32px;
  padding: 4px 6px;
  margin-left: 8px;
  color: white;
  background-color: black;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
`;
const NewTaskForm = (props) => {
  const [task, setTask] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        typ
        e="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <SubmitButton>ADD</SubmitButton>
    </Form>
  );
};
export default NewTaskForm;
