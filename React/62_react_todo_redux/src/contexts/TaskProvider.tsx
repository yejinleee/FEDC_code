import { createContext, useContext, useState, ReactNode } from "react";
import { v4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { ITask, ITaskContext } from "../utils/types/taskType";

const TaskContext = createContext<ITaskContext>({} as ITaskContext);
export const useTasks = () => useContext(TaskContext);

interface Props {
  children: ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  console.log(children);
  const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);

  const addTask = (content: string) => {
    setTasks([...tasks, { id: v4(), content, complete: false }]);
  };

  const updateTask = (id: string, status: boolean) => {
    setTasks(
      tasks.map((item: ITask) =>
        item.id === id ? { ...item, complete: status } : item
      )
    );
  };
  const removeTask = (id: string) => {
    setTasks(tasks.filter((item: ITask) => item.id !== id));
  };
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
