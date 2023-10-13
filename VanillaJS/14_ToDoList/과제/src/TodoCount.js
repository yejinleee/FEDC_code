import { storageGetItem } from "./storage.js";

export default function TodoCount({ $target }) {
  if (!new.target) {
    throw new Error("컴포넌트를 생성자 함수로 호출해주세요");
  }

  const $count = document.createElement("div");
  $target.appendChild($count);

  this.render = () => {
    let state = storageGetItem("todos");
    let lenAll = state.length;
    let lenCompleted = 0;
    state.forEach((todo) => {
      if (todo.isCompleted) {
        lenCompleted++;
      }
    });
    if (lenAll) {
      $count.innerHTML = `You did ${lenCompleted} out of ${lenAll} !`;
    } else {
      $count.innerHTML = "";
    }
  };
  this.render();
}
