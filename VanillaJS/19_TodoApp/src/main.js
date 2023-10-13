import App from "./App.js";

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

new App({ $target });
