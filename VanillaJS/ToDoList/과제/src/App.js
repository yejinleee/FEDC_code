import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import { TodoList } from "./TodoList.js";
import { storageSetItem } from "./storage.js";

export default function App({ $target, initialState }) {
  new Header({
    $target,
    text: "Simple Todo List",
  });

  new TodoForm({
    $target,
    onSubmit: (text) => {
      const nextState = [
        ...todoList.state,
        {
          text: text,
          isCompleted: false,
        },
      ];
      todoList.setState(nextState);
      storageSetItem("todos", JSON.stringify(nextState));
    },
  });

  const todoList = new TodoList({
    $target,
    initialState,
  });
}
