import App from "./App.js";
import Editor from "./Editor.js";
import { getItem, setItem } from "./storage.js";
const $target = document.querySelector("#app");

new App({ $target });

const TEMP_POST_SAVE_KEY = "temp-post";

const post = getItem(TEMP_POST_SAVE_KEY, {
  title: "",
  content: "",
});

let timer = null;

new Editor({
  $target,
  initialState: post,
  onEditing: (post) => {
    if (timer !== null) {
      //방어코드
      clearTimeout(timer);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      setItem(TEMP_POST_SAVE_KEY, {
        ...post,
        tempSaveData: new Date(),
      });
    }, 500);
  },
});
