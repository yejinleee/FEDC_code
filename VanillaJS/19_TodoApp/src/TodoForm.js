import { setItem, getItem, removeItem } from "./storage.js";

const TODO_TEMP_SAVE_KEY = "TODO_TEMP_SAVE_KEY";

export default function TodoForm({ $target, onSubmit }) {
  const $form = document.createElement("form");

  $target.appendChild($form);

  this.render = () => {
    $form.innerHTML = `
      <input type="text" placeholder="할일을 입력하세요" />
      <button>추가</button>
    `; // button의 경우 디폴트type이 submit 입니다.  다른 용도의 경우 type="button" 등 명시
  };

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const $input = document.querySelector("input");
    const content = $input.value;

    onSubmit(content);
    $input.value = ""; // 이전 값 지우기
    removeItem(TODO_TEMP_SAVE_KEY);
  });

  this.render();

  const $input = $form.querySelector("input");
  $input.value = getItem(TODO_TEMP_SAVE_KEY, "", "");

  $input.addEventListener("keydown", (e) => {
    //"change"말고 "keydown"이어야 키 입력시마다 변경됨
    setItem(TODO_TEMP_SAVE_KEY, e.target.value);
  });
}
