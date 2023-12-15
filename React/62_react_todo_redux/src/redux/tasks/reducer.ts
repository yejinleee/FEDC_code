// 상태를 변화 시키는 로직(순수함수)

import { Action } from "./types";
import { ITask } from "../../utils/types/taskType";

export const tasks = (state: ITask[] = [], action: Action): ITask[] => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = action.payload;
      return [...state, newTask];
    }
    case "UPDATE_TASK": {
      const updatedTask = action.payload;
      return state.map((oldTask) =>
        oldTask.id === updatedTask.id ? updatedTask : oldTask
      );
    }
    case "REMOVE_TASK": {
      const removedTask = action.payload;
      return state.filter((task) => task.id !== removedTask.id);
    }
    default: {
      return state;
    }
  }
};
