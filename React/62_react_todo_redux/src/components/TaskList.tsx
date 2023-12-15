import styled from "@emotion/styled";
import Task from "./Task";
// import { useTasks } from "../contexts/TaskProvider";
import { ITask } from "../utils/types/taskType";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

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

const TaskList = (props: any) => {
  // const { tasks } = useTasks();
  const tasks = useSelector((store: RootState) => store.tasks); // store가 unknown으로 추론되서 이에 타입을 줘야함

  return (
    <UnorderList {...props}>
      {tasks.map((item: ITask) => (
        <Task
          key={item.id}
          id={item.id}
          content={item.content}
          complete={item.complete}
        />
      ))}
    </UnorderList>
  );
};
export default TaskList;
