// params.$target : 해당 컴포넌트가 추가될 DOM요소
// params.initialState: 해당 컴포넌트 초기 상태
function TodoList({ $target, initialState }) {
  const $todoList = document.createElement("div");
  $target.appendChild($todoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // 실행하면 현재 상태를 기준으로 컴포넌트를 렌더링하는 동작

    $todoList.innerHTML = `
    <ul>
        ${this.state
          .map(
            (todo) => `<li>
        ${todo.text}</li>`
          )
          .join("")}
    </ul>`;
  };

  this.render();
}
