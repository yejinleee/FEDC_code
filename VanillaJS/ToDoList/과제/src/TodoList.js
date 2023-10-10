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
  let isInit = false;

  this.render = () => {
    const rendering = this.render;
    if (!isInit) {
      $listWrap.innerHTML = "";
    }
    new TodoEach({
      $target: $listWrap,
      state: this.state,
      handleComplete,
      handleDelete,
      rendering,
    });
  };

  this.render();
}

export function TodoEach({
  $target,
  state,
  handleComplete,
  handleDelete,
  rendering,
}) {
  this.render = () => {
    const $todo = document.createElement("ul");
    $target.appendChild($todo);
    state.map(({ text, isCompleted, idx }) => {
      const todoDiv = document.createElement("div");
      todoDiv.className = "list_div";

      const todoLi = document.createElement("li");
      todoLi.dataset.idx = idx;
      todoLi.innerHTML = text;
      if (isCompleted) {
        todoLi.className = "done";
      }
      todoLi.addEventListener("click", (e) => {
        const idx = e.target.dataset.idx;
        handleComplete(parseInt(idx));
        rendering;
      });

      const newTodoBtn = document.createElement("button");
      newTodoBtn.dataset.idx = idx;
      newTodoBtn.innerHTML = "🗑️";
      newTodoBtn.addEventListener("click", (e) => {
        const idx = e.target.dataset.idx;
        handleDelete(parseInt(idx));
        rendering;
      });

      todoDiv.appendChild(todoLi);
      todoDiv.appendChild(newTodoBtn);
      $todo.appendChild(todoDiv);
    });
  };
  this.render();
}
