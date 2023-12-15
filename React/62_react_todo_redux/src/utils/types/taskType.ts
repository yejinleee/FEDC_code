export interface ITask {
  id: string;
  content: string;
  complete: boolean;
}

export interface ITaskContext {
  tasks: ITask[];
  addTask(content: string): void;
  updateTask(id: string, status: boolean): void;
  removeTask(id: string): void;
}
