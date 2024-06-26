import styled from "@emotion/styled";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { useCallback, useState } from "react";

const Form = styled.form`
  width: 400px;
`;
const Input = styled.input`
  width: 332px;
  height: 32px;
  padding: 4px 6px;
  border-radius: 8px;
  border: 2px solid black;
  box-sizing: border-box;
`;
const SubmitButton = styled.button`
widht: 500px;
hegiht: 32px;
padding: 4px 6px;
margin-left: 8px;
color: white;
border-radius: 8px;
border: none;
background-color:black
box-sizign: border-box;
cursor:pointer
`;

const CREATE_TASK = gql`
  mutation CreateTask($content: String!) {
    createTask(data: { content: $content, complete: false }) {
      data {
        id
      }
    }
  }
`;
export const NewTaskForm = () => {
  const client = useApolloClient(); // 바로 반영을 위해 useApolloClient의 refetchQueries 사용

  const [task, setTask] = useState("");
  const [createTask] = useMutation(CREATE_TASK);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createTask({ variables: { content: task } });
      setTask("");
      client.refetchQueries({ include: ["GetTasks"] });
    },
    [createTask, task, client]
  );
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={task}
        placeholder="add a task"
        onChange={(e) => setTask(e.target.value)}
      />
      <SubmitButton>add</SubmitButton>
    </Form>
  );
};
