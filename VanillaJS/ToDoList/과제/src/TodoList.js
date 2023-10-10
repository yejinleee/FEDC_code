import validationCheck from "./validationCheck.js";

export function TodoList({
  $target,
  initialState,
  handleComplete,
  handleDelete,
}) {
  if (!new.target) {
    throw new Error("컴포넌트를 생성자 함수로 호출해주세요");
  }
  const $listWrap = document.createElement("div");
  $target.appendChild($listWrap);

  if (validationCheck(initialState)) {
    this.state = initialState;
  } else {
    throw new Error("입력값 형식이 잘못되었습니다");
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $listWrap.innerHTML = `
    <ul>
        ${this.state
          .map(
            ({ text, isCompleted, idx }) =>
              `<div class="listDiv"><li data-idx = ${idx} class=${
                isCompleted ? "done" : ""
              }>${text} </li><button data-idx = ${idx} >🗑️</button></div>`
          )
          .join("")}
    </ul>`;

    $listWrap.querySelectorAll("li").forEach(($li) => {
      $li.addEventListener("click", (e) => {
        const idx = e.target.dataset.idx;
        handleComplete(parseInt(idx));
        this.render();
      });
    });
    $listWrap.querySelectorAll("button").forEach(($btn) => {
      $btn.addEventListener("click", (e) => {
        const idx = e.target.dataset.idx;
        handleDelete(parseInt(idx));
        this.render();
      });
    });
  };

  this.render();
}

export function TodoEach({ $target, text }) {
  const $todo = document.createElement("div");
  const $todoText = document.createElement("span");
  const $completeButton = document.createElement("button");

  this.state = {
    isCompleted: false,
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $todoText.textContent = text;
    $completeButton.textContent = "Done!";
    $todoText.style.textDecoration = this.state.isCompleted
      ? "line-through"
      : "none";

    $todoText.addEventListener("click", () => {
      this.setState({
        isCompleted: !this.state.isCompleted,
      });
    });
  };
  this.render();

  $todo.appendChild($todoText);
  $todo.appendChild($completeButton);
  $target.appendChild($todo);
}
