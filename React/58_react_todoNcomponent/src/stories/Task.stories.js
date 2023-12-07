import Task from "../components/Task";

export default {
  title: "Component/Task",
  component: Task,
};

export const Default = () => {
  const task = {
    content: "밥먹기",
    complete: false,
  };
  return <Task content={task.content} complete={task.complete} />;
};
