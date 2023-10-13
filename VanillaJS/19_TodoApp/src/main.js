import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";

const DUMMY_DATA = [
  {
    _id: 0,
    content: "js 공부",
    isCompleted: true,
  },
  {
    _id: 1,
    content: "코테 공부",
    isCompleted: false,
  },
];

const $target = document.querySelector("#app");

new TodoForm({
  $target,
  onSubmit: (content) => {
    console.log("onSubmit", content);
  },
});

new TodoList({
  $target,
  initialState: DUMMY_DATA,
  onToggle: (id) => {
    console.log("onToggle", id);
  },
  onRemove: (id) => {
    console.log(id);
  },
});
