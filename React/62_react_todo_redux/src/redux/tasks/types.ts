import { ITask } from "../../utils/types/taskType";

export type Type = "ADD_TASK" | "UPDATE_TASK" | "REMOVE_TASK";

export type Action = { type: Type; payload: ITask };
