import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import { TodoList } from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import { storageSetItem, storageGetItem } from "./storage.js";
import validationCheck from "./validationCheck.js";

const storageTodos = storageGetItem("todos");
let IDX =
  storageTodos.length > 0
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

      // 유효값 검사
      if (validationCheck(nextState)) {
        todoList.setState(nextState);
        storageSetItem("todos", JSON.stringify(nextState));
        todoCount.render(initialState);
      } else {
        throw new Error("입력값 형식이 잘못되었습니다");
      }
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
      if (validationCheck(todos)) {
        storageSetItem("todos", JSON.stringify(todos));
        todoList.setState(todos);
        todoCount.render();
      } else {
        throw new Error("입력값 형식이 잘못되었습니다");
      }
    },
    handleDelete: (idx) => {
      const lastTodos = storageGetItem("todos").filter((e) => e.idx !== idx);
      window.localStorage.setItem("todos", JSON.stringify(lastTodos));
      todoList.setState(lastTodos);
      todoCount.render();
    },
  });

  const todoCount = new TodoCount({
    $target,
  });
}
