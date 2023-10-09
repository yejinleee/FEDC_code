import App from "./App.js";
import { storageGetItem, storageSetItem } from "./storage.js";

const initialState = storageGetItem("todos", []);

const $app = document.querySelector(".app");

new App({
  $target: $app,
  initialState: initialState,
});
