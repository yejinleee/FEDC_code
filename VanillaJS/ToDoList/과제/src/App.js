import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import { TodoList } from "./TodoList.js";
import { storageSetItem, storageGetItem } from "./storage.js";

let storageTodos = storageGetItem("todos");
let IDX = storageTodos
  ? storageGetItem("todos")[storageTodos.length - 1].idx + 1
  : 0;

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
          idx: IDX,
        },
      ];
      IDX += 1;
      todoList.setState(nextState);
      storageSetItem("todos", JSON.stringify(nextState));
    },
  });

  const todoList = new TodoList({
    $target,
    initialState,
    handleComplete: (idx) => {
      const todos = storageGetItem("todos");
      todos.forEach((todo) => {
        if (todo.idx === idx) {
          todo.isCompleted = !todo.isCompleted;
        }
      });
      storageSetItem("todos", JSON.stringify(todos));
      todoList.setState(todos);
    },
    handleDelete: (idx) => {
      const lastTodos = storageGetItem("todos").filter((e) => e.idx !== idx);
      window.localStorage.setItem("todos", JSON.stringify(lastTodos));
      todoList.setState(lastTodos);
    },
  });
}
